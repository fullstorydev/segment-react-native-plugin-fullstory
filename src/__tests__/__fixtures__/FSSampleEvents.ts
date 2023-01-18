import {
  EventType,
  TrackEventType,
  IdentifyEventType,
  ScreenEventType,
  GroupEventType,
} from '@segment/analytics-react-native';

export const eCommerceEventsProductListFilteredRaw = {
  list_id: 'todays_deals_may_11_2019',
  filters: [
    {
      type: 'department',
      value: 'beauty',
    },
    {
      type: 'price',
      value: 'under-$25',
    },
  ],
  sorts: [
    {
      type: 'price',
      value: 'desc',
    },
  ],
  products: [
    {
      product_id: '507f1f77bcf86cd798439011',
      sku: '45360-32',
      name: 'Special Facial Soap',
      price: 12.6,
      position: 1,
      category: 'Beauty',
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc283733',
      sku: '46573-32',
      name: 'Fancy Hairbrush',
      price: 7.6,
      position: 2,
      category: 'Beauty',
    },
  ],
};

export const eCommerceEventsProductListFilteredProcessed = {
  'list_id_str': 'todays_deals_may_11_2019',
  'filters.type_strs': ['department', 'price'],
  'filters.value_strs': ['beauty', 'under-$25'],
  'sorts.type_str': 'price',
  'sorts.value_str': 'desc',
  'products.product_id_strs': [
    '507f1f77bcf86cd798439011',
    '505bd76785ebb509fc283733',
  ],
  'products.sku_strs': ['45360-32', '46573-32'],
  'products.name_strs': ['Special Facial Soap', 'Fancy Hairbrush'],
  'products.price_reals': [12.6, 7.6],
  'products.position_ints': [1, 2],
  'products.category_strs': ['Beauty', 'Beauty'],
  'products.url_str': 'https://www.example.com/product/path',
  'products.image_url_str': 'https://www.example.com/product/path.jpg',
};

export const EVENT_NAME = 'sample event';
export const GROUP_ID = 'sample groupID';
export const SAMPLE_TRAIT = 'sample trait';
export const USER_ID = 'user123';
export const SAMPLE_PROPERTY = 'sample property';
export const SCREEN_NAME = 'sample screen';

export const generateTrackEvent = (): TrackEventType => {
  return {
    type: EventType.TrackEvent,
    event: EVENT_NAME,
    properties: {
      sampleProperty: SAMPLE_PROPERTY,
    },
  };
};

export const generateIdentifyEvent = (): IdentifyEventType => {
  return {
    type: EventType.IdentifyEvent,
    userId: USER_ID,
    traits: {
      sampleTrait: SAMPLE_TRAIT,
    },
  };
};

export const generateScreenEvent = (): ScreenEventType => {
  return {
    type: EventType.ScreenEvent,
    name: SCREEN_NAME,
    properties: {
      sampleProperty: SAMPLE_PROPERTY,
    },
  };
};

export const generateGroupEvent = (): GroupEventType => {
  return {
    type: EventType.GroupEvent,
    groupId: GROUP_ID,
    traits: {
      sampleTrait: SAMPLE_TRAIT,
    },
  };
};
