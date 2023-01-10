export class FSSuffixedProperties {
  suffixedProperties: { [key: string]: any } = {};

  getSuffixStringFromSimpleObject(item: any): String {
    let suffix = '';

    if (!isNaN(item) && !isNaN(parseFloat(item))) {
      if (Number.isInteger(item)) {
        suffix = '_int';
      } else {
        suffix = '_real';
      }
    } else if (item === true || item === false) {
      suffix = '_bool';
    } else if (Object.prototype.toString.call(item) === '[object Date]') {
      suffix = '_date';
    } else if (typeof item === 'string' || item instanceof String) {
      suffix = '_str';
    }

    return suffix;
  }

  addSimpleObject(key: string, obj: Object) {
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
}
