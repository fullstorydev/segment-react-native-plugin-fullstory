import { FSSuffixedProperties } from '../utils/FSSuffixedProperties';

describe('FSSuffixedProperties', () => {
  const fsSuffixedProperties = new FSSuffixedProperties();

  describe('Test getSuffixStringFromSimpleObject()', () => {
    test('Should return correct Date suffix', () => {
      const validDate = new Date();
      expect(
        fsSuffixedProperties.getSuffixStringFromSimpleObject(validDate)
      ).toBe('_date');
    });
    test('Should return correct String suffix', () => {
      expect(
        fsSuffixedProperties.getSuffixStringFromSimpleObject('sample string')
      ).toBe('_str');
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
      fsSuffixedProperties.suffixedProperties = {};
    });

    test('Should add simple string object', () => {
      const key = 'input.key_str';
      const val = 'val';
      fsSuffixedProperties.addSimpleObject(key, val);

      expect(fsSuffixedProperties.suffixedProperties).toEqual({ [key]: val });
    });

    test('Should add duplicate simple string object', () => {
      const key = 'input.key_str';
      const val = 'val';
      const val2 = 'val2';
      const val3 = 'val3';
      fsSuffixedProperties.addSimpleObject(key, val);
      fsSuffixedProperties.addSimpleObject(key, val2);
      fsSuffixedProperties.addSimpleObject(key, val3);

      expect(fsSuffixedProperties.suffixedProperties).toEqual({
        [key]: [val, val2, val3],
      });
    });
  });

  describe('Test pluralizeAllArrayKeys()', () => {
    beforeEach(() => {
      fsSuffixedProperties.suffixedProperties = {};
    });

    test('Should not pluralize', () => {
      const key = 'input.key_str';
      const val = 'val';
      fsSuffixedProperties.addSimpleObject(key, val);
      fsSuffixedProperties.pluralizeAllArrayKeys();

      expect(fsSuffixedProperties.suffixedProperties).toEqual({ [key]: val });
    });

    test('Should pluralize', () => {
      const key = 'input.key_str';
      const val = 'val';
      const val2 = 'val2';
      const val3 = 'val3';
      fsSuffixedProperties.addSimpleObject(key, val);
      fsSuffixedProperties.addSimpleObject(key, val2);
      fsSuffixedProperties.addSimpleObject(key, val3);
      fsSuffixedProperties.pluralizeAllArrayKeys();

      expect(fsSuffixedProperties.suffixedProperties).toEqual({
        ['input.key_strs']: [val, val2, val3],
      });
    });
  });
});
