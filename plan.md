# 프론트엔드 개발자 채용 과제 – 수행 계획서

## 1. 기술 스택 확정

본 과제는 **3일(72시간)**이라는 제한된 시간 내에 안정적으로 완성하고, 평가 기준에 최적화된 결과물을 만드는 것이 목표이므로 아래 기술 스택으로 확정한다.

### Framework / Language

- **React 18**
- **JavaScript (ES6+)**
  - TypeScript는 장점이 있으나, 타입 설계 및 수정 비용 대비 시간 리스크가 있어 제외

### Build Tool

- **Vite**
  - 빠른 개발 서버
  - GitHub Pages 배포 설정 간단

### Styling

- **Tailwind CSS v3.4.19**
  - 빠른 UI 구성
  - 반응형 및 상태별 스타일링 용이
  - PostCSS & Autoprefixer 함께 사용

### Code Formatting

- **Prettier v3.7.4**
  - 일관된 코드 스타일 유지
  - prettier-plugin-tailwindcss로 클래스 자동 정렬

### State / Data

- **React useState + useEffect**
- **localStorage 직접 관리**
  - 외부 상태 관리 라이브러리 사용하지 않음 (과제 범위에 불필요)

### Drag & Drop (Priority 2)

- **@hello-pangea/dnd**
  - react-beautiful-dnd 유지보수 대체 라이브러리
  - 안정성 및 문서 충분

### Deployment

- **GitHub Pages**

### AI 도구 활용

- ChatGPT (구조 설계, 코드 초안, 리팩토링 보조)

---

## 2. 프로젝트 폴더 구조

```
project-root/
├─ public/
│  └─ favicon.svg
│
├─ src/
│  ├─ assets/
│  │  └─ icons/
│  │
│  ├─ components/
│  │  ├─ Board/
│  │  │  ├─ Board.jsx
│  │  │  └─ BoardColumn.jsx
│  │  │
│  │  ├─ Task/
│  │  │  ├─ TaskCard.jsx
│  │  │  └─ TaskModal.jsx
│  │  │
│  │  ├─ Search/
│  │  │  └─ SearchBar.jsx
│  │  │
│  │  └─ common/
│  │     ├─ Button.jsx
│  │     └─ Modal.jsx
│  │
│  ├─ hooks/
│  │  └─ useLocalStorage.js
│  │
│  ├─ data/
│  │  └─ initialTasks.js
│  │
│  ├─ utils/
│  │  ├─ storage.js
│  │  └─ date.js
│  │
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
│
├─ README.md
├─ vite.config.js
└─ package.json
```

### 구조 설계 의도

- **components**: UI 단위별 명확한 분리
- **hooks**: localStorage 로직 재사용
- **data**: 샘플 데이터 관리
- **utils**: 날짜 포맷, storage helper 분리
- 과제 규모에 맞게 과도한 추상화는 지양

---

## 3. 데이터 구조 정의

```js
{
  id: string,
  title: string,
  description?: string,
  status: 'todo' | 'in-progress' | 'done',
  priority: 'high' | 'medium' | 'low',
  createdAt: string,
  updatedAt: string
}
```

---

## 4. 과제 진행 타임라인 (Step 기반)

> 기준 원칙

- Step 1 = Commit 1개
- 각 Step 종료 시 즉시 커밋
- Step 단위로 진행 상황 점검

---

### Step 01. 프로젝트 초기 세팅

- Vite + React 프로젝트 생성
- 개발 서버 실행 확인
  Commit: chore: Vite 기반 React 프로젝트 초기 세팅

### Step 02. 기본 폴더 구조 구성

- components / hooks / data / utils 디렉토리 생성
- App.jsx, main.jsx 기본 정리
  Commit: chore: 프로젝트 기본 폴더 구조 구성

### Step 03. 태스크 데이터 구조 정의

- Task 데이터 필수 필드 구조 확정
- status / priority 기준 정의
  Commit: feat: 태스크 데이터 기본 구조 정의

### Step 04. 초기 샘플 태스크 데이터 추가

- initialTasks.js 생성
- 샘플 태스크 10개 이상 작성
  Commit: feat: 초기 태스크 샘플 데이터 10개 추가

### Step 05. localStorage 저장 / 불러오기 구현

- 초기 데이터 로드
- 상태 변경 시 localStorage 동기화
- 새로고침 유지 확인
  Commit: feat: localStorage 기반 태스크 데이터 저장 기능 구현

### Step 06. 기본 칸반보드 레이아웃 구현

- To Do / In Progress / Done 컬럼 렌더링
- status 기준 태스크 분류 출력
  Commit: feat: 기본 칸반보드 레이아웃 구현

