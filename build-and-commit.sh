#!/bin/bash
# 1) chmod +x build-and-commit.sh
# 2) ./build-and-commit.sh

# 종료 시점을 설정
set -e

# 환경 변수 파일 목록
ENV_FILES=("ys" "jw")

# 출력 디렉토리 생성
for ENV_FILE in "${ENV_FILES[@]}"; do
  echo "Building for environment: $ENV_FILE"
  
  # 출력 디렉토리 삭제 후 새로 생성
  OUTPUT_DIR="outputs/$ENV_FILE"
  rm -rf "$OUTPUT_DIR"
  mkdir -p "$OUTPUT_DIR"

  # 빌드 수행
  ./node_modules/.bin/env-cmd -f promptmate-chrome-extension-envs/.env.development.$ENV_FILE yarn build:dev

  # 빌드 결과물 이동
  mv build/* outputs/$ENV_FILE/
done

# 변경 사항 커밋
git add outputs/
git commit -m "Add build outputs"


