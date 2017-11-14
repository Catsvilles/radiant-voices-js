import { Map } from 'extendable-immutable'

export default class Synth extends Map {

  constructor(props) {
    super({
      module: null,
      sunvoxVersion: new Map({ major: 1, minor: 9, point: 3, patch: 0 }),
      ...props,
    })
  }

  static isSynth(val) {
    return val && val instanceof Synth
  }

  get module() {
    return this.get('module')
  }

  get sunvoxVersion() {
    return this.get('sunvoxVersion')
  }

}
