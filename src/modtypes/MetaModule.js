import Controllers from './Controllers'
import ModType from './ModType'
import Options, { flag, inverted } from './Options'

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 1024], initial: 256 } },
  { inputModule: { type: [1, 256], initial: 1 } },
  { playPatterns: { type: Boolean, initial: false } },
  { bpm: { type: [1, 800], initial: 125 } },
  { tpl: { type: [1, 31], initial: 6 } },
])

const OPTIONS = new Options([
  { userDefinedControllers: [0, 27] },
  { arpeggiator: flag },
  { applyVelocityToProject: flag },
  { eventOutput: inverted },
])

export default class MetaModule extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
      options: OPTIONS.instance(),
    })
  }

  static isMetaModule(val) {
    return val && val instanceof MetaModule
  }

  static name() {
    return 'MetaModule'
  }

}

MetaModule.CONTROLLERS = CONTROLLERS
MetaModule.OPTIONS = OPTIONS
