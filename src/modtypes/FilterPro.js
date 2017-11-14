import ModType from './ModType'

export default class FilterPro extends ModType {

  static isFilterPro(val) {
    return val && val instanceof FilterPro
  }

  static name() {
    return 'Filter Pro'
  }

}
