import { Map } from 'extendable-immutable'

export default class ModuleConnections extends Map {

  static isModuleConnections(val) {
    return val && val instanceof ModuleConnections
  }

}
