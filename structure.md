아래는 **React 기반 프론트엔드 앱을 Fly.io에 배포**하고, \*\*FastChat 백엔드(OpenAI API 호환)\*\*와 연결하는 전체 구조에 대한 **폴더 트리, 파일 설명, 상태 관리, 서비스 연결 구조**를 포함한 **Full Architecture 설명서**입니다.

---

## 📦 프로젝트 전체 구조

```
yeongjopt-ui/
├── public/                      # 정적 파일 (favicon, index.html 등)
│   └── index.html
├── src/                         # 소스코드 최상위
│   ├── assets/                  # 이미지, 아이콘 등 정적 자산
│   ├── components/             # 재사용 가능한 UI 컴포넌트
│   │   └── ChatInterface.jsx    # 채팅창 UI
│   ├── pages/                  # 페이지 단위 컴포넌트
│   │   └── Home.jsx             # 루트 페이지
│   ├── hooks/                  # 커스텀 훅 (예: useChat)
│   ├── api/                    # API 호출 모듈
│   │   └── chat.js              # FastChat와 통신
│   ├── context/                # 글로벌 상태 저장소 (선택)
│   │   └── ChatContext.js       # Context API로 상태 공유
│   ├── App.jsx                 # 루트 앱 컴포넌트
│   ├── index.js                # 진입점 (ReactDOM 렌더링)
│   └── config.js               # 환경변수 및 설정 (API URL 등)
├── .env                        # 환경변수 (API 엔드포인트 등)
├── package.json                # npm 패키지 정의
├── tailwind.config.js          # Tailwind 설정
├── postcss.config.js           # Tailwind와 함께 사용하는 CSS 도구
└── fly.toml                    # Fly.io 배포 설정
```

---

## 🧠 상태 관리 (Where State Lives)

| 상태 항목        | 저장 위치 (`src/`)                                                 | 설명                |
| ------------ | -------------------------------------------------------------- | ----------------- |
| 메시지 목록       | `ChatInterface.jsx` (local state) 또는 `ChatContext.js` (global) | 사용자 입력과 응답을 저장    |
| 로딩 상태        | `ChatInterface.jsx`                                            | API 호출 중 여부       |
| API 응답       | `ChatInterface.jsx`                                            | assistant의 답변을 저장 |
| 환경변수(API 주소) | `.env` → `config.js`                                           | EC2 서버 주소         |

---

## 🔗 서비스 연결 구조 (How Services Connect)

```text
사용자 브라우저 (React 앱)
    │
    │ fetch() 요청 (POST /chat/completions)
    ▼
React → src/api/chat.js
    │
    │ fetch(API_URL + "/v1/chat/completions")
    ▼
FastChat (EC2 OpenAI API 호환 백엔드)
```

---

## 🧩 각 주요 폴더 역할 요약

| 폴더명               | 주요 내용                        |
| ----------------- | ---------------------------- |
| `public/`         | HTML 템플릿 및 favicon 등 정적 자원   |
| `src/components/` | 버튼, 채팅창 등 재사용 가능한 UI 컴포넌트    |
| `src/pages/`      | URL 라우팅 단위 페이지 구성            |
| `src/api/`        | 백엔드 API와 통신 (fetch 또는 axios) |
| `src/hooks/`      | 로직을 추상화한 커스텀 훅               |
| `src/context/`    | React Context를 통한 상태 공유      |
| `src/config.js`   | `.env`로부터 설정값 가져오는 파일        |

---

## 🧪 예시 API 모듈 (src/api/chat.js)

```js
export async function sendChat(messages) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer fake"
    },
    body: JSON.stringify({
      model: "yeongjopt-mistral-7b",
      messages
    })
  });

  return await response.json();
}
```

---

## 🧠 상태 흐름 예시 (Context 기반)

1. 사용자 입력 → `ChatContext`에 메시지 추가
2. `sendChat()` 호출 → EC2 FastChat API 요청
3. 응답 도착 → Context에 메시지 추가
4. `ChatInterface.jsx`가 상태 변화를 감지하여 UI 업데이트

---

## 🌐 환경변수 예시 (.env)

```env
REACT_APP_API_BASE_URL=http://3.34.123.123:8000/v1
```

---

## 🚀 Fly.io 배포 핵심 파일: fly.toml

```toml
app = "yeongjopt-ui"
primary_region = "nrt"

[env]
  REACT_APP_API_BASE_URL = "http://3.34.123.123:8000/v1"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```