### Step 07. 태스크 카드 컴포넌트 구현

- TaskCard 컴포넌트 분리
- 제목 / 우선순위 / 생성일 표시
  Commit: feat: 태스크 카드 컴포넌트 구현

### Step 08. 태스크 추가 기능 구현

- 태스크 추가 모달 또는 폼 구현
- 제목 필수 검증
- 기본 상태 todo 설정
  Commit: feat: 태스크 추가 기능 구현

### Step 09. 드래그 앤 드롭 기능 구현

- 컬럼 간 태스크 이동
- 이동 시 status 업데이트 및 저장
  Commit: feat: 태스크 드래그 앤 드롭 이동 기능 구현

### Step 10. 태스크 수정 기능 구현

- 제목 / 설명 / 우선순위 수정
- 수정 내용 localStorage 반영
  Commit: feat: 태스크 수정 기능 구현

### Step 11. 태스크 삭제 기능 구현

- 삭제 버튼 추가
- confirm 처리 후 삭제
  Commit: feat: 태스크 삭제 기능 구현

### Step 12. 태스크 검색 기능 구현

- 제목 기반 실시간 검색
- 검색어 없을 시 전체 표시
  Commit: feat: 태스크 제목 기반 검색 기능 구현

### Step 13. UI 스타일 개선

- 우선순위 색상 구분
- 간격 / 정렬 / 가독성 개선
  Commit: style: 태스크 카드 UI 및 가독성 개선

### Step 14. 코드 리팩토링

- 컴포넌트 구조 정리
- 중복 코드 제거
- 네이밍 정리
  Commit: refactor: 컴포넌트 구조 및 코드 정리

### Step 15. README 작성

- 프로젝트 개요
- 구현 / 미구현 기능 정리
- 기술 스택 및 AI 도구 사용 내역 작성

### Readme 필수 포함 내용

- 배포 URL (Github Pages 링크 - 배포 후 재작성)
- 프로젝트 실행 방법
- 개발 기간
- 사용 기술 스택
- 구현 기능 목록 (Prioirty별 구분)
- 미구현 기능 및 이유
- AI 도구 활용
- 간단한 프로젝트 설명

  Commit: docs: 프로젝트 README 문서 작성

### Step 16. 배포 설정 및 최종 점검

- GitHub Pages 배포 설정
- 배포 URL 정상 동작 확인
- 콘솔 에러 최종 제거
  Commit: chore: GitHub Pages 배포 설정 및 최종 점검

---

- 최소 커밋 수: 16개
- Step 08 완료 시: Priority 1 완료
- Step 12 완료 시: 과제 안정권
- Step 16 완료 시: 제출 완료

---

## 5. 구현 우선순위 원칙

1. 동작하는 기능이 최우선
2. UI는 최소한의 사용성만 확보
3. 설명할 수 없는 기술은 사용하지 않음
4. 미구현 기능은 README에 명확히 명시

---

## 6. UI 디자인 및 반응형 전략 (Design Reference)

### 디자인 기준

- 전체 UI는 Notion / Trello와 유사한 업무용 SaaS 스타일을 기준으로 설계
- 컬러는 컬럼 단위로 구분하되, 과도한 강조는 지양
- 카드 중심의 정보 구조로 가독성과 확장성을 우선

참고 레퍼런스:

- 칸반보드 기반 3컬럼 대시보드 UI
- 좌측 네비게이션 + 상단 헤더 + 메인 보드 구조

---

## 📐 공통 레이아웃 구조

- 상단 헤더(Header)
  - 페이지 제목
  - 검색 / 필터 영역
- 메인 콘텐츠(Board)
  - To Do / In Progress / Done 컬럼
  - 컬럼 내부에 카드 리스트 배치

---

## 🖥 Desktop (≥ 1280px ~ 1920px)

### 레이아웃 전략

- 3컬럼 칸반보드 가로 배치 유지
- 컬럼 간 여백 충분히 확보
- 카드 정보 전체 표시

### UI 구성

- Header: 좌측 제목 / 우측 검색 또는 버튼
- Board:
  - grid-cols-3
  - 컬럼 최소 폭 유지
- Card:
  - 제목
  - 우선순위
  - 생성일
  - (선택) 설명 일부 노출

### Tailwind 전략 예시

- `grid grid-cols-3 gap-6`
- `max-w-[1440px] mx-auto`
- 카드 padding 여유 있게 유지

---

## 💻 Tablet (≥ 768px ~ < 1280px)

### 레이아웃 전략

