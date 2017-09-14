import { Map } from 'extendable-immutable'

export default class Module extends Map {

  static isModule(val) {
    return val && val instanceof Module
  }

}
