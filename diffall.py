from __future__ import print_function
import os, sys

def walker(arg, dirname, fnames):
    fgood, fbad, ignore_names = arg
    for name in fnames:
        if name in ignore_names:
            continue
        if name.endswith('.sunvox'):
            p = os.path.join(dirname, name)
            retval = os.system('yarn renderDiff "{}"'.format(p))
            if retval == 0:
                f = fgood
            else:
                f = fbad
            print(p, file=f)
            f.flush()

if __name__ == '__main__':
    p = os.path.abspath(sys.argv[1])
    good, bad, ignore = sys.argv[2:5]
    with open(ignore, 'r') as fignore:
        ignore_names = [os.path.basename(line.strip()) for line in fignore]
    with open(good, 'w') as fgood, open(bad, 'w') as fbad:
        os.chdir(os.path.dirname(sys.argv[0]) or '.')
        os.path.walk(p, walker, (fgood, fbad, ignore_names))
