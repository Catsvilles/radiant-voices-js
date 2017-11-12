import { List } from 'extendable-immutable'

export default class ControllerValues extends List {

  static isControllerValues(val) {
    return val && val instanceof ControllerValues
  }

}
