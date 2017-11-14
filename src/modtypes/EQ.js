import ModType from './ModType'

export default class EQ extends ModType {

  static isEQ(val) {
    return val && val instanceof EQ
  }

  static name() {
    return 'EQ'
  }

}
