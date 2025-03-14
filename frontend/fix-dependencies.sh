#!/bin/bash

# Remove node_modules and lock files
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Install dependencies with npm
npm install

# Install specific versions of problematic packages
npm install react-router-dom@6.10.0 --save
npm install react-scroll@1.8.9 --save

# Rebuild node_modules
npm rebuild 