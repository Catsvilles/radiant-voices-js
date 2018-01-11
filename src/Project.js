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
      basedOnVersion: new Map({ major: 1, minor: 9, point: 3, patch: 0 }),
      currentLine: 1,
      currentPattern: 0,
      currentTrack: 0,
      globalVolume: 80,
      initialBpm: 125,
      initialTpl: 6,
      lastSelectedGenerator: 0,
      moduleConnections: new ModuleConnections(),
      modules: new Modules([outputModule]),
      modulesCurrentLayer: 0,
      modulesLayerMask: 0x00000000,
      modulesScale: 256,
      modulesXOffset: 0,
      modulesYOffset: 0,
      modulesZoom: 256,
      name: 'Project',
      patterns: new Patterns(),
      selectedModule: 0,
      sunvoxVersion: new Map({ major: 1, minor: 9, point: 3, patch: 0 }),
      timeGrid2: 4,
      timeGrid: 4,
      timelinePosition: 0,
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

  setBasedOnVersion(version) {
    return this.mergeIn(['basedOnVersion'], version)
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

  setTimeGrid(uint32) {
    return this.set('timeGrid', uint32)
  }

  get timeGrid2() {
    return this.get('timeGrid2')
  }

  setTimeGrid2(uint32) {
    return this.set('timeGrid2', uint32)
  }

  get modulesScale() {
    return this.get('modulesScale')
  }

  setModulesScale(uint32) {
    return this.set('modulesScale', uint32)
  }

  get modulesZoom() {
    return this.get('modulesZoom')
  }

  setModulesZoom(uint32) {
    return this.set('modulesZoom', uint32)
  }

  get modulesXOffset() {
    return this.get('modulesXOffset')
  }

  setModulesXOffset(int32) {
    return this.set('modulesXOffset', int32)
  }

  get modulesYOffset() {
    return this.get('modulesYOffset')
  }

  setModulesYOffset(int32) {
    return this.set('modulesYOffset', int32)
  }

  get modulesLayerMask() {
    return this.get('modulesLayerMask')
  }

  setModulesLayerMask(uint32) {
    return this.set('modulesLayerMask', uint32)
  }

  get modulesCurrentLayer() {
    return this.get('modulesCurrentLayer')
  }

  setModulesCurrentLayer(uint32) {
    return this.set('modulesCurrentLayer', uint32)
  }

  get timelinePosition() {
    return this.get('timelinePosition')
  }

  setTimelinePosition(int32) {
    return this.set('timelinePosition', int32)
  }

  get selectedModule() {
    return this.get('selectedModule')
  }

  setSelectedModule(uint32) {
    return this.set('selectedModule', uint32)
  }

  get lastSelectedGenerator() {
    return this.get('lastSelectedGenerator')
  }

  setLastSelectedGenerator(uint32) {
    return this.set('lastSelectedGenerator', uint32)
  }

  get currentPattern() {
    return this.get('currentPattern')
  }

  setCurrentPattern(uint32) {
    return this.set('currentPattern', uint32)
  }

  get currentTrack() {
    return this.get('currentTrack')
  }

  setCurrentTrack(uint32) {
    return this.set('currentTrack', uint32)
  }

  get currentLine() {
    return this.get('currentLine')
  }

  setCurrentLine(uint32) {
    return this.set('currentLine', uint32)
  }

}
