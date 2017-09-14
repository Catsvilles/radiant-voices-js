/* global describe, it, before */

import chai from 'chai'
chai.expect()
const expect = chai.expect

import { List } from 'immutable'
import {
  chunks,
  Project,
} from '../src/index'

const emptyProject = Project.empty()
const emptyChunks = List(chunks(emptyProject))

describe('chunks of an empty Project', () => {
  it('starts with SVOX', () => {
    const chunk = emptyChunks.first()
    expect(chunk.type).to.equal('SVOX')
    expect(chunk.data).to.equal(undefined)
  })
})
