#!/bin/bash

NAME="Trip Application"
VERSION=`node -p "require('./package.json').version"`
OUTPUT="output.dat"

echo "Building $NAME:$VERSION"

if [ -f $OUTPUT ] ; then
    rm $OUTPUT
fi

npm install

echo "Build Success"