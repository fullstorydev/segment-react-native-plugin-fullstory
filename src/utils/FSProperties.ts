import isPlainObject from 'lodash.isplainobject';

import type {
  JsonList,
  JsonMap,
  JsonValue,
} from '@segment/analytics-react-native';

export class FSProperties {
  private properties: { [key: string]: any } = {};

  constructor(properties?: JsonMap) {
    this.initialize(properties);
  }

  initialize(properties?: JsonMap) {
    this.properties = {};

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
          this.addSimpleObject(key, nextElement[key]);
        }
      }
    }
  }

  addSimpleObject(key: string, obj: JsonValue) {
    if (!!this.properties[key]) {
      if (Array.isArray(this.properties[key])) {
        this.properties[key].push(obj);
      } else {
        this.properties[key] = [this.properties[key], obj];
      }
    } else {
      this.properties[key] = obj;
    }
  }

  getProperties() {
    return this.properties;
  }
}
