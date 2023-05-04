import {
  eCommerceEventsProductListFilteredProcessed,
  eCommerceEventsProductListFilteredRaw,
} from './__fixtures__/FSSampleEvents';
import { FSProperties } from '../utils/FSProperties';

describe('FSProperties', () => {
  const fsProperties = new FSProperties({});

  describe('Test addSimpleObject()', () => {
    beforeEach(() => {
      fsProperties.initialize({});
    });

    test('Should add simple string object', () => {
      const key = 'input.key';
      const val = 'val';
      fsProperties.addSimpleObject(key, val);

      expect(fsProperties.getProperties()).toEqual({
        [key]: val,
      });
    });

    test('Should add duplicate simple string object', () => {
      const key = 'input.key';
      const val = 'val';
      const val2 = 'val2';
      const val3 = 'val3';
      fsProperties.addSimpleObject(key, val);
      fsProperties.addSimpleObject(key, val2);
      fsProperties.addSimpleObject(key, val3);

      expect(fsProperties.getProperties()).toEqual({
        [key]: [val, val2, val3],
      });
    });
  });

  describe('Test initialize()', () => {
    beforeEach(() => {
      fsProperties.initialize({});
    });

    test('Should flatten map', () => {
      const data = {
        input: [
          { key1: 'val1', key2: 'val2' },
          { key1: 'secondVal1', key2: 'secondVal2' },
        ],
      };

      fsProperties.initialize(data);

      expect(fsProperties.getProperties()).toEqual({
        ['input.key1']: ['val1', 'secondVal1'],
        ['input.key2']: ['val2', 'secondVal2'],
      });
    });

    test('Should return correct suffixed keys', () => {
      // TODO: JsonValue does not include dates
      // const date = new Date();
      const data = {
        int: 3,
        float: 3.14,
        bool: true,
        // date: date,
        strings: ['hello', 'goodbye'],
      };

      fsProperties.initialize(data);

      expect(fsProperties.getProperties()).toEqual({
        ['int']: 3,
        ['float']: 3.14,
        ['bool']: true,
        // ['date']: date,
        ['strings']: ['hello', 'goodbye'],
      });
    });

    test('Should return correct EcommerceEvent', () => {
      fsProperties.initialize(eCommerceEventsProductListFilteredRaw);

      expect(fsProperties.getProperties()).toEqual(
        eCommerceEventsProductListFilteredProcessed
      );
    });
  });
});
