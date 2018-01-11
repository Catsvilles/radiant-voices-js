#!/usr/bin/env python3.6

import glob

import rv.api

MMARGS = {
    'input_module': 255,
    'play_patterns': True,
}

if __name__ == '__main__':
    for d in sorted(glob.glob('/tmp/renderDiff*')):
        print(d)
        try:
            origproj = rv.api.read_sunvox_file(f'{d}/orig.sunvox')
            rvproj = rv.api.read_sunvox_file(f'{d}/rv.sunvox')
            proj = rv.api.Project()
            proj.initial_bpm = 1
            proj.initial_tpl = 31
            summing = proj.new_module(rv.api.m.Amplifier, name='sum')
            passthru = proj.new_module(rv.api.m.Amplifier, name='orig')
            invert = proj.new_module(rv.api.m.Amplifier, inverse=True, name='rv')
            trigger = proj.new_module(rv.api.m.MultiSynth, name='trigger')
            origmod = proj.new_module(
                rv.api.m.MetaModule,
                name='orig',
                project=origproj,
                bpm=origproj.initial_bpm,
                tpl=origproj.initial_tpl,
                **MMARGS,
            )
            rvmod = proj.new_module(
                rv.api.m.MetaModule,
                name='rv',
                project=rvproj,
                bpm=rvproj.initial_bpm,
                tpl=rvproj.initial_tpl,
                **MMARGS,
            )
            trigger >> origmod >> passthru >> summing
            trigger >> rvmod >> invert >> summing
            summing >> proj.output
            proj.layout()
            pattern = rv.api.Pattern(
                tracks=2,
                lines=1024,
            )
            cell1 = pattern.data[0][0]
            cell1.note = rv.api.NOTE.C5
            cell1.module = trigger.index + 1
            proj.attach_pattern(pattern)
            with open(f'{d}/compare.sunvox', 'wb') as f:
                proj.write_to(f)
        except KeyboardInterrupt as e:
            break
        except:
            continue