- 3컬럼 구조는 유지
- 정보 밀도만 조절하여 압축 표현
- 불필요한 텍스트는 숨김 처리

### UI 구성

- Header:
  - 검색창 크기 축소
- Board:
  - grid-cols-3 유지
  - 컬럼 gap 축소
- Card:
  - 설명 텍스트 숨김
  - 날짜는 아이콘 또는 작은 텍스트로 표시

### Tailwind 전략 예시

- `md:grid-cols-3`
- `gap-3`
- `hidden md:block` 활용하여 정보 선택적 노출

---

## 📱 Mobile (< 768px / 375px 기준)

### 레이아웃 전략

- 컬럼을 동시에 보여주지 않음
- 상태별 탭 UI로 컬럼 전환
- 한 번에 하나의 컬럼만 표시

### UI 구성

- Header:
  - 상단에 상태 탭 (To Do / In Progress / Done)
- Board:
  - 선택된 상태의 카드 리스트만 세로 표시
- Card:
  - 제목 + 우선순위만 노출
  - 날짜는 아이콘 또는 생략

### Tailwind 전략 예시

- `flex md:hidden` 상태 탭
- `hidden md:grid` 보드
- 상태값 기반 조건부 렌더링

---

## 📌 반응형 설계 원칙 요약

1. Desktop은 기준 화면으로 모든 정보 노출
2. Tablet은 레이아웃 유지 + 정보만 축소
3. Mobile은 레이아웃 전환 (컬럼 → 상태 탭)
4. 디자인보다 사용성과 설명 가능성을 우선

---

## 📝 README에 활용 가능한 설명 문구

반응형 UI는 Desktop에서는 3컬럼 칸반 구조를 유지하고,  
Tablet에서는 동일한 레이아웃을 유지하되 정보 밀도를 조절했습니다.  
Mobile 환경에서는 상태 탭을 통해 한 번에 하나의 컬럼만 표시하도록 설계했습니다.

---

## 7. 완료 기준 체크리스트

- [ ] Priority 1 기능 전부 구현
- [ ] localStorage 정상 동작
- [ ] GitHub Pages 배포 완료
- [ ] README 작성 완료
- [ ] 커밋 10개 이상
- [ ] Console Error 0

---

이 문서는 과제 진행 중 기준 문서로 사용하며, 실제 구현 과정에서 일부 조정될 수 있음.

## 추가 정보

### 🤖 AI 도구 활용 범위

- UI 레이아웃 및 반응형 구조 설계 시 참고 자료 조사에 활용
- 컴포넌트 구조 및 폴더 구조 설계 시 방향성 검토용으로 사용
- 코드 초안 작성 및 리팩토링 시 보조 도구로 활용
- 단, 모든 코드는 직접 작성 및 수정하였으며, 각 코드의 동작 원리를 이해하고 설명할 수 있는 수준으로 구현함
- AI 도구는 개발 생산성 향상을 위한 참고 수단으로만 사용함

---

### 🚫 미구현 기능 관리 기준

- Priority 1(필수 기능)을 최우선으로 구현
- 제한된 개발 기간(72시간) 내 완성도와 안정성을 해칠 수 있는 기능은 의도적으로 제외
- 구현 난이도 대비 효과가 낮거나, 설명 비용이 큰 기능은 우선순위에서 배제
- 미구현 기능은 README에 목록과 함께 제외 사유를 명확히 명시
- 기능의 “개수”보다 “동작 안정성”과 “설명 가능성”을 기준으로 판단

---

### ⚙️ 성능 및 범위 고려 사항

- 태스크 수는 100개 이하를 기준으로 설계
- 과도한 성능 최적화보다는 안정적인 상태 관리와 가독성 있는 코드 구조에 집중
- 브라우저 기본 성능과 localStorage 사용 범위를 고려한 구현을 목표로 함

---

## 8. Priority 2 (권장 구현) - 구현 상태 체크리스트

### 드래그 앤 드롭

- [x] 컬럼 간 태스크 이동
- [x] 드래그 중 시각적 피드백
- [x] 드롭 영역 하이라이트

> ✅ Step 09에서 @hello-pangea/dnd를 활용하여 구현 완료

### 태스크 관리 기능

- [x] 태스크 수정 (제목, 설명, 우선순위)
- [x] 태스크 삭제 (확인 다이얼로그)
- [x] 태스크 상세보기

> ✅ Step 10, 11에서 구현 완료. TaskModal에서 상세보기/수정/삭제 모두 처리

### 기본 검색

- [x] 제목 기반 실시간 검색
- [x] 검색 결과 즉시 반영
- [x] 검색어 없을 시 전체 표시

