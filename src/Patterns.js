import { List } from 'extendable-immutable'

export default class Patterns extends List {

  static isPatterns(val) {
    return val && val instanceof Patterns
  }

}
