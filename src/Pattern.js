import { Map } from 'extendable-immutable'
import PatternAppearanceFlags from './PatternAppearanceFlags'
import PatternFlags from './PatternFlags'

export default class Pattern extends Map {

  static empty() {
    return new Pattern({
      appearanceFlags: PatternAppearanceFlags.fromUint32(0),
      flags: PatternFlags.fromUint32(0),
    })
  }

  static isPattern(val) {
    return val && val instanceof Pattern
  }

  get appearanceFlags() {
    return this.get('appearanceFlags')
  }

  setAppearanceFlags(patternAppearanceFlags) {
    return this.mergeIn(['appearanceFlags'], patternAppearanceFlags)
  }

  get data() {
    return this.get('data')
  }

  setData(bytes) {
    return this.set('data', bytes)
  }

  get flags() {
    return this.get('flags')
  }

  setFlags(patternFlags) {
    return this.mergeIn(['flags'], patternFlags)
  }

  get height() {
    return this.get('height')
  }

  setHeight(uint32) {
    return this.set('height', uint32)
  }

  get lines() {
    return this.get('lines')
  }

  setLines(uint32) {
    return this.set('lines', uint32)
  }

  get tracks() {
    return this.get('tracks')
  }

  setTracks(uint32) {
    return this.set('tracks', uint32)
  }

}
