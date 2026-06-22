#!/bin/bash
cd /home/kavia/workspace/code-generation/angular-web-application-scaffold-9181-9184/frontend_angular
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

