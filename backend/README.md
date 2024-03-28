## Python version 
- python 3.12.1

### 설정 방법
- cd backend
- poetry shell
- postry install

#### 로컬에선 (settings.py 파일이 실제로 local.py 파일을 가리키게 된다)
- cd config
- ln -sf local.py settings.py

#### 서버에선
- cd config
- ln -sf prod.py settings.py