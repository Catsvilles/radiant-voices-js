import { List } from 'extendable-immutable'

export default class Modules extends List {

  static isModules(val) {
    return val && val instanceof Modules
  }

}
