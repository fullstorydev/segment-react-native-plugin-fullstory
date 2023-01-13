import {
  PluginType,
  TrackEventType,
  SegmentEvent,
  Plugin,
} from '@segment/analytics-react-native';
import FullStory from '@fullstory/react-native';
import { FSSuffixedProperties } from './utils/FSSuffixedProperties';

interface FullStoryPluginConfig {
  enableFSSessionUrlInEvents?: boolean;
  allowlistAllTrackEvents?: boolean;
  allowlistTrackEvents?: Array<string>;
}

const FULLSTORY_PLUGIN_CONFIG_DEFAULTS: FullStoryPluginConfig = {
  enableFSSessionUrlInEvents: true,
  allowlistAllTrackEvents: false,
};

export class FullStoryPlugin extends Plugin {
  public enableFSSessionURLInEvents;
  public allowlistAllTrackEvents;
  public allowlistTrackEvents;

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
        break;
    }

    return event;
  }

  addFSUrlToProperties(event: TrackEventType) {
    if (!event.properties) {
      event.properties = {};
    }

    event.properties.fullstoryUrl = this.fsSessionUrl;
  }
}
