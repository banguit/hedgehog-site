#!/bin/bash

cd tools/closure-templates
ant generated-soyutils SoyToJsSrcCompiler &&
cp build/SoyToJsSrcCompiler.jar package &&
cp build/javascript/* package