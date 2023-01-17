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
