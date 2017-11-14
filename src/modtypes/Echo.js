import ModType from './ModType'

export default class Echo extends ModType {

  static isEcho(val) {
    return val && val instanceof Echo
  }

  static name() {
    return 'Echo'
  }

}
