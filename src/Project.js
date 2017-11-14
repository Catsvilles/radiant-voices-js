import { Map } from 'extendable-immutable'

import Module from './Module'
import Modules from './Modules'
import ModuleConnections from './ModuleConnections'
import Patterns from './Patterns'
import Output from './modtypes/Output'

export default class Project extends Map {

  constructor(props) {
    const outputModule = new Module().setType(Output)
    super({
      modules: new Modules([outputModule]),
      moduleConnections: new ModuleConnections(),
      patterns: new Patterns(),
      sunvoxVersion: new Map({ major: 1, minor: 9, point: 3, patch: 0 }),
      basedOnVersion: new Map({ major: 1, minor: 9, point: 3, patch: 0 }),
      initialBpm: 125,
      initialTpl: 6,
      globalVolume: 80,
      name: 'Project',
      timeGrid: 4,
      timeGrid2: 4,
      modulesScale: 256,
      modulesZoom: 256,
      modulesXOffset: 0,
      modulesYOffset: 0,
      modulesLayerMask: 0x00000000,
      modulesCurrentLayer: 0,
      timelinePosition: 0,
      selectedModule: 0,
      lastSelectedGenerator: 0,
      currentPattern: 0,
      currentTrack: 0,
      currentLine: 1,
      ...props,
    })
  }

  static isProject(val) {
    return val && val instanceof Project
  }

  get modules() {
    return this.get('modules')
  }

  pushModule(module) {
    return this.set('modules', this.modules.push(module))
  }

  get moduleConnections() {
    return this.get('moduleConnections')
  }

  get outputModule() {
    return this.get('modules').first()
  }

  get patterns() {
    return this.get('patterns')
  }

  pushPattern(pattern) {
    return this.set('patterns', this.patterns.push(pattern))
  }

  get sunvoxVersion() {
    return this.get('sunvoxVersion')
  }

  setSunvoxVersion(version) {
    return this.mergeIn(['sunvoxVersion'], version)
  }

  get basedOnVersion() {
    return this.get('basedOnVersion')
  }

  get initialBpm() {
    return this.get('initialBpm')
  }

  setInitialBpm(uint32) {
    return this.set('initialBpm', uint32)
  }

  get initialTpl() {
    return this.get('initialTpl')
  }

  setInitialTpl(uint32) {
    return this.set('initialTpl', uint32)
  }

  get globalVolume() {
    return this.get('globalVolume')
  }

  setGlobalVolume(uint32) {
    return this.set('globalVolume', uint32)
  }

  get name() {
    return this.get('name')
  }

  setName(cstring) {
    return this.set('name', cstring)
  }

  get timeGrid() {
    return this.get('timeGrid')
  }

  get timeGrid2() {
    return this.get('timeGrid2')
  }

  get modulesScale() {
    return this.get('modulesScale')
  }

  get modulesZoom() {
    return this.get('modulesZoom')
  }

  get modulesXOffset() {
    return this.get('modulesXOffset')
  }

  get modulesYOffset() {
    return this.get('modulesYOffset')
  }

  get modulesLayerMask() {
    return this.get('modulesLayerMask')
  }

  get modulesCurrentLayer() {
    return this.get('modulesCurrentLayer')
  }

  get timelinePosition() {
    return this.get('timelinePosition')
  }

  get selectedModule() {
    return this.get('selectedModule')
  }

  get lastSelectedGenerator() {
    return this.get('lastSelectedGenerator')
  }

  get currentPattern() {
    return this.get('currentPattern')
  }

  get currentTrack() {
    return this.get('currentTrack')
  }

  get currentLine() {
    return this.get('currentLine')
  }

}
