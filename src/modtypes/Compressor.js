import ModType from './ModType'

export default class Compressor extends ModType {

  static isCompressor(val) {
    return val && val instanceof Compressor
  }

  static name() {
    return 'Compressor'
  }

}
