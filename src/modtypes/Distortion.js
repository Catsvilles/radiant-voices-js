import ModType from './ModType'

export default class Distortion extends ModType {

  static isDistortion(val) {
    return val && val instanceof Distortion
  }

  static name() {
    return 'Distortion'
  }

}
