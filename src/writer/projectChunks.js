import { chunks } from './index'

export default function *projectChunks(project) {
  const {
    sunvoxVersion,
    basedOnVersion,
    initialBpm,
    initialTpl,
    timeGrid,
    timeGrid2,
    globalVolume,
    name,
    modulesScale,
    modulesZoom,
    modulesXOffset,
    modulesYOffset,
    modulesLayerMask,
    modulesCurrentLayer,
    timelinePosition,
    selectedModule,
    lastSelectedGenerator,
    currentPattern,
    currentTrack,
    currentLine,
    patterns,
    modules,
  } = project
  yield { type: 'SVOX', data: { empty: true } }
  yield { type: 'VERS', data: { version: sunvoxVersion.toJS() } }
  yield { type: 'BVER', data: { version: basedOnVersion.toJS() } }
  yield { type: 'BPM ', data: { uint32: initialBpm } }
  yield { type: 'SPED', data: { uint32: initialTpl } }
  yield { type: 'TGRD', data: { uint32: timeGrid } }
  yield { type: 'TGD2', data: { uint32: timeGrid2 } }
  yield { type: 'GVOL', data: { uint32: globalVolume } }
  yield { type: 'NAME', data: { cstring: name } }
  yield { type: 'MSCL', data: { uint32: modulesScale } }
  yield { type: 'MZOO', data: { uint32: modulesZoom } }
  yield { type: 'MXOF', data: { int32: modulesXOffset } }
  yield { type: 'MYOF', data: { int32: modulesYOffset } }
  yield { type: 'LMSK', data: { uint32: modulesLayerMask } }
  yield { type: 'CURL', data: { uint32: modulesCurrentLayer } }
  yield { type: 'TIME', data: { int32: timelinePosition } }
  yield { type: 'SELS', data: { uint32: selectedModule } }
  yield { type: 'LGEN', data: { uint32: lastSelectedGenerator } }
  yield { type: 'PATN', data: { uint32: currentPattern } }
  yield { type: 'PATT', data: { uint32: currentTrack } }
  yield { type: 'PATL', data: { uint32: currentLine } }
  for (let pattern of patterns) {
    if (pattern) {
      for (let chunk of chunks(pattern)) {
        yield chunk
      }
    }
    yield { type: 'PEND', data: { empty: true } }
  }
  for (let module of modules) {
    if (module) {
      for (let chunk of chunks(module)) {
        yield chunk
      }
    }
    yield { type: 'SEND', data: { empty: true } }
  }
}
