#!/bin/bash
asciionly="tr -cd '\11\12\15\40-\176'"
yarn dumpchunks "$@" 2>&1 | ${asciionly} > /tmp/1.txt
yarn loadsavedump "$@" 2>&1 | ${asciionly} > /tmp/2.txt
diff -y -W160 /tmp/1.txt /tmp/2.txt
