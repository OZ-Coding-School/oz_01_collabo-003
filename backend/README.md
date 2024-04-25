## Python version 
- python 3.12

### 설정 방법
- cd backend
- mkdir .config_secret
- touch secret_common.json > 공개 할 수 없는 값 관리(ex: DB값, 시크릿값 등..)

#### 로컬에선 (settings.py 파일이 실제로 local.py 파일을 가리키게 된다)
- cd config
- ln -sf local.py settings.py

#### 서버에선
- cd config
- ln -sf prod.py settings.py

#### 실행방법
- poetry shell
- poetry install
- python manage.py migrate
- poetry run python manage.py runserver