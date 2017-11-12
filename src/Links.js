import { List } from 'extendable-immutable'

export default class Links extends List {

  static isLinks(val) {
    return val && val instanceof Links
  }

}
