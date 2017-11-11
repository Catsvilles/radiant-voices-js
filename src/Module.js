import { Map } from 'extendable-immutable'
import ModuleFlags from './ModuleFlags'

export default class Module extends Map {

  static empty() {
    return new Module({
      flags: ModuleFlags.fromUint32(0),
    })
  }

  static isModule(val) {
    return val && val instanceof Module
  }

  get flags() {
    return this.get('flags')
  }

  setFlags(moduleFlags) {
    return this.mergeIn(['flags'], moduleFlags)
  }

}
