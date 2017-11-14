import ModType from './ModType'

export default class DrumSynth extends ModType {

  static isDrumSynth(val) {
    return val && val instanceof DrumSynth
  }

  static name() {
    return 'DrumSynth'
  }

}
