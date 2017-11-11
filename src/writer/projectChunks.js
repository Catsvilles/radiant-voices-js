import { chunks } from './index'

export default function *projectChunks(project) {
  const {
    sunvoxVersion,
    basedOnVersion,
    initialBpm,
    initialTpl,
    timeGrid,
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
    for (let chunk of chunks(pattern)) {
      yield chunk
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

  // TODO: patterns
  // for pattern in self.patterns:
  //     if pattern is not None:
  //         for chunk in pattern.iff_chunks():
  //             yield chunk
  //     yield (b'PEND', b'')

  // TODO: modules
  // for i, module in enumerate(self.modules):
  //     if module is not None:
  //         for chunk in module.iff_chunks():
  //             yield chunk
  //         connections = self.module_connections[i]
  //         if len(connections) > 0:
  //             connections.append(-1)
  //             structure = '<' + 'i' * len(connections)
  //             links = pack(structure, *connections)
  //         else:
  //             links = b''
  //         yield (b'SLNK', links)
  //         controllers = [n for n, c in module.controllers.items()
  //                        if c.attached(module)]
  //         for name in controllers:
  //             raw_value = module.get_raw(name)
  //             yield (b'CVAL', pack('<I', raw_value))
  //         if len(controllers) > 0:
  //             yield (b'CMID', b''.join(module.controller_midi_maps[name].cmid_data for name in controllers))
  //         if module.chnk:
  //             yield (b'CHNK', pack('<I', max(0x10, module.chnk)))
  //             for chunk in module.specialized_iff_chunks():
  //                 yield chunk
  //     yield (b'SEND', b'')

}
