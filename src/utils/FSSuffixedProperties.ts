import isPlainObject from 'lodash.isplainobject';

import type {
  JsonList,
  JsonMap,
  JsonValue,
} from '@segment/analytics-react-native';

export class FSSuffixedProperties {
  private suffixedProperties: { [key: string]: any } = {};

  constructor(properties?: JsonMap) {
    this.initialize(properties);
  }

  initialize(properties?: JsonMap) {
    this.suffixedProperties = {};

    const stack = [properties];

    while (!!stack.length) {
      const nextElement = stack.shift();

      if (nextElement === null || nextElement === undefined) continue;

      for (const key in nextElement) {
        if (isPlainObject(nextElement[key])) {
          const innerObject = nextElement[key] as JsonMap;

          for (const k in innerObject as JsonMap) {
            const concatenatedKey = key + '.' + k;

            stack.push({ [concatenatedKey]: innerObject[k] });
          }
        } else if (Array.isArray(nextElement[key])) {
          for (const item of nextElement[key] as JsonList) {
            stack.push({ [key]: item });
          }
        } else {
          const suffix = this.getSuffixStringFromSimpleObject(nextElement[key]);
          const newSuffix = key + suffix;
          this.addSimpleObject(newSuffix, nextElement[key]);
        }
      }
    }

    this.pluralizeAllArrayKeys();
  }

  getSuffixStringFromSimpleObject(item: JsonValue): String {
    let suffix = '';

    if (!isNaN(Number(item)) && !isNaN(parseFloat(String(item)))) {
      if (Number.isInteger(item)) {
        suffix = '_int';
      } else {
        suffix = '_real';
      }
    } else if (item === true || item === false) {
      suffix = '_bool';
      // TODO: JsonValue does not include dates
      // } else if (Object.prototype.toString.call(item) === '[object Date]') {
      //   suffix = '_date';
    } else if (typeof item === 'string' || item instanceof String) {
      suffix = '_str';
    }

    return suffix;
  }

  addSimpleObject(key: string, obj: JsonValue) {
    if (!!this.suffixedProperties[key]) {
      if (Array.isArray(this.suffixedProperties[key])) {
        this.suffixedProperties[key].push(obj);
      } else {
        this.suffixedProperties[key] = [this.suffixedProperties[key], obj];
      }
    } else {
      this.suffixedProperties[key] = obj;
    }
  }

  pluralizeAllArrayKeys() {
    for (const key in this.suffixedProperties) {
      if (Array.isArray(this.suffixedProperties[key])) {
        this.suffixedProperties[key + 's'] = this.suffixedProperties[key];
        delete this.suffixedProperties[key];
      }
    }
  }

  getSuffixedProperties() {
    return this.suffixedProperties;
  }
}
