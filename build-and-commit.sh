#!/bin/bash
# 1) chmod +x build-and-commit.sh
# 2) ./build-and-commit.sh

# 종료 시점을 설정
set -e

# 출력 디렉토리 생성
OUTPUT_DIR="outputs"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# 빌드 수행
echo "Building using .env.development"
./node_modules/.bin/env-cmd -f promptmate-chrome-extension-envs/.env.development yarn build:dev

# 빌드 결과물 이동
mv build/* "$OUTPUT_DIR/"

# 변경 사항 커밋
git add "$OUTPUT_DIR/"
git commit -m "Add build outputs"
