import ModType from './ModType'

export default class Pitch2Ctl extends ModType {

  static isPitch2Ctl(val) {
    return val && val instanceof Pitch2Ctl
  }

  static name() {
    return 'Pitch2Ctl'
  }

}
