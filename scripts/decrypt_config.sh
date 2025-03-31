#!/bin/bash

# 매개변수 확인
if [[ "$#" -ne 1 ]]; then
    echo "Usage: $0 <environment>"
    exit 1
fi

ENVIRONMENT=$1

# 허용된 환경 목록
VALID_ENVIRONMENTS=("development" "staging" "production")

# 입력된 매개변수가 유효한지 확인
if [[ ! " ${VALID_ENVIRONMENTS[@]} " =~ " ${ENVIRONMENT} " ]]; then
    echo "Error: Invalid environment '${ENVIRONMENT}'. Choose from: development, staging, production"
    exit 1
fi

cd ./scripts
python3 decrypt_config.py "$ENVIRONMENT"
