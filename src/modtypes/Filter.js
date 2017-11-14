import ModType from './ModType'

export default class Filter extends ModType {

  static isFilter(val) {
    return val && val instanceof Filter
  }

  static name() {
    return 'Filter'
  }

}
