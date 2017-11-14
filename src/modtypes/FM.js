import ModType from './ModType'

export default class FM extends ModType {

  static isFM(val) {
    return val && val instanceof FM
  }

  static name() {
    return 'FM'
  }

}
