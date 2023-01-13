import { FullStoryPlugin } from '../FullStoryConfig';
import type { TrackEventType } from '@segment/analytics-react-native';
import FullStory from '@fullstory/react-native';
import {
  EVENT_NAME,
  identifyEvent,
  screenEvent,
  trackEvent,
} from './__fixtures__/FSSampleEvents';

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
        ...trackEvent,
      }) as TrackEventTypeWIthFSUrl;

      expect(event.properties.fullstoryUrl).toBe('sampleurl.com');
    });

    test('Should not have FSUrl with enableFSSessionURLInEvents: false', async () => {
      const plugin = new FullStoryPlugin({
        enableFSSessionUrlInEvents: false,
        allowlistAllTrackEvents: true,
      });

      await new Promise(process.nextTick);

      const event = plugin.execute({ ...trackEvent }) as TrackEventType;

      expect(event.properties).toBe(undefined);
    });
  });

  describe('Test allowlistTrackEvents', () => {
    test('Should not send track events', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: false,
      });

      plugin.execute({
        ...trackEvent,
      });

      expect(FullStory.event).not.toHaveBeenCalled();
    });

    test('Should send track events with allowlistAllTrackEvents', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: true,
      });

      plugin.execute({
        ...trackEvent,
      });

      expect(FullStory.event).toHaveBeenCalledTimes(1);
    });

    test('Should send track events with allowlistTrackEvents', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: false,
        allowlistTrackEvents: [EVENT_NAME],
      });

      plugin.execute({
        ...trackEvent,
      });

      expect(FullStory.event).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test allowlistTrackEvents', () => {
    test('Should send identify event', () => {
      const plugin = new FullStoryPlugin({
        enableIdentifyEvents: true,
      });

      plugin.execute({
        ...identifyEvent,
      });

      expect(FullStory.identify).toHaveBeenCalledTimes(1);
    });

    test('Should not send identify event', () => {
      const plugin = new FullStoryPlugin({
        enableIdentifyEvents: false,
      });

      plugin.execute({
        ...identifyEvent,
      });

      expect(FullStory.identify).not.toHaveBeenCalled();
    });
  });

  describe('Test reset', () => {
    test('Should call FS anonymize', () => {
      const plugin = new FullStoryPlugin({});

      plugin.reset();

      expect(FullStory.anonymize).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test enableSendScreenAsEvents', () => {
    test('Should call FS event', () => {
      const plugin = new FullStoryPlugin({ enableSendScreenAsEvents: true });

      plugin.execute({
        ...screenEvent,
      });

      expect(FullStory.event).toHaveBeenCalledTimes(1);
    });
  });
});
