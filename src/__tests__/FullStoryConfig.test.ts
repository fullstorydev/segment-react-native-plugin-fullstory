import { FullStoryPlugin } from '../FullStoryConfig';
import { EventType, TrackEventType } from '@segment/analytics-react-native';

const TRACK_EVENT: TrackEventType = {
  type: EventType.TrackEvent,
  event: 'sample event',
};

interface TrackEventTypeWIthFSUrl extends TrackEventType {
  properties: {
    fullstoryUrl: string;
  };
}

describe('FullStoryConfig', () => {
  describe('Test enableFSSessionURLInEvents', () => {
    test('Should have FSUrl with enableFSSessionURLInEvents: true', async () => {
      const plugin = new FullStoryPlugin({ enableFSSessionUrlInEvents: true });

      await new Promise(process.nextTick);

      const event = plugin.execute({
        ...TRACK_EVENT,
      }) as TrackEventTypeWIthFSUrl;

      expect(event.properties.fullstoryUrl).toBe('sampleurl.com');
    });

    test('Should not have FSUrl with enableFSSessionURLInEvents: false', async () => {
      const plugin = new FullStoryPlugin({ enableFSSessionUrlInEvents: false });

      await new Promise(process.nextTick);

      const event = plugin.execute({ ...TRACK_EVENT }) as TrackEventType;

      expect(event.properties).toBe(undefined);
    });
  });
});
