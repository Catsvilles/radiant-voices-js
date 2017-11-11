import { Map } from 'extendable-immutable'

export default class ModuleFlags extends Map {

  static isModuleFlags(val) {
    return val && val instanceof ModuleFlags
  }

  static fromUint32(value) {
    return new ModuleFlags({
      // user-modifiable
      mute: !!(value & 0x80),
      solo: !!(value & 0x100),
      bypass: !!(value & 0x4000),
      // internal
      exists: !!(value & 0x1),
      output: !!(value & 0x2),
      generator: !!(value & 0x8),
      effect: !!(value & 0x10),
      initialized: !!(value & 0x40),
      getSpeedChanges: !!(value & 0x400),
      hidden: !!(value & 0x800),
      multi: !!(value & 0x1000),
      dontFillInput: !!(value & 0x2000),
      useMutex: !!(value & 0x8000),
      ignoreMute: !!(value & 0x10000),
      noScopeBuffer: !!(value & 0x20000),
      outputIsEmpty: !!(value & 0x40000),
      open: !!(value & 0x80000),
      getPlayCommands: !!(value & 0x100000),
      getRenderSetupCommands: !!(value & 0x200000),
      feedback: !!(value & 0x400000),
      getStopCommands: !!(value & 0x800000),
    })
  }

  toUint32() {
    return [
      !!this.get('mute') * 0x80,
      !!this.get('solo') * 0x100,
      !!this.get('bypass') * 0x4000,
      !!this.get('exists') * 0x1,
      !!this.get('output') * 0x2,
      !!this.get('generator') * 0x8,
      !!this.get('effect') * 0x10,
      !!this.get('initialized') * 0x40,
      !!this.get('getSpeedChanges') * 0x400,
      !!this.get('hidden') * 0x800,
      !!this.get('multi') * 0x1000,
      !!this.get('dontFillInput') * 0x2000,
      !!this.get('useMutex') * 0x8000,
      !!this.get('ignoreMute') * 0x10000,
      !!this.get('noScopeBuffer') * 0x20000,
      !!this.get('outputIsEmpty') * 0x40000,
      !!this.get('open') * 0x80000,
      !!this.get('getPlayCommands') * 0x100000,
      !!this.get('getRenderSetupCommands') * 0x200000,
      !!this.get('feedback') * 0x400000,
      !!this.get('getStopCommands') * 0x800000,
    ].reduce((x, y) => x + y)
  }

  get mute() {
    return this.get('mute')
  }

  setMute(value) {
    return this.set('mute', !!value)
  }

  get solo() {
    return this.get('solo')
  }

  setSolo(value) {
    return this.set('solo', !!value)
  }

  get bypass() {
    return this.get('bypass')
  }

  setBypass(value) {
    return this.set('bypass', !!value)
  }

  get exists() {
    return this.get('exists')
  }

  setExists(value) {
    return this.set('exists', !!value)
  }

  get output() {
    return this.get('output')
  }

  setOutput(value) {
    return this.set('output', !!value)
  }

  get generator() {
    return this.get('generator')
  }

  setGenerator(value) {
    return this.set('generator', !!value)
  }

  get effect() {
    return this.get('effect')
  }

  setEffect(value) {
    return this.set('effect', !!value)
  }

  get initialized() {
    return this.get('initialized')
  }

  setInitialized(value) {
    return this.set('initialized', !!value)
  }

  get getSpeedChanges() {
    return this.get('getSpeedChanges')
  }

  setGetSpeedChanges(value) {
    return this.set('getSpeedChanges', !!value)
  }

  get hidden() {
    return this.get('hidden')
  }

  setHidden(value) {
    return this.set('hidden', !!value)
  }

  get multi() {
    return this.get('multi')
  }

  setMulti(value) {
    return this.set('multi', !!value)
  }

  get dontFillInput() {
    return this.get('dontFillInput')
  }

  setDontFillInput(value) {
    return this.set('dontFillInput', !!value)
  }

  get useMutex() {
    return this.get('useMutex')
  }

  setUseMutex(value) {
    return this.set('useMutex', !!value)
  }

  get ignoreMute() {
    return this.get('ignoreMute')
  }

  setIgnoreMute(value) {
    return this.set('ignoreMute', !!value)
  }

  get noScopeBuffer() {
    return this.get('noScopeBuffer')
  }

  setNoScopeBuffer(value) {
    return this.set('noScopeBuffer', !!value)
  }

  get outputIsEmpty() {
    return this.get('outputIsEmpty')
  }

  setOutputIsEmpty(value) {
    return this.set('outputIsEmpty', !!value)
  }

  get open() {
    return this.get('open')
  }

  setOpen(value) {
    return this.set('open', !!value)
  }

  get getPlayCommands() {
    return this.get('getPlayCommands')
  }

  setGetPlayCommands(value) {
    return this.set('getPlayCommands', !!value)
  }

  get getRenderSetupCommands() {
    return this.get('getRenderSetupCommands')
  }

  setGetRenderSetupCommands(value) {
    return this.set('getRenderSetupCommands', !!value)
  }

  get feedback() {
    return this.get('feedback')
  }

  setFeedback(value) {
    return this.set('feedback', !!value)
  }

  get getStopCommands() {
    return this.get('getStopCommands')
  }

  setGetStopCommands(value) {
    return this.set('getStopCommands', !!value)
  }

}
