import Module from './Module'
import ModuleFlags from './ModuleFlags'

export default class OutputModule extends Module {

  constructor() {
    super({
      flags: ModuleFlags.fromUint32(0x43),
    })
  }

  static isOutputModule(val) {
    return val && val instanceof OutputModule
  }

}
