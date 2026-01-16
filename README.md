# 칸반 태스크 매니저

React 기반의 칸반 보드 형태 태스크 관리 애플리케이션입니다.

## 배포 URL

> 배포 후 작성 예정

## 프로젝트 실행 방법

```bash
npm install

npm run dev

npm run build
```

## 개발 기간

2025.01.16 ~ 2025.01.18 (3일)

## 사용 기술 스택

| 분류            | 기술              |
| --------------- | ----------------- |
| Framework       | React 18          |
| Language        | JavaScript (ES6+) |
| Build Tool      | Vite              |
| Styling         | Tailwind CSS v3.4 |
| Drag & Drop     | @hello-pangea/dnd |
| Code Formatting | Prettier          |
| Deployment      | GitHub Pages      |

## 프로젝트 구조

```
src/
├── components/
│   ├── Board.jsx        # 칸반 보드 메인
│   ├── Column.jsx       # 개별 컬럼
│   ├── TaskCard.jsx     # 태스크 카드
│   └── Task/
│       └── TaskModal.jsx # 태스크 추가/수정 모달
├── hooks/
│   └── useTasks.js      # 태스크 상태 관리 훅
├── data/
│   ├── taskStructure.js # 태스크 데이터 구조 정의
│   └── initialTasks.js  # 초기 샘플 데이터
├── utils/
│   └── storage.js       # localStorage 유틸
├── App.jsx
└── main.jsx
```

## 구현 기능 목록

### Priority 1 (필수 기능)

- [x] 칸반 보드 레이아웃 (To Do / In Progress / Done)
- [x] 태스크 추가 (제목 필수, 설명/우선순위 선택)
- [x] 태스크 수정 (제목/설명/우선순위)
- [x] 태스크 삭제 (확인 다이얼로그)
- [x] 드래그 앤 드롭으로 태스크 상태 변경
- [x] localStorage 기반 데이터 영속성
- [x] 새로고침 시 데이터 유지

### Priority 2 (추가 기능)

- [x] 태스크 제목 기반 실시간 검색
- [ ] 우선순위/상태별 필터링
- [ ] 태스크 정렬 (생성일, 우선순위)

### Priority 3 (선택 기능)

- [ ] 마감일(Due Date) 설정 및 표시
- [ ] 태그 추가/삭제 기능
- [ ] 다크 모드

## 미구현 기능 및 사유

| 기능             | 미구현 사유                                          |
| ---------------- | ---------------------------------------------------- |
| 태그 편집        | 태그 추가/삭제 UI 및 상태 관리 복잡도 대비 시간 부족 |
| 마감일(Due Date) | DatePicker 컴포넌트 구현 및 날짜 유효성 검증 비용    |
| 태스크 정렬      | 핵심 기능 우선 구현 후 시간 부족                     |
| 우선순위 필터링  | 검색 기능으로 기본 필터링 대체                       |

## AI 도구 활용

### 사용 도구

- Claude (Anthropic)

### 활용 방법

- **프로젝트 구조 설계**: 폴더 구조 및 컴포넌트 분리 방향 검토
- **코드 작성 보조**: 반복적인 코드 패턴 및 보일러플레이트 작성 시 활용
- **코드 리뷰 보조**: 작성한 코드의 개선점 피드백
- **문제 해결 참고**: 에러 발생 시 원인 파악 및 해결 방안 탐색

모든 코드는 직접 작성하였으며, AI는 개발 생산성 향상을 위한 참고 도구로만 활용하였습니다. 각 코드의 동작 원리를 이해하고 설명할 수 있는 수준으로 구현하였습니다.
