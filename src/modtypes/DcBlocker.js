import ModType from './ModType'

export default class DcBlocker extends ModType {

  static isDcBlocker(val) {
    return val && val instanceof DcBlocker
  }

  static name() {
    return 'DC Blocker'
  }

}
