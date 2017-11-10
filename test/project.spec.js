/* global describe, it, before */

import chai from 'chai'
chai.expect()
const expect = chai.expect

import {
  Project,
  Module,
  OutputModule,
} from '../src/index'

const emptyProject = Project.empty()

describe('empty Project', () => {
  it('is a Project', () => {
    expect(Project.isProject(emptyProject)).to.equal(true)
  })
  it('has an output module', () => {
    const { outputModule } = emptyProject
    expect(OutputModule.isOutputModule(outputModule)).to.equal(true)
    expect(Module.isModule(outputModule)).to.equal(true)
  })
  it('has one module, the output module', () => {
    expect(emptyProject.modules.size).to.equal(1)
    const firstModule = emptyProject.modules.get(0)
    expect(firstModule).to.equal(emptyProject.outputModule)
  })
  it('has no module connections', () => {
    expect(emptyProject.moduleConnections.size).to.equal(0)
  })
  it('has no patterns', () => {
    expect(emptyProject.patterns.size).to.equal(0)
  })
  it('appear to be built with SunVox 1.9.3.0', () => {
    expect(emptyProject.sunvoxVersion.toJS()).to.eql({ major: 1, minor: 9, point: 3, patch: 0 })
    expect(emptyProject.basedOnVersion.toJS()).to.eql({ major: 1, minor: 9, point: 3, patch: 0 })
  })
  it('has initial BPM of 125', () => {
    expect(emptyProject.initialBpm).to.equal(125)
  })
  it('has initial TPL of 6', () => {
    expect(emptyProject.initialTpl).to.equal(6)
  })
  it('has global volume of 80', () => {
    expect(emptyProject.globalVolume).to.equal(80)
  })
  it('has the name "Project"', () => {
    expect(emptyProject.name).to.equal('Project')
  })
  it('has time grid of 4', () => {
    expect(emptyProject.timeGrid).to.equal(4)
  })
  it('has modules scale of 256', () => {
    expect(emptyProject.modulesScale).to.equal(256)
  })
  it('has modules zoom of 256', () => {
    expect(emptyProject.modulesZoom).to.equal(256)
  })
  it('has modules X offset of 0', () => {
    expect(emptyProject.modulesXOffset).to.equal(0)
  })
  it('has modules Y offset of 0', () => {
    expect(emptyProject.modulesYOffset).to.equal(0)
  })
  it('has empty layer mask', () => {
    expect(emptyProject.modulesLayerMask).to.equal(0x00000000)
  })
  it('has current layer of 0', () => {
    expect(emptyProject.modulesCurrentLayer).to.equal(0)
  })
  it('has timeline position of 0', () => {
    expect(emptyProject.timelinePosition).to.equal(0)
  })
  it('has output module (0) selected', () => {
    expect(emptyProject.selectedModule).to.equal(0)
  })
  it('has current pattern of 0', () => {
    expect(emptyProject.currentPattern).to.equal(0)
  })
  it('has current track of 0', () => {
    expect(emptyProject.currentTrack).to.equal(0)
  })
  it('has current line of 1', () => {
    expect(emptyProject.currentLine).to.equal(1)
  })
})
