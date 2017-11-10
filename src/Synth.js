import { Map } from 'extendable-immutable'

export default class Synth extends Map {

  static empty() {
    return new Synth().merge({
      initialized: true,
      module: null,
      sunvoxVersion: new Map({ major: 1, minor: 9, point: 3, patch: 0 }),
    })
  }

  static isSynth(val) {
    return val && val instanceof Synth && val.get('initialized')
  }

  get module() {
    return this.get('module')
  }

  get sunvoxVersion() {
    return this.get('sunvoxVersion')
  }

}
