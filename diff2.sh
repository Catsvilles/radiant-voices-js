#!/bin/bash
yarn dumpchunks "$@" 2>&1 | tr -cd '\11\12\15\40-\176' > /tmp/1.txt
yarn loadsavedump "$@" 2>&1 | tr -cd '\11\12\15\40-\176' > /tmp/2.txt
diff -y -W160 /tmp/1.txt /tmp/2.txt
