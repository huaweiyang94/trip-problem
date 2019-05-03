#!/bin/bash

NAME="Trip Application"
VERSION=`node -p "require('./package.json').version"`
OUTPUT="output.dat"

if [ -f $OUTPUT ] ; then
    rm $OUTPUT
fi

echo "Running $NAME:$VERSION"
npm start