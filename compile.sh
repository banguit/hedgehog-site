#!/bin/bash
# Compile project

# Constants
CLOSURE_DIR="libs/closure-library"
CLOSURE_TEMPLATE_DIR="tools/closure-templates"
PLASTRONJS_DIR="libs/PlastronJS"
APP_DIR="app/"
LIBS_DIR="libs/"
VIEWS_DIR="app/views"
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


echo "\n${HR}"
echo "\tCompiling soy files..."
echo "${HR}\n"

SOY_FILES=$(find ${VIEWS_DIR} -type f -name "*.soy")
if [[ ( -n ${SOY_FILES} ) ]]; then
    for soy_file in ${VIEWS_DIR}/*.soy
    do
        echo "Processing:" ${soy_file}
        java -jar ./tools/closure-templates/SoyToJsSrcCompiler.jar --shouldGenerateJsdoc --shouldProvideRequireSoyNamespaces --outputPathFormat ${soy_file}.js ${soy_file}
        echo "Done [ ✔ ]"
    done
else
    echo "Templates not found."
fi


echo "\nCreating dependency graph...\n"
python ${CLOSURE_DIR}/closure/bin/calcdeps.py -o deps -d ${CLOSURE_DIR} -p ${CLOSURE_TEMPLATE_DIR} -p ${PLASTRONJS_DIR} -p ${APP_DIR} --output_file=app/deps.js
echo "Done [ ✔ ]"


echo "\n${HR}"
echo "\tCompiling JavaScript..."
echo "${HR}\n"

python ${CLOSURE_DIR}/closure/bin/calcdeps.py -i app/requirements.js \
    -i ${CLOSURE_DIR}/closure/goog/deps.js \
    -i ${APP_DIR}deps.js \
    -p ${CLOSURE_DIR}  -p ${CLOSURE_TEMPLATE_DIR} -p ${PLASTRONJS_DIR} -p ${APP_DIR} --output_file=dist/hedgehog.app.min.js -c ./tools/closure-compiler/build/compiler.jar \
    -f "--compilation_level=ADVANCED_OPTIMIZATIONS" \
    -f "--debug=false" \
    -f "--process_closure_primitives=true" \
    -f "--manage_closure_dependencies=true" \
    -f "--warning_level=VERBOSE" \
    -f "--output_wrapper=\"(function(){%output%})();\"" \
    -f "--jscomp_warning=accessControls" \
    -f "--jscomp_warning=checkDebuggerStatement" \
    -f "--jscomp_warning=checkRegExp" \
    -f "--jscomp_warning=const" \
    -f "--jscomp_warning=constantProperty" \
    -f "--jscomp_warning=invalidCasts" \
    -f "--jscomp_warning=strictModuleDepCheck" \
    -f "--jscomp_warning=visibility" \
    -f "--externs=${APP_DIR}externs.js" \
    -o compiled

echo "\nDone [ ✔ ] (See log above)"