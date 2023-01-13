import { FullStoryPlugin } from '../FullStoryConfig';
import {
  EventType,
  TrackEventType,
  IdentifyEventType,
} from '@segment/analytics-react-native';
import FullStory from '@fullstory/react-native';

const EVENT_NAME = 'sample event';

const TRACK_EVENT: TrackEventType = {
  type: EventType.TrackEvent,
  event: EVENT_NAME,
};

const IDENTIFY_EVENT: IdentifyEventType = {
  type: EventType.IdentifyEvent,
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
      });

      expect(FullStory.event).not.toHaveBeenCalled();
    });

    test('Should send track events with allowlistAllTrackEvents', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: true,
      });

      plugin.execute({
        ...TRACK_EVENT,
      });

      expect(FullStory.event).toHaveBeenCalled();
    });

    test('Should send track events with allowlistTrackEvents', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: false,
        allowlistTrackEvents: [EVENT_NAME],
      });

      plugin.execute({
        ...TRACK_EVENT,
      });

      expect(FullStory.event).toHaveBeenCalled();
    });
  });

  describe('Test allowlistTrackEvents', () => {
    test('Should send identify event', () => {
      const plugin = new FullStoryPlugin({
        enableIdentifyEvents: true,
      });

      plugin.execute({
        ...IDENTIFY_EVENT,
      });

      expect(FullStory.identify).toHaveBeenCalledTimes(1);
    });

    test('Should not send identify event', () => {
      const plugin = new FullStoryPlugin({
        enableIdentifyEvents: false,
      });

      plugin.execute({
        ...IDENTIFY_EVENT,
      });

      expect(FullStory.identify).not.toHaveBeenCalled();
    });
  });
});
