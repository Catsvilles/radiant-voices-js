/* global describe, it, before */

import chai from 'chai'
chai.expect()
const expect = chai.expect

import { List } from 'immutable'
import {
  chunks,
  fromIffBuffer,
  toIffBuffer,
  Project,
} from '../src/index'

const emptyProject = Project.empty()
const emptyChunks = List(chunks(emptyProject))

describe('chunks of an empty Project', () => {
  it('starts with SVOX', () => {
    const chunk = emptyChunks.first()
    expect(chunk.type).to.equal('SVOX')
    expect(chunk.data).to.eql({ empty: true })
  })
})

describe('saving and loading an empty Project', () => {
  it('is the same after loading', () => {
    const outbuf = toIffBuffer(chunks(emptyProject))
    const chunks2 = List(fromIffBuffer(outbuf))
    expect(emptyChunks.toJS()).to.eql(chunks2.toJS())
  })
})
