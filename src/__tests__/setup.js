jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@segment/sovran-react-native', () => ({
  createStore: jest.fn(),
  registerBridgeStore: jest.fn(),
}));

jest.mock('@fullstory/react-native', () => ({
  event: jest.fn(),
  onReady: jest.fn(() => Promise.resolve({ replayStartUrl: 'sampleurl.com' })),
  identify: jest.fn(),
}));
