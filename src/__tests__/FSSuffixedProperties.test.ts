import {
  eCommerceEventsProductListFilteredProcessed,
  eCommerceEventsProductListFilteredRaw,
} from './__fixtures__/FSSampleEvents';
import { FSSuffixedProperties } from '../utils/FSSuffixedProperties';

describe('FSSuffixedProperties', () => {
  const fsSuffixedProperties = new FSSuffixedProperties({});

  describe('Test getSuffixStringFromSimpleObject()', () => {
    // TODO: JsonValue does not include dates
    // test('Should return correct Date suffix', () => {
    //   const validDate = new Date();
    //   expect(
    //     fsSuffixedProperties.getSuffixStringFromSimpleObject(
    //       validDate.toString()
    //     )
    //   ).toBe('_date');
    // });
    test('Should return correct String suffix', () => {
      expect(
        fsSuffixedProperties.getSuffixStringFromSimpleObject('sample string')
      ).toBe('_str');
    });
    test('Should return correct String suffix from numeric string', () => {
      expect(fsSuffixedProperties.getSuffixStringFromSimpleObject('1')).toBe(
        '_str'
      );
    });
    test('Should return correct Boolean suffix', () => {
      expect(fsSuffixedProperties.getSuffixStringFromSimpleObject(true)).toBe(
        '_bool'
      );
    });
    test('Should return correct Float suffix', () => {
      expect(fsSuffixedProperties.getSuffixStringFromSimpleObject(3.14)).toBe(
        '_real'
      );
    });
    test('Should return correct Integer suffix', () => {
      expect(fsSuffixedProperties.getSuffixStringFromSimpleObject(3)).toBe(
        '_int'
      );
    });
    test('Should return empty suffix from empty object', () => {
      expect(fsSuffixedProperties.getSuffixStringFromSimpleObject({})).toBe('');
    });
  });

  describe('Test addSimpleObject()', () => {
    beforeEach(() => {
      fsSuffixedProperties.initialize({});
    });

    test('Should add simple string object', () => {
      const key = 'input.key_str';
      const val = 'val';
      fsSuffixedProperties.addSimpleObject(key, val);

      expect(fsSuffixedProperties.getSuffixedProperties()).toEqual({
        [key]: val,
      });
    });

    test('Should add duplicate simple string object', () => {
      const key = 'input.key_str';
      const val = 'val';
      const val2 = 'val2';
      const val3 = 'val3';
      fsSuffixedProperties.addSimpleObject(key, val);
      fsSuffixedProperties.addSimpleObject(key, val2);
      fsSuffixedProperties.addSimpleObject(key, val3);

      expect(fsSuffixedProperties.getSuffixedProperties()).toEqual({
        [key]: [val, val2, val3],
      });
    });
  });

  describe('Test initialize()', () => {
    beforeEach(() => {
      fsSuffixedProperties.initialize({});
    });

    test('Should flatten map', () => {
      const data = {
        input: [
          { key1: 'val1', key2: 'val2' },
          { key1: 'secondVal1', key2: 'secondVal2' },
        ],
      };

      fsSuffixedProperties.initialize(data);

      expect(fsSuffixedProperties.getSuffixedProperties()).toEqual({
        ['input.key1_strs']: ['val1', 'secondVal1'],
        ['input.key2_strs']: ['val2', 'secondVal2'],
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

      fsSuffixedProperties.initialize(data);

      expect(fsSuffixedProperties.getSuffixedProperties()).toEqual({
        ['int_int']: 3,
        ['float_real']: 3.14,
        ['bool_bool']: true,
        // ['date_date']: date,
        ['strings_strs']: ['hello', 'goodbye'],
      });
    });

    test('Should return correct EcommerceEvent', () => {
      fsSuffixedProperties.initialize(eCommerceEventsProductListFilteredRaw);

      expect(fsSuffixedProperties.getSuffixedProperties()).toEqual(
        eCommerceEventsProductListFilteredProcessed
      );
    });
  });
});
