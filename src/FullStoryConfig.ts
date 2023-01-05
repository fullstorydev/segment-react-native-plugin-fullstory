import {
  DestinationPlugin,
  IdentifyEventType,
  PluginType,
  TrackEventType,
  SegmentAPISettings,
} from '@segment/analytics-react-native';

export class FullStoryPlugin extends DestinationPlugin {
  type = PluginType.destination;

  update(settings: SegmentAPISettings) {
    console.log('settings', settings);
    return;
  }

  identify(event: IdentifyEventType) {
    console.log('identify', event);
    return event;
  }

  track(event: TrackEventType) {
    console.log('track', event);
    return event;
  }

  reset() {
    console.log('reset');
    return;
  }
}
