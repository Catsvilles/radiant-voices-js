import { Map } from 'extendable-immutable'

import Modules from './Modules'
import ModuleConnections from './ModuleConnections'
import OutputModule from './OutputModule'
import Patterns from './Patterns'

export default class Project extends Map {

  static empty() {
    const outputModule = new OutputModule()
    return new Project().merge({
      initialized: true,
      modules: new Modules([outputModule]),
      moduleConnections: new ModuleConnections(),
      outputModule,
      patterns: new Patterns(),
      sunvoxVersion: [1, 9, 2, 0],
      basedOnVersion: [1, 9, 2, 0],
      initialBpm: 125,
      initialTpl: 6,
      globalVolume: 80,
      name: 'Project',
      timeGrid: 4,
      modulesScale: 256,
      modulesZoom: 256,
      modulesXOffset: 0,
      modulesYOffset: 0,
      modulesLayerMask: 0x00000000,
      modulesCurrentLayer: 0,
      timelinePosition: 0,
      selectedModule: 0,
      currentPattern: 0,
      currentTrack: 0,
      currentLine: 1,
    })
  }

  static isProject(val) {
    return val && val instanceof Project && val.get('initialized')
  }

  get modules() {
    return this.get('modules')
  }

  get moduleConnections() {
    return this.get('moduleConnections')
  }

  get outputModule() {
    return this.get('outputModule')
  }

  get patterns() {
    return this.get('patterns')
  }

  get sunvoxVersion() {
    return this.get('sunvoxVersion')
  }

  get basedOnVersion() {
    return this.get('basedOnVersion')
  }

  get initialBpm() {
    return this.get('initialBpm')
  }

  get initialTpl() {
    return this.get('initialTpl')
  }

  get globalVolume() {
    return this.get('globalVolume')
  }

  get name() {
    return this.get('name')
  }

  get timeGrid() {
    return this.get('timeGrid')
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
