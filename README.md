# ProjectC_doc

편집 가능한 Character Codex 문서입니다. 현재는 브라우저에서 `index.html`을 직접 열어 사용할 수 있는 정적 HTML 구조를 유지합니다.

## 현재 구조

```txt
.
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ main.css
│  └─ js/
│     └─ app.js
└─ README.md
```

## 역할

- `index.html`: 화면 구조와 문서 콘텐츠를 담는 진입 파일
- `assets/css/main.css`: 전체 스타일
- `assets/js/app.js`: 탭 전환, 편집 저장, 레퍼런스 이미지, 내보내기 로직

## 다음 분리 방향

현재 기능을 안정적으로 유지한 뒤, 메뉴 콘텐츠를 아래처럼 분리하는 것을 권장합니다.

```txt
pages/
├─ overview.html
├─ relationships.html
├─ loop.html
├─ dossiers.html
└─ behaviors.html
```

다만 로컬에서 `index.html`을 바로 여는 방식에서는 HTML 조각을 동적으로 불러오는 `fetch()`가 브라우저 보안 정책에 막힐 수 있습니다. 메뉴별 파일 분리는 로컬 개발 서버를 도입하거나, 각 메뉴를 독립 HTML 페이지로 만드는 방식으로 진행하는 것이 안전합니다.

## 사용 방법

1. 저장소를 내려받습니다.
2. `index.html`을 브라우저에서 엽니다.
3. 페이지 안의 편집 가능한 텍스트를 직접 수정합니다.
4. 필요하면 `저장` 또는 `내보내기` 기능을 사용합니다.
