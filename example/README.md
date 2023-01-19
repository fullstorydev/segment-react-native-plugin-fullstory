# FullStory Segment Plugin Test App

This is a test app for the FullStory Segment react native plugin.

## Getting Started

1. Ensure you have installed `node_modules` in the root directory.
2. Install `node_modules` in the example directory.

```
npm i

cd ios && pod install
```

2. Search for `your-org-id` within the project and replace with your FullStory Organization ID. This will be in your app `build.gradle` and `Info.plist`.

3. Search for `SEGMENT_API_KEY` within the project and replace with your Segment write key. This will be in `App.js`.

4. Run the mobile app by `npm run android` or `npm run ios` from the `example/` directory.

## Usage

Metro is set up to watch for changes in the plugin files as well as the application code. This makes it easy to test changes to the plugin code since hot reloading is set up.
