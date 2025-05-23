# 🧩 Yeongjopt Chat UI — MVP 개발 플랜

## 📦 초기 프로젝트 세팅

### ✅ Task 1. 프로젝트 초기화 및 기본 구조 생성

* `create-react-app` 또는 `vite`로 프로젝트 생성
* `tailwindcss` 설치 및 구성 (`tailwind.config.js`, `postcss.config.js`)
* `src/`, `public/`, `components/`, `pages/`, `api/`, `context/` 폴더 생성

---

### ✅ Task 2. Tailwind 작동 확인용 기본 UI 출력

* App 컴포넌트에 Tailwind 클래스 적용
* `h1`, 버튼 등 스타일 렌더링 확인

---

## 🌐 API 연동 준비

### ✅ Task 3. `.env` 파일에 API 주소 추가

```env
REACT_APP_API_BASE_URL=http://localhost:8000/v1
```

* `.env` 값은 `config.js`로 노출

---

### ✅ Task 4. API 모듈 (`src/api/chat.js`) 작성

* `sendChat(messages)` 함수 구현 (POST `/chat/completions`)
* dummy request와 콘솔 로그로 작동 여부 확인

---

## 🧠 상태 관리 및 채팅 UI 구성

### ✅ Task 5. 메시지 상태 useState로 관리

* `ChatInterface.jsx` 내에서 `messages`, `setMessages` 정의
* 초기 메시지 목록: `[{ role: 'user', content: 'Hello' }]`

---

### ✅ Task 6. 사용자 입력창 구현

* `textarea`와 `send` 버튼 구현
* 입력값 변경 시 상태 업데이트 (`onChange`)
* `엔터 키` 입력시 메시지 전송

---

### ✅ Task 7. 메시지 UI 리스트 구현

* `ul` 태그로 `messages` 배열 렌더링
* `user` / `assistant`에 따라 좌우 정렬

---

### ✅ Task 8. API 요청 트리거 구현

* 버튼 클릭 시 `sendChat()` 호출
* 응답 메시지를 `assistant` 역할로 메시지 리스트에 추가

---

## 🔄 사용자 경험 개선

### ✅ Task 9. 로딩 인디케이터 추가

* API 응답 대기 중 `로딩 중...` 표시
* 상태: `isLoading`, `setIsLoading` 추가

---

### ✅ Task 10. 에러 처리 추가

* `try/catch`로 예외 잡고 `alert` 또는 `에러 메시지 UI` 표시

---

## 🧪 테스트 및 배포 준비

### ✅ Task 11. 기본 E2E 테스트 (optional)

* `messages.length > 1` 이 되면 pass
* 버튼 클릭 → 응답 출력 확인

---

### ✅ Task 12. Fly.io 배포 설정

* `fly launch`
* `fly.toml`에 환경변수 및 포트 설정
* `npm run build && fly deploy`

---

필요시 다음 단계로는 다음을 고려할 수 있습니다:

* 사용자 닉네임 입력 기능
* 대화 세션 저장 (localStorage or backend)
* Context API로 전역 상태 관리
* 채팅방 UI 개선 및 반응형 디자인

---