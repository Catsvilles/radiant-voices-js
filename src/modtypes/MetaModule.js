import ModType from './ModType'

export default class MetaModule extends ModType {

  static isMetaModule(val) {
    return val && val instanceof MetaModule
  }

  static name() {
    return 'MetaModule'
  }

}
