import { getSuffixStringFromSimpleObject } from '../FullStoryConfig';

describe('Test getSuffixStringFromSimpleObject', () => {
  test('Correct Date suffix', () => {
    const validDate = new Date();
    expect(getSuffixStringFromSimpleObject(validDate)).toBe('_date');
  });
});
