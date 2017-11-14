import { Map } from 'extendable-immutable'

export default class ModType extends Map {

  static isModType(val) {
    return val && val instanceof ModType
  }

  static name() {
    return null
  }

  get name() {
    return this.constructor.name()
  }

}
