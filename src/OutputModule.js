import Module from './Module'

export default class OutputModule extends Module {

  static isOutputModule(val) {
    return val && val instanceof OutputModule
  }

}
