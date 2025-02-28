// build.sh 파일

#!/bin/sh
cd ../
mkdir output
cp -R ./Frontend/* ./output
cp -R ./output ./Frontend/
