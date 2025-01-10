#!/bin/bash
# 1) chmod +x build.sh
# 2) ./build.sh [patch|minor|major]

set -e

MANIFEST_FILE="./public/manifest.json"
BUILD_DIR="build"
DEV_OUTPUT_DIR="${BUILD_DIR}/develop"
PROD_OUTPUT_DIR="${BUILD_DIR}/production"

VERSION_TYPE=$1

# 1. VERSION 업데이트
update_version() {
 if [[ -n "$VERSION_TYPE" ]]; then
    echo "Updating version with type: $VERSION_TYPE"
    CURRENT_VERSION=$(node -p "require('${MANIFEST_FILE}').version")
    UPDATED_VERSION=$(node -p "
      const semver = require('semver');
      semver.inc('${CURRENT_VERSION}', '${VERSION_TYPE}');
    ")

    if [[ -z "$UPDATED_VERSION" ]]; then
      echo "Error: Failed to update version. Check your 'manifest.json'."
      exit 1
    fi

    # manifest.json 업데이트
    jq ".version = \"${UPDATED_VERSION}\"" "$MANIFEST_FILE" > tmp.$$.json && mv tmp.$$.json "$MANIFEST_FILE"

    echo "Version updated: ${CURRENT_VERSION} -> ${UPDATED_VERSION}"
  else
    echo "No version type provided. Skipping version update."
  fi
}

# 2. development 빌드
build_dev() {
  echo "Starting development build..."
  rm -rf "$DEV_OUTPUT_DIR"
  mkdir -p "$DEV_OUTPUT_DIR"

  echo "Building using .env.development"
  yarn build:dev

  echo "Moving development build to $DEV_OUTPUT_DIR"
  mv dist/* "$DEV_OUTPUT_DIR/"
}

# 3. production 빌드
build_prod() {
  echo "Starting production build..."

  VERSION=$(node -p "require('${MANIFEST_FILE}').version")
  echo "Version: $VERSION"

  echo "Building using .env.production"
  yarn build:prod

  ZIP_FILE="build-${VERSION}.zip"
  echo "Creating zip file: $ZIP_FILE"
  zip -r "$ZIP_FILE" "dist/"

  echo "Moving production zip to $PROD_OUTPUT_DIR"
  mv "$ZIP_FILE" "$PROD_OUTPUT_DIR/"
}

# main #
update_version
build_dev
build_prod

echo "Build completed successfully!"
