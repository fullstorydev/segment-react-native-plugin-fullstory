import {
  PluginType,
  TrackEventType,
  SegmentEvent,
  Plugin,
  ScreenEventType,
} from '@segment/analytics-react-native';
import FullStory from '@fullstory/react-native';
import { FSSuffixedProperties } from './utils/FSSuffixedProperties';

interface FullStoryPluginConfig {
  enableFSSessionUrlInEvents?: boolean;
  allowlistAllTrackEvents?: boolean;
  allowlistTrackEvents?: Array<string>;
  enableIdentifyEvents?: boolean;
  enableSendScreenAsEvents?: boolean;
  enableGroupTraitsAsUserVars?: boolean;
}

const FULLSTORY_PLUGIN_CONFIG_DEFAULTS: FullStoryPluginConfig = {
  enableFSSessionUrlInEvents: true,
  allowlistAllTrackEvents: false,
  enableIdentifyEvents: true,
  enableSendScreenAsEvents: false,
  enableGroupTraitsAsUserVars: false,
};

export class FullStoryPlugin extends Plugin {
  public enableFSSessionURLInEvents;
  public allowlistAllTrackEvents;
  public allowlistTrackEvents;
  public enableIdentifyEvents;
  public enableSendScreenAsEvents;
  public enableGroupTraitsAsUserVars;

  private fsSessionUrl = '';

  type = PluginType.enrichment;

  constructor(userConfig: FullStoryPluginConfig) {
    super();

    FullStory.onReady().then((result) => {
      this.fsSessionUrl = result.replayStartUrl;
    });

    const config = { ...FULLSTORY_PLUGIN_CONFIG_DEFAULTS, ...userConfig };

    this.enableFSSessionURLInEvents = config.enableFSSessionUrlInEvents;
    this.allowlistAllTrackEvents = config.allowlistAllTrackEvents;
    this.allowlistTrackEvents = config.allowlistTrackEvents;
    this.enableIdentifyEvents = config.enableIdentifyEvents;
    this.enableSendScreenAsEvents = config.enableSendScreenAsEvents;
    this.enableGroupTraitsAsUserVars = config.enableGroupTraitsAsUserVars;
  }

  execute(event: SegmentEvent) {
    switch (event.type) {
      case 'track':
        if (
          this.allowlistAllTrackEvents ||
          (this.allowlistTrackEvents &&
            this.allowlistTrackEvents.includes(event.event))
        ) {
          const fsProps = new FSSuffixedProperties(event.properties);
          FullStory.event(event.event, fsProps.getSuffixedProperties());

          if (this.enableFSSessionURLInEvents && this.fsSessionUrl) {
            this.addFSUrlToProperties(event as TrackEventType);
          }
        }
        break;
      case 'identify':
        if (this.enableIdentifyEvents) {
          const traits = new FSSuffixedProperties(
            event.traits
          ).getSuffixedProperties();
          FullStory.identify(event.userId || '', traits);
        }
        break;
      case 'screen':
        if (this.enableSendScreenAsEvents) {
          const properties = new FSSuffixedProperties(
            event.properties
          ).getSuffixedProperties();

          FullStory.event('Segment Screen: ' + event.name, properties);
          if (this.enableFSSessionURLInEvents && this.fsSessionUrl) {
            this.addFSUrlToProperties(event as ScreenEventType);
          }
        }
        break;
      case 'group':
        let traits;

        if (this.enableGroupTraitsAsUserVars) {
          traits = new FSSuffixedProperties(
            event.traits
          ).getSuffixedProperties();
        }

        FullStory.setUserVars({ groupID_str: event.groupId, ...traits });
        break;
    }

    return event;
  }

  reset() {
    FullStory.anonymize();
  }

  addFSUrlToProperties(event: TrackEventType | ScreenEventType) {
    if (!event.properties) {
      event.properties = {};
    }

    event.properties.fullstoryUrl = this.fsSessionUrl;
  }
}
