/* global describe, it, before */

import { expect } from 'chai'

expect()

import {
  Module,
  m,
} from '../src/index'

const module = new Module().setType(m.LFO)

describe('LFO', () => {
  it('has a "volume" controller that defaults to 256', () => {
    expect(module.ctls.volume).to.equal(256)
  })
  it('has a "volume" controller that can be changed', () => {
    const mod = module.setCtls(module.ctls.setVolume(128))
    expect(mod.ctls.volume).to.equal(128)
  })
  it('has a "freq" controller that has limits based on "frequencyUnit"', () => {
    let mod = module
    mod = mod.setCtls(module.ctls.setFrequencyUnit(m.LFO.FrequencyUnit.ms))
    mod = mod.setCtls(mod.ctls.setFreq(4001))
    expect(mod.ctls.freq).to.equal(4000)
  })
  it('sets "freq" within new bounds whenever "frequencyUnit" changes', () => {
    let mod = module
    mod = mod.setCtls(mod.ctls.setFrequencyUnit(m.LFO.FrequencyUnit.hz))
    mod = mod.setCtls(mod.ctls.setFreq(16384))
    expect(mod.ctls.freq).to.equal(16384)
    mod = mod.setCtls(mod.ctls.setFrequencyUnit(m.LFO.FrequencyUnit.ms))
    expect(mod.ctls.freq).to.equal(4000)
  })
})
