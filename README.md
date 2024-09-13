## 실행 방법

1. docker-compose 실행
```bash
docker-compose up -d
```

2. DB 스키마 생성 스크립트 실행
```bash
npm run migration:run
```

3. DB 시드 데이터 추가
```bash
npm run migration:seed
```

DB 접속 정보
- 호스트: `localhost`
- 포트: `3306`
- 사용자 이름: `pung`
- 비밀번호: `pungPassword!23`
- 데이터베이스: `wantedlab`

## 프로젝트 디렉토리 구조
```
src/
│
├── board/                              # 게시판 모듈
│   ├── dtos/                           # DTO 모음 디렉토리
│   │   ├── interfaces/                 # 인터페이스 모음
│   │   ├── outputs/                    # 하위 모듈에서 공통적으로 사용하는 응답 객체 
│   │   │
│   └── modules/
│       ├── post/                       # 게시글 모듈
│       │   ├── dtos/                   
│       │   │   ├── inputs/             # 입력 DTO (Request Body)
│       │   │   ├── outputs/            # 출력 DTO (Response)
│       │   │   └── queries/            # 쿼리 파라미터 DTO
│       │   ├── entities/               # 엔티티 관련 파일들
│       │   ├── post.controller.ts      
│       │   ├── post.service.ts        
│       │   └── post.guard.ts           # 게시글 가드(비밀번호 검증)
│       │
│       └── comment/                    # 댓글 모듈
│           ├── dtos/                   
│           ├── entities/              
│           └── comment.controller.ts   
│
├── keyword/                            # 키워드 모듈
│   ├── dtos/                           
│   ├── entities/                       
│   └── keyword.consumer.ts             # 키워드 관련 consumer (알림 처리 등)
│
└── notification/                       # 알림 모듈
    ├── notification.module.ts          
    └── notification.service.ts         # 알림 서비스(알림 전송)
```


## API 목록
### 게시글 목록 API
**설명**: 전체 게시글 목록을 가져옵니다.

- **URL**: `localhost:3000/post`
- **Method**: `GET`
- **Query Parameters**:
    - `title` (optional): 제목
    - `userName` (optional): 작성자
    - `page` (optional): 페이지 번호 (기본값: 1)
    - `limit` (optional): 한 페이지에 표시할 게시글 수 (기본값: 10)

**예제 요청**:
```bash
curl --location 'localhost:3000/post?page=2&limit=5'
```
**응답 예제**:
- 상태 코드: 200 OK
```json
{
  "data": [
    {
      "id": 1,
      "title": "게시글 제목",
      "userName": "홍길동",
      "content": "게시글 내용",
      "createdAt": "2024-09-13T12:34:56Z",
      "updatedAt": "2024-09-13T12:34:56Z"
    }
  ],
  "meta": {
    "totalCount": 5,
    "currentPage": 1,
    "perPage": 10,
    "lastPage": 1
  }
}
```

### 게시글 작성 API
**설명**: 새로운 게시글을 생성합니다.

- **URL**: `localhost:3000/post`
- **Method**: `POST`
- **Request Body**:
    - `title` 게시글 제목
    - `content` 게시글 내용
    - `userName`  작성자
    - `password` 비밀번호

**예제 요청**:
```bash
curl --location 'localhost:3000/post' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'title=게시글 제목' \
--data-urlencode 'content=게시글 내용' \
--data-urlencode 'userName=홍길동' \
--data-urlencode 'password=1234'
```
**응답 예제**:
- 상태 코드: 201 Created
```json
{
  "id": 1,
  "title": "게시글 제목",
  "content": "게시글 내용",
  "userName": "홍길동",
  "createdAt": "2024-09-13T03:38:13.002Z",
  "updatedAt": "2024-09-13T03:38:13.002Z"
}
```

### 게시글 수정 API
**설명**: 게시글을 수정합니다.

- **URL**: `localhost:3000/post`
- **Method**: `PATCH`
- **Request Body**:
  - `id` 게시글 고유번호
  - `title` (optional) 게시글 제목
  - `content` (optional) 게시글 내용
  - `password` 비밀번호

