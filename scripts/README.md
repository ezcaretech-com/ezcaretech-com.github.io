# ezARIA config script

## Server Config 암호화 / 복호화 파일
- NAS: http://10.1.30.60/apps/files/files/21031?dir=/MobileSolution/Solutions/ezARIA/ezaria_server_config_encrypt_key
- encrypt_config.py, config_key.json, decrypt_config.py 를 받아서 scripts 폴더에 저장해주세요
- 키를 새로 생성하면 기존에 운영되던 앱에 영향이 갈수 있으므로 반드시 주의바랍니다.

## ezARIA Server Config 업데이트 방법
1. ./scripts/decrypt_config.sh [업데이트할 환경 (development, staging, production)] 를 실행하여 config.json 을 추출
2. config.json 을 수정후 ./scripts/build_config.sh [업데이트할 환경 (development, staging, production)] 를 실행