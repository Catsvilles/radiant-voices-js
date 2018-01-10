import { Map } from 'extendable-immutable'
import PatternFlags from './PatternFlags'

export default class PatternClone extends Map {

  constructor(props) {
    super({
      index: null,
      flags: PatternFlags.fromUint32(0),
      x: 0,
      y: 0,
      ...props,
    })
  }

  static isPatternClone(val) {
    return val && val instanceof PatternClone
  }

  get flags() {
    return this.get('flags')
  }

  setFlags(patternFlags) {
    return this.mergeIn(['flags'], patternFlags)
  }

  get x() {
    return this.get('x')
  }

  setX(int32) {
    return this.set('x', int32)
  }

  get y() {
    return this.get('y')
  }

  setY(int32) {
    return this.set('y', int32)
  }

  get index() {
    return this.get('index')
  }

  setIndex(int32) {
    return this.set('index', int32)
  }

}
