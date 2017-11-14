import ModType from './ModType'

export default class Glide extends ModType {

  static isGlide(val) {
    return val && val instanceof Glide
  }

  static name() {
    return 'Glide'
  }

}
