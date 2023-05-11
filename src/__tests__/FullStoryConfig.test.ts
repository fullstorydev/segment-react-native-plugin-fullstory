import { FullStoryPlugin } from '../FullStoryConfig';
import type { TrackEventType } from '@segment/analytics-react-native';
import FullStory from '@fullstory/react-native';
import {
  EVENT_NAME,
  generateGroupEvent,
  generateIdentifyEvent,
  generateScreenEvent,
  generateTrackEvent,
  GROUP_ID,
  SAMPLE_PROPERTY,
  SAMPLE_TRAIT,
  SCREEN_NAME,
  USER_ID,
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
        ...generateTrackEvent(),
      }) as TrackEventTypeWIthFSUrl;

      expect(event.properties.fullstoryUrl).toBe('sampleurl.com');
    });

    test('Should not have FSUrl with enableFSSessionURLInEvents: false', async () => {
      const plugin = new FullStoryPlugin({
        enableFSSessionUrlInEvents: false,
        allowlistAllTrackEvents: true,
      });

      await new Promise(process.nextTick);

      const event = plugin.execute({
        ...generateTrackEvent(),
      }) as TrackEventType;

      expect(event.properties?.fullstoryUrl).toBe(undefined);
    });
  });

  describe('Test allowlistTrackEvents', () => {
    test('Should not send track events', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: false,
      });

      plugin.execute({
        ...generateTrackEvent(),
      });

      expect(FullStory.event).not.toHaveBeenCalled();
    });

    test('Should send track events with allowlistAllTrackEvents', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: true,
      });

      plugin.execute({
        ...generateTrackEvent(),
      });

      expect(FullStory.event).toHaveBeenCalledWith(EVENT_NAME, {
        sampleProperty: SAMPLE_PROPERTY,
      });
    });

    test('Should send track events with allowlistTrackEvents', () => {
      const plugin = new FullStoryPlugin({
        allowlistAllTrackEvents: false,
        allowlistTrackEvents: [EVENT_NAME],
      });

      plugin.execute({
        ...generateTrackEvent(),
      });

      expect(FullStory.event).toHaveBeenCalledWith(EVENT_NAME, {
        sampleProperty: SAMPLE_PROPERTY,
      });
    });
  });

  describe('Test allowlistTrackEvents', () => {
    test('Should send identify event', () => {
      const plugin = new FullStoryPlugin({
        enableIdentifyEvents: true,
      });

      plugin.execute({
        ...generateIdentifyEvent(),
      });

      expect(FullStory.identify).toHaveBeenCalledWith(USER_ID, {
        sampleTrait: SAMPLE_TRAIT,
      });
    });

    test('Should not send identify event', () => {
      const plugin = new FullStoryPlugin({
        enableIdentifyEvents: false,
      });

      plugin.execute({
        ...generateIdentifyEvent(),
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
        ...generateScreenEvent(),
      });

      expect(FullStory.event).toHaveBeenCalledWith(
        'Segment Screen: ' + SCREEN_NAME,
        { sampleProperty: SAMPLE_PROPERTY }
      );
    });
  });

  describe('Test enableGroupTraitsAsUserVars', () => {
    test('Should send FS userVars without traits', () => {
      const plugin = new FullStoryPlugin({
        enableGroupTraitsAsUserVars: false,
      });

      plugin.execute({
        ...generateGroupEvent(),
      });

      expect(FullStory.setUserVars).toHaveBeenCalledWith({
        groupID: GROUP_ID,
      });
    });

    test('Should send FS userVars with traits', () => {
      const plugin = new FullStoryPlugin({
        enableGroupTraitsAsUserVars: true,
      });

      plugin.execute({
        ...generateGroupEvent(),
      });

      expect(FullStory.setUserVars).toHaveBeenCalledWith({
        groupID: GROUP_ID,
        sampleTrait: SAMPLE_TRAIT,
      });
    });
  });
});
