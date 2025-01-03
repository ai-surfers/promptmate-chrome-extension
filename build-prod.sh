#!/bin/bash
# 1) chmod +x build-prod.sh
# 2) ./build-prod.sh

# 종료 시점을 설정
set -e

# manifest에서 버전 추출
VERSION=$(node -p "require('./public/manifest.json').version")
echo "Version: $VERSION"

# 빌드 수행
echo "Building using .env.production"
yarn build:prod

# 빌드 결과물 이동
# mv build/* "$OUTPUT_DIR/"

# 압축 파일 생성
ZIP_FILE="build-${VERSION}.zip"
echo "Creating zip file: $ZIP_FILE"
zip -r "$ZIP_FILE" "dist/"

# 압축 파일 저장 경로 
OUTPUT_DIR="build/production"
mv "$ZIP_FILE" "$OUTPUT_DIR"