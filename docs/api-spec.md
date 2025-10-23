# API 명세서

## 기본 정보

### Base URL
```
개발: http://localhost:3000/api/v1
스테이징: https://staging-api.testinggit.com/api/v1
프로덕션: https://api.testinggit.com/api/v1
```

### 인증
모든 보호된 엔드포인트는 JWT 토큰이 필요합니다.

```http
Authorization: Bearer {access_token}
```

### 응답 형식

#### 성공 응답
```json
{
  "success": true,
  "data": { ... },
  "message": "작업이 성공적으로 완료되었습니다"
}
```

#### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": { ... }
  }
}
```

### 상태 코드
- `200` OK - 성공
- `201` Created - 생성 성공
- `400` Bad Request - 잘못된 요청
- `401` Unauthorized - 인증 필요
- `403` Forbidden - 권한 없음
- `404` Not Found - 리소스 없음
- `500` Internal Server Error - 서버 오류

---

## 1. 인증 (Authentication)

### 1.1 회원가입

**POST** `/auth/signup`

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "password123!",
  "nickname": "홍길동",
  "agreeToTerms": true,
  "agreeToMarketing": false
}
```

#### Response (201)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123456",
      "email": "user@example.com",
      "nickname": "홍길동",
      "profileImage": null,
      "createdAt": "2025-10-23T10:00:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresIn": 3600
    }
  },
  "message": "회원가입이 완료되었습니다"
}
```

#### Errors
- `400` - 이메일이 이미 존재합니다
- `400` - 비밀번호가 요구사항을 충족하지 않습니다

---

### 1.2 로그인

**POST** `/auth/login`

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "password123!"
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123456",
      "email": "user@example.com",
      "nickname": "홍길동",
      "profileImage": "https://cdn.example.com/profile.jpg"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresIn": 3600
    }
  }
}
```

#### Errors
- `401` - 이메일 또는 비밀번호가 올바르지 않습니다

---

### 1.3 소셜 로그인

**POST** `/auth/social/:provider`

**Provider**: `google` | `apple`

#### Request Body
```json
{
  "token": "social_provider_token",
  "deviceInfo": {
    "platform": "ios",
    "version": "14.0"
  }
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "tokens": { ... },
    "isNewUser": false
  }
}
```

---

### 1.4 토큰 갱신

**POST** `/auth/refresh`

#### Request Body
```json
{
  "refreshToken": "eyJhbGc..."
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "expiresIn": 3600
  }
}
```

---

### 1.5 로그아웃

**POST** `/auth/logout`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200)
```json
{
  "success": true,
  "message": "로그아웃되었습니다"
}
```

---

## 2. 사용자 (Users)

### 2.1 내 프로필 조회

**GET** `/users/me`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "usr_123456",
    "email": "user@example.com",
    "nickname": "홍길동",
    "profileImage": "https://cdn.example.com/profile.jpg",
    "bio": "안녕하세요!",
    "website": "https://example.com",
    "stats": {
      "posts": 15,
      "followers": 120,
      "following": 85
    },
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-10-23T10:00:00Z"
  }
}
```

---

### 2.2 프로필 수정

**PATCH** `/users/me`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Request Body
```json
{
  "nickname": "새닉네임",
  "bio": "새로운 자기소개",
  "website": "https://newsite.com"
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "usr_123456",
    "nickname": "새닉네임",
    "bio": "새로운 자기소개",
    "website": "https://newsite.com",
    "updatedAt": "2025-10-23T10:30:00Z"
  },
  "message": "프로필이 수정되었습니다"
}
```

---

### 2.3 프로필 이미지 업로드

**POST** `/users/me/profile-image`

#### Headers
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

#### Request Body (Form Data)
```
image: [File]
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "profileImage": "https://cdn.example.com/profile_new.jpg",
    "updatedAt": "2025-10-23T10:30:00Z"
  },
  "message": "프로필 이미지가 업로드되었습니다"
}
```

#### Errors
- `400` - 파일 크기가 너무 큽니다 (최대 5MB)
- `400` - 지원하지 않는 파일 형식입니다

---

### 2.4 다른 사용자 조회

**GET** `/users/:userId`

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "usr_789012",
    "nickname": "김철수",
    "profileImage": "https://cdn.example.com/profile2.jpg",
    "bio": "개발자입니다",
    "stats": {
      "posts": 50,
      "followers": 500,
      "following": 120
    },
    "isFollowing": false
  }
}
```