> ✅ Step 12에서 구현 완료. App.jsx에서 searchQuery 상태로 필터링

---

## 9. Priority 3 (추가 구현) - 구현 상태 체크리스트

### 고급 필터링

- [x] 우선순위별 필터 (High/Medium/Low)
- [x] 상태별 필터
- [x] 태그 시스템 및 태그별 필터
- [x] 다중 필터 조합 (AND 조건)

### 검색 고도화

- [ ] 디바운싱 적용 (300ms)
- [ ] 검색어 하이라이트
- [ ] 최근 검색어 저장 (최대 5개)

### UI/UX 개선

- [ ] 반응형 디자인 (Desktop 1920px, Tablet 768px, Mobile 375px)
- [ ] 애니메이션 효과
- [ ] 다크 모드
- [ ] 빈 상태 안내 메세지

### 추가 기능

- [ ] 태스크 통계 (전체/진행중/완료)
- [ ] 정렬 기능 (날짜/우선순위)
- [ ] 키보드 단축키

---

## 10. Priority 3 구현 진행 Step

### Step 17. 우선순위별 필터 구현

- 우선순위 필터 드롭다운/버튼 UI 추가
- 검색과 필터 조합 (AND 조건)
- Commit: feat: 우선순위별 필터 기능 구현

### Step 18. 상태별 필터 구현

- 상태 필터 UI 추가 (To Do / In Progress / Done)
- 다중 필터 조합 가능하도록 구현
- Commit: feat: 상태별 필터 기능 구현

### Step 19. 검색 디바운싱 적용

- 300ms 디바운싱으로 성능 최적화
- Commit: perf: 검색 기능 디바운싱 적용

### Step 20. 검색어 하이라이트

- 검색 결과에서 일치하는 텍스트 하이라이트 표시
- Commit: feat: 검색어 하이라이트 기능 구현

### Step 21. 최근 검색어 저장

- localStorage에 최근 검색어 최대 5개 저장
- 검색창 포커스 시 최근 검색어 표시
- Commit: feat: 최근 검색어 저장 기능 구현

### Step 22. 태스크 통계 표시

- 전체/진행중/완료 태스크 수 헤더에 표시
- Commit: feat: 태스크 통계 표시 기능 구현

### Step 23. 정렬 기능 구현

- 날짜순/우선순위순 정렬 옵션 추가
- Commit: feat: 태스크 정렬 기능 구현

### Step 24. 반응형 디자인 개선

- Mobile 375px: 상태 탭 UI로 전환
- Tablet 768px: 레이아웃 유지, 정보 밀도 조절
- Desktop 1920px: 전체 정보 노출
- Commit: style: 반응형 디자인 개선

### Step 25. 빈 상태 안내 메세지

- 컬럼에 태스크가 없을 때 안내 메세지 표시
- 검색 결과가 없을 때 안내 메세지 표시
- Commit: feat: 빈 상태 안내 메세지 추가

### Step 26. 다크 모드 구현

- 다크/라이트 모드 토글 버튼 추가
- CSS 변수 또는 Tailwind dark: 클래스 활용
- 사용자 선호 모드 localStorage 저장
- Commit: feat: 다크 모드 구현

### Step 27. 애니메이션 효과

- 카드 추가/삭제 시 애니메이션
- 모달 열기/닫기 애니메이션
- Commit: style: UI 애니메이션 효과 추가

### Step 28. 키보드 단축키

- Escape: 모달 닫기
- Ctrl+N: 새 태스크 추가
- Commit: feat: 키보드 단축키 지원

---

## 11. 추후 개선 가능 사항

### 상태 필터 UX 개선 (선택적)

현재 상태 필터는 드롭다운으로 선택 시 해당 상태의 태스크만 표시하고, 다른 컬럼은 빈 상태로 유지됨.

**대안 UX 제안:**

- 상태 필터 선택 시 해당 컬럼만 화면에서 확대되고, 나머지 컬럼은 최소화
- CSS transition으로 width 변경 애니메이션 적용

**장점:**

- 선택된 상태에 시각적 포커스 집중
- 화면 공간 효율적 활용
- 인터랙티브한 사용자 경험

**단점:**

- 칸반 보드의 "전체 흐름 파악" 기능 약화
- 드래그 앤 드롭 시 최소화된 컬럼으로 이동이 어색할 수 있음
- 추가 애니메이션 처리 필요

**구현 난이도:** 중간

**결론:** 현재 방식이 칸반 보드 UX로 적절하나, 대시보드 뷰나 모바일 뷰에서는 고려해볼 만함
