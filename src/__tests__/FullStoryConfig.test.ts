import { FullStoryPlugin } from '../FullStoryConfig';
import { EventType, TrackEventType } from '@segment/analytics-react-native';
import FullStory from '@fullstory/react-native';

const EVENT_NAME = 'sample event';

const TRACK_EVENT: TrackEventType = {
  type: EventType.TrackEvent,
  event: EVENT_NAME,
};

interface TrackEventTypeWIthFSUrl extends TrackEventType {
  properties: {
    fullstoryUrl: string;
  };
}

describe('FullStoryConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Test enableFSSessionURLInEvents', () => {
    test('Should have FSUrl with enableFSSessionURLInEvents: true', async () => {
      const plugin = new FullStoryPlugin({
        enableFSSessionUrlInEvents: true,
        allowlistAllTrackEvents: true,
      });

      await new Promise(process.nextTick);

      const event = plugin.execute({
        ...TRACK_EVENT,
      }) as TrackEventTypeWIthFSUrl;

      expect(event.properties.fullstoryUrl).toBe('sampleurl.com');
    });

    test('Should not have FSUrl with enableFSSessionURLInEvents: false', async () => {
      const plugin = new FullStoryPlugin({
        enableFSSessionUrlInEvents: false,
        allowlistAllTrackEvents: true,
      });

      await new Promise(process.nextTick);

      const event = plugin.execute({ ...TRACK_EVENT }) as TrackEventType;

      expect(event.properties).toBe(undefined);
    });
  });

  describe('Test allowlistTrackEvents', () => {
    test('Should not send track events', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: false,
      });

      plugin.execute({
        ...TRACK_EVENT,
      }) as TrackEventTypeWIthFSUrl;

      expect(FullStory.event).not.toHaveBeenCalled();
    });

    test('Should send track events with allowlistAllTrackEvents', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: true,
      });

      plugin.execute({
        ...TRACK_EVENT,
      }) as TrackEventTypeWIthFSUrl;

      expect(FullStory.event).toHaveBeenCalled();
    });

    test('Should send track events with allowlistTrackEvents', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: false,
        allowlistTrackEvents: [EVENT_NAME],
      });

      plugin.execute({
        ...TRACK_EVENT,
      }) as TrackEventTypeWIthFSUrl;

      expect(FullStory.event).toHaveBeenCalled();
    });
  });
});