---

## 3. 게시글 (Posts)

### 3.1 게시글 목록 조회

**GET** `/posts`

#### Query Parameters
- `page` (number, default: 1) - 페이지 번호
- `limit` (number, default: 20) - 페이지당 항목 수
- `sort` (string) - `latest` | `popular`

#### Example
```
GET /posts?page=1&limit=20&sort=latest
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123",
        "title": "게시글 제목",
        "content": "게시글 내용...",
        "images": [
          "https://cdn.example.com/image1.jpg"
        ],
        "author": {
          "id": "usr_123",
          "nickname": "홍길동",
          "profileImage": "https://cdn.example.com/profile.jpg"
        },
        "stats": {
          "likes": 24,
          "comments": 8
        },
        "isLiked": false,
        "createdAt": "2025-10-23T08:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 200,
      "hasNext": true
    }
  }
}
```

---

### 3.2 게시글 상세 조회

**GET** `/posts/:postId`

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "post_123",
    "title": "게시글 제목",
    "content": "게시글 상세 내용...",
    "images": [
      "https://cdn.example.com/image1.jpg",
      "https://cdn.example.com/image2.jpg"
    ],
    "tags": ["React", "개발"],
    "author": {
      "id": "usr_123",
      "nickname": "홍길동",
      "profileImage": "https://cdn.example.com/profile.jpg"
    },
    "stats": {
      "likes": 24,
      "comments": 8,
      "views": 150
    },
    "isLiked": false,
    "createdAt": "2025-10-23T08:00:00Z",
    "updatedAt": "2025-10-23T08:00:00Z"
  }
}
```

---

### 3.3 게시글 작성

**POST** `/posts`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Request Body
```json
{
  "title": "새 게시글 제목",
  "content": "게시글 내용입니다...",
  "images": [
    "https://cdn.example.com/uploaded_image.jpg"
  ],
  "tags": ["React", "개발"]
}
```

#### Response (201)
```json
{
  "success": true,
  "data": {
    "id": "post_456",
    "title": "새 게시글 제목",
    "content": "게시글 내용입니다...",
    "createdAt": "2025-10-23T11:00:00Z"
  },
  "message": "게시글이 작성되었습니다"
}
```

---

### 3.4 게시글 수정

**PATCH** `/posts/:postId`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Request Body
```json
{
  "title": "수정된 제목",
  "content": "수정된 내용"
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "post_456",
    "updatedAt": "2025-10-23T11:30:00Z"
  },
  "message": "게시글이 수정되었습니다"
}
```

---

### 3.5 게시글 삭제

**DELETE** `/posts/:postId`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200)
```json
{
  "success": true,
  "message": "게시글이 삭제되었습니다"
}
```

---

### 3.6 게시글 좋아요

**POST** `/posts/:postId/like`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "isLiked": true,
    "likesCount": 25
  }
}
```

---

### 3.7 게시글 좋아요 취소

**DELETE** `/posts/:postId/like`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "isLiked": false,
    "likesCount": 24
  }
}
```

---

## 4. 댓글 (Comments)

### 4.1 댓글 목록 조회

**GET** `/posts/:postId/comments`

#### Query Parameters
- `page` (number, default: 1)
- `limit` (number, default: 20)

#### Response (200)
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "cmt_123",
        "content": "좋은 글 감사합니다!",
        "author": {
          "id": "usr_789",
          "nickname": "김철수",
          "profileImage": "https://cdn.example.com/profile2.jpg"
        },
        "likes": 5,
        "isLiked": false,
        "createdAt": "2025-10-23T09:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 8
    }
  }
}
```