**예제 요청**:
```bash
curl --location --request PATCH 'localhost:3000/post' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'id=1' \
--data-urlencode 'title=수정 게시글 제목' \
--data-urlencode 'content=수정 게시글 내용' \
--data-urlencode 'password=1234'
```
**응답 예제**:
- 상태 코드: 200 OK
```json
{
  "id": 1,
  "title": "수정 게시글 제목",
  "content": "수정 게시글 내용",
  "userName": "홍길동",
  "createdAt": "2024-09-13T03:38:13.002Z",
  "updatedAt": "2024-09-13T03:38:13.002Z"
}
```
- 상태 코드: 404 Not Found
- 상태 코드 설명: 게시글 ID에 해당하는 게시글이 조회되지 않을 때 발생합니다.
```json
{
    "statusCode": 404,
    "message": "post not found",
    "error": "Not Found"
}
```
- 상태 코드: 401 Unauthorized
- 상태 코드 설명: 게시글에 비밀번호가 틀렸을 경우 발생합니다.
```json
{
    "statusCode": 401,
    "message": "invalid password",
    "error": "Unauthorized"
}
```

### 게시글 삭제 API
**설명**: 게시글을 삭제합니다.

- **URL**: `localhost:3000/post`
- **Method**: `DELETE`
- **Request Body**:
    - `id` 게시글 고유번호
    - `password` 비밀번호

**예제 요청**:
```bash
curl --location --request DELETE 'localhost:3000/post' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'id=1' \
--data-urlencode 'password=1234'
```
**응답 예제**:
- 상태 코드: 200 OK
```json
```
- 상태 코드: 404 Not Found
- 상태 코드 설명: 게시글 ID에 해당하는 게시글이 조회되지 않을 때 발생합니다.
```json
{
    "statusCode": 404,
    "message": "post not found",
    "error": "Not Found"
}
```
- 상태 코드: 401 Unauthorized
- 상태 코드 설명: 게시글에 비밀번호가 틀렸을 경우 발생합니다.
```json
{
    "statusCode": 401,
    "message": "invalid password",
    "error": "Unauthorized"
}
```

### 댓글 목록 API
**설명**: 특정 게시글 댓글 목록을 가져옵니다.

- **URL**: `localhost:3000/comment`
- **Method**: `GET`
- **Query Parameters**:
    - `boardPostId` 게시글 고유번호
    - `page` (optional): 페이지 번호 (기본값: 1)
    - `limit` (optional): 한 페이지에 표시할 게시글 수 (기본값: 10)

**예제 요청**:
```bash
curl --location 'localhost:3000/comment?boardPostId=1'
```
**응답 예제**:
- 상태 코드: 200 OK
```json
{
  "data": [
    {
      "id": 1,
      "content": "임꺽정 첫번째 댓글입니다.",
      "userName": "임꺽정",
      "children": [
        {
          "id": 2,
          "content": "임꺽정 대댓글입니다.",
          "userName": "임꺽정",
          "children": [],
          "createdAt": "2024-09-13T12:52:46.987Z"
        }
      ],
      "createdAt": "2024-09-13T12:52:46.985Z"
    }
  ],
  "meta": {
    "totalCount": 1,
    "currentPage": 1,
    "perPage": 10,
    "lastPage": 1
  }
}
```


### 댓글 작성 API
**설명**: 특정 게시글에 댓글을 생성합니다.

- **URL**: `localhost:3000/post`
- **Method**: `POST`
- **Request Body**:
    - `boardPostId` 게시글 고유번호
    - `parentCommentId` (optional) 부모 댓글 고유번호
    - `content` 댓글 내용
    - `userName`  작성자

**예제 요청**:
```bash
curl --location 'localhost:3000/comment' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'userName=임꺽정' \
--data-urlencode 'content=첫번째 댓글입니다.' \
--data-urlencode 'boardPostId=1'
```
**응답 예제**:
- 상태 코드: 201 Created
```json
{
  "id": 1,
  "content": "첫번째 댓글입니다.",
  "userName": "임꺽정",
  "children": [],
  "createdAt": "2024-09-13T16:07:48.238Z"
}
```
- 상태 코드: 404 Not Found
- 상태 코드 설명: 게시글 ID(boardPostId)에 해당하는 게시글이 조회되지 않을 때 발생합니다.
```json
{
    "statusCode": 404,
    "message": "post not found",
    "error": "Not Found"
}
```

