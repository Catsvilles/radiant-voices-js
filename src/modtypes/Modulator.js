import Controllers from './Controllers'
import ModType from './ModType'

const ModulationType = {
  amplitude: 0,
  phase: 1,
  phaseAbs: 2,
}

const Channels = {
  stereo: 0,
  mono: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 512], initial: 256 } },
  { modulationType: { type: ModulationType, initial: ModulationType.amplitude } },
  { channels: { type: Channels, initial: Channels.stereo } },
])

export default class Modulator extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isModulator(val) {
    return val && val instanceof Modulator
  }

  static name() {
    return 'Modulator'
  }

  static initialFlags() {
    return 0x2051
  }

}

Modulator.CONTROLLERS = CONTROLLERS
Modulator.ModulationType = ModulationType
Modulator.Channels = Channels
