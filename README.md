# @fullstory/segment-react-native-plugin-fullstory

`EnrichmentPlugin` for [FullStory](https://www.fullstory.com/). This is a segment analytics plugin that wraps [`@fullstory/react-native`](https://github.com/fullstorydev/fullstory-react-native).

## Prerequisite

### Setting up FullStory

Please make sure that your application is correctly set up with FullStory. See [FullStory's React Native documentation](https://help.fullstory.com/hc/en-us/articles/360052419133-Getting-Started-with-FullStory-React-Native-Capture) to get started.

### Setting up Segment

This plugin works in conjunction with `@segment/analytics-react-native`. Follow Segment's [installation instructions](https://github.com/segmentio/analytics-react-native#installation).

## Installation

Install the `@fullstory/segment-react-native-plugin-fullstory` and `@fullstory/react-native` dependencies.

```bash
yarn add @fullstory/segment-react-native-plugin-fullstory @fullstory/react-native
# or
npm install --save @fullstory/segment-react-native-plugin-fullstory @fullstory/react-native
```

Run `pod install` after the installation to autolink the FullStory SDK.

## Usage

In your code where you initialize the analytics client call the `.add({ plugin })` method with an `FullStoryPlugin` instance.

```ts
// App.js

import { createClient } from '@segment/analytics-react-native';
import { FullStoryPlugin } from '@fullstory/segment-react-native-plugin-fullstory';

const segmentClient = createClient({
  writeKey: 'SEGMENT_WRITE_KEY',
});

const plugin = new FullStoryPlugin({
  // configurations
  enableFSSessionUrlInEvents: true,
});

segmentClient.add({ plugin });
```

### Configurations

The plugin accepts a configuration object with the following properties:

| Property                   | Description                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| enableFSSessionUrlInEvents | Inserts FS session URL to Segment event properties. Defaults to `true`.                                        |
| allowlistAllTrackEvents    | Send all track events as FS custom events. Defaults to `false`.                                                |
| enableIdentifyEvents       | Enable Segment identify events to be sent as FS identify events. Defaults to `true`                            |
| allowlistTrackEvents       | An array of event names to allow to send to FullStory. To allowlist all events, use `allowlistAllTrackEvents`. |
| enableSendScreenAsEvents   | Send screen events as FS custom events. Defaults to `false` .                                                  |

## Example

We included a simple react native app that implements the plugin under `./example`. See [example README](./example/README.md) for additional instructions.

## License

MIT
