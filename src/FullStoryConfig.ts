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
}

const FULLSTORY_PLUGIN_CONFIG_DEFAULTS: FullStoryPluginConfig = {
  enableFSSessionUrlInEvents: true,
};

export class FullStoryPlugin extends Plugin {
  public enableFSSessionURLInEvents;
  private fsSessionUrl = '';

  type = PluginType.enrichment;

  constructor(userConfig: FullStoryPluginConfig) {
    super();

    FullStory.onReady().then((result) => {
      this.fsSessionUrl = result.replayStartUrl;
    });

    const config = { ...FULLSTORY_PLUGIN_CONFIG_DEFAULTS, ...userConfig };

    this.enableFSSessionURLInEvents = config.enableFSSessionUrlInEvents;
  }

  execute(event: SegmentEvent) {
    switch (event.type) {
      case 'track':
        const fsProps = new FSSuffixedProperties(event.properties);
        FullStory.event(event.event, fsProps.getSuffixedProperties());

        if (this.enableFSSessionURLInEvents && this.fsSessionUrl) {
          this.addFSUrlToProperties(event as TrackEventType);
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
