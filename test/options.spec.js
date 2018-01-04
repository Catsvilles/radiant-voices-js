/* global describe, it, before */

import { expect } from 'chai'
expect()

import {
  Module,
  m,
} from '../src/index'

const module = new Module().setType(m.AnalogGenerator)

describe('Analog Generator', () => {
  it('has an option that defaults to false', () => {
    expect(module.options.volumeEnvelopeScalingPerKey).to.equal(false)
  })
  it('has an option that defaults to true', () => {
    expect(module.options.smoothFrequencyChange).to.equal(true)
  })
})