---

### 4.2 댓글 작성

**POST** `/posts/:postId/comments`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Request Body
```json
{
  "content": "좋은 글 감사합니다!"
}
```

#### Response (201)
```json
{
  "success": true,
  "data": {
    "id": "cmt_456",
    "content": "좋은 글 감사합니다!",
    "createdAt": "2025-10-23T11:00:00Z"
  },
  "message": "댓글이 작성되었습니다"
}
```

---

## 5. 검색 (Search)

### 5.1 통합 검색

**GET** `/search`

#### Query Parameters
- `q` (string, required) - 검색어
- `type` (string) - `all` | `posts` | `users`
- `page` (number, default: 1)
- `limit` (number, default: 20)

#### Example
```
GET /search?q=React&type=posts&page=1&limit=20
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "query": "React",
    "type": "posts",
    "results": [
      {
        "id": "post_123",
        "title": "React 시작하기",
        "excerpt": "React를 사용하여...",
        "author": {
          "nickname": "홍길동"
        },
        "createdAt": "2025-10-23T08:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100
    }
  }
}
```

---

## 6. 알림 (Notifications)

### 6.1 알림 목록 조회

**GET** `/notifications`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Query Parameters
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `unreadOnly` (boolean, default: false)

#### Response (200)
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "ntf_123",
        "type": "follow",
        "title": "새 팔로워",
        "message": "홍길동님이 회원님을 팔로우했습니다",
        "actor": {
          "id": "usr_123",
          "nickname": "홍길동",
          "profileImage": "https://cdn.example.com/profile.jpg"
        },
        "read": false,
        "actionUrl": "/users/usr_123",
        "createdAt": "2025-10-23T10:00:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": {
      "currentPage": 1,
      "totalPages": 3
    }
  }
}
```

---

### 6.2 알림 읽음 처리

**PATCH** `/notifications/:notificationId/read`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200)
```json
{
  "success": true,
  "message": "알림을 읽음 처리했습니다"
}
```

---

### 6.3 모든 알림 읽음 처리

**POST** `/notifications/read-all`

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200)
```json
{
  "success": true,
  "message": "모든 알림을 읽음 처리했습니다"
}
```

---

## 7. 파일 업로드 (Upload)

### 7.1 이미지 업로드

**POST** `/upload/image`

#### Headers
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

#### Request Body (Form Data)
```
image: [File]
folder: "posts" | "profiles"
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.example.com/uploads/abc123.jpg",
    "filename": "abc123.jpg",
    "size": 245678,
    "mimeType": "image/jpeg"
  }
}
```

#### Errors
- `400` - 파일 크기가 너무 큽니다 (최대 5MB)
- `400` - 지원하지 않는 파일 형식입니다 (jpg, png, webp만 가능)

---

## 8. 에러 코드

### 인증 에러
- `AUTH_001` - 토큰이 유효하지 않습니다
- `AUTH_002` - 토큰이 만료되었습니다
- `AUTH_003` - 인증이 필요합니다
- `AUTH_004` - 권한이 없습니다

### 사용자 에러
- `USER_001` - 사용자를 찾을 수 없습니다
- `USER_002` - 이메일이 이미 존재합니다
- `USER_003` - 닉네임이 이미 존재합니다

### 게시글 에러
- `POST_001` - 게시글을 찾을 수 없습니다
- `POST_002` - 게시글 작성 권한이 없습니다

### 파일 에러
- `FILE_001` - 파일이 너무 큽니다
- `FILE_002` - 지원하지 않는 파일 형식입니다

### 서버 에러
- `SERVER_001` - 내부 서버 오류가 발생했습니다

---

## 9. Rate Limiting

### 제한
- 인증 없음: 100 요청/시간
- 인증됨: 1000 요청/시간

### 헤더
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1634567890
```

---

**문서 버전**: 1.0
**최종 수정일**: 2025-10-23
**작성자**: 프로젝트 팀
