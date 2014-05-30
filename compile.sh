#!/bin/bash
# Compile project

# Constants
CLOSURE_DIR="app/lib/closure-library"
APP_DIR="app/"
CONTROLLERS_DIR="app/controllers"
MODELS_DIR="app/models"
VIEWS_DIR="app/views"
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#




echo "\n${HR}"
echo "\tCompiling soy files..."
echo "${HR}\n"

SOY_FILES=$(find app/view -type f -name "*.soy")
if [[ ( -n ${SOY_FILES} ) ]]; then
    for soy_file in app/view/*.soy
    do
        echo "Processing:" ${soy_file}
        java -jar ./tools/closure-templates/SoyToJsSrcCompiler.jar --shouldGenerateJsdoc --shouldProvideRequireSoyNamespaces --outputPathFormat ${soy_file}.js ${soy_file}
        echo -e "Done [ ✔ ]"
    done
else
    echo "Templates not found."
fi




echo "\nCreating dependency graph...\n"
python ${CLOSURE_DIR}/closure/bin/calcdeps.py -o deps -d ${CLOSURE_DIR} -p ${VIEWS_DIR} -p ${MODELS_DIR} -p ${CONTROLLERS_DIR} --output_file=app/deps.js
echo "Done [ ✔ ]"




echo -e "\n${HR}"
echo -e "\tCompiling JavaScript..."
echo -e "${HR}\n"

python ${CLOSURE_DIR}/closure/bin/calcdeps.py -i app/requirements.js \
    -i ${CLOSURE_DIR}/closure/goog/deps.js \
    -i deps.js \
    -p ${CLOSURE_DIR} -p ${VIEWS_DIR} -p ${MODELS_DIR} -p ${CONTROLLERS_DIR} --output_file=dist/hedgehog.app.min.js -c tools/closure-compiler/build/compiler.jar \
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
    -f "--externs=app/externs.js" \
    -o compiled

echo -e "\nDone [ ✔ ] (See log above)"