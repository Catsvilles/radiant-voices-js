import { Map } from 'extendable-immutable'

export default class Pattern extends Map {

  static isPattern(val) {
    return val && val instanceof Pattern
  }

}
