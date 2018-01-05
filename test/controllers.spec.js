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
    const m = module.setCtls(module.ctls.setVolume(128))
    expect(m.ctls.volume).to.equal(128)
  })
})
