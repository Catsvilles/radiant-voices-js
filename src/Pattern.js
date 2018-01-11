import { Map } from 'extendable-immutable'
import Color from './Color'
import PatternAppearanceFlags from './PatternAppearanceFlags'
import PatternFlags from './PatternFlags'

export default class Pattern extends Map {

  constructor(props) {
    super({
      ...props,
      appearanceFlags: PatternAppearanceFlags.fromUint32(0),
      backgroundColor: new Color({ r: 0, g: 0, b: 0 }),
      data: new Uint8Array(0),
      flags: PatternFlags.fromUint32(0),
      foregroundColor: new Color({ r: 255, g: 255, b: 255 }),
      height: 32,
      icon: new Uint8Array(32),
      lines: 0,
      name: null,
      tracks: 0,
      x: 0,
      y: 0,
    })
  }

  static isPattern(val) {
    return val && val instanceof Pattern
  }

  get name() {
    return this.get('name')
  }

  setName(cstring) {
    return this.set('name', cstring)
  }

  get appearanceFlags() {
    return this.get('appearanceFlags')
  }

  setAppearanceFlags(patternAppearanceFlags) {
    return this.mergeIn(['appearanceFlags'], patternAppearanceFlags)
  }

  get backgroundColor() {
    return this.get('backgroundColor')
  }

  setBackgroundColor(color) {
    return this.mergeIn(['backgroundColor'], color)
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

  get foregroundColor() {
    return this.get('foregroundColor')
  }

  setForegroundColor(color) {
    return this.mergeIn(['foregroundColor'], color)
  }

  get height() {
    return this.get('height')
  }

  setHeight(uint32) {
    return this.set('height', uint32)
  }

  get icon() {
    return this.get('icon')
  }

  setIcon(bytes) {
    return this.set('icon', bytes)
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

}
