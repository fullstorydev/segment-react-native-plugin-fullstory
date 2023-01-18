import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { createClient } from '@segment/analytics-react-native';
import FullStory from '@fullstory/react-native';
import { FullStoryPlugin } from '@fullstory/segment-react-native-plugin-fullstory';

FullStory.onReady().then(function (result) {
  const replayStartUrl = result.replayStartUrl;
  console.log('replayStartUrl: ', replayStartUrl);
});

const segmentClient = createClient({
  writeKey: 'SEGMENT_API_KEY',
  trackAppLifecycleEvents: true,
});

segmentClient.add({
  plugin: new FullStoryPlugin({
    allowlistAllTrackEvents: true,
    enableSendScreenAsEvents: true,
    enableGroupTraitsAsUserVars: true,
  }),
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              segmentClient.track('Awesome event', {
                productId: 123,
                productName: 'Striped trousers',
              });
            }}
          >
            <Text>Send Track</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              segmentClient.identify('userId', { name: 'john' });
            }}
          >
            <Text>Send Identify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              segmentClient.reset();
            }}
          >
            <Text>Send Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              segmentClient.screen('Home Screen', { productId: 123 });
            }}
          >
            <Text>Send Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              segmentClient.group('group123', { name: 'sample group' });
            }}
          >
            <Text>Send Group</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'gray',
    padding: 20,
    margin: 10,
  },
});

export default App;
