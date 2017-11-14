import ModType from './ModType'

export default class PitchShifter extends ModType {

  static isPitchShifter(val) {
    return val && val instanceof PitchShifter
  }

  static name() {
    return 'Pitch shifter'
  }

}
