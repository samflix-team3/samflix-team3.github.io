# 🎬 SAMFLIX — Team 3 Movie & Drama Archive

> 다섯 명의 취향이 모인, 열 편의 영화와 드라마

3조 팀원 5명이 각자 영화·드라마를 2편씩 소개하는 웹사이트입니다.
HTML / CSS / JavaScript만 사용해서 별도 설치 없이 바로 열 수 있어요.

## 📁 폴더 구조

```
samflix/
├── index.html        ← 페이지 뼈대
├── css/style.css     ← 디자인 (색상은 맨 위 :root 에서 변경)
├── js/data.js        ← ⭐ 팀원·작품 정보 (여기만 고치면 내용이 바뀜)
├── js/main.js        ← 캐러셀, 필터, 검색, 모달 동작
└── images/posters/   ← 포스터 이미지 넣는 곳
```

## ✏️ 내 작품 정보 넣는 법 (팀원용)

1. `js/data.js` 를 엽니다.
2. `TEAM` 에서 내 이름·역할·한 줄 소개를 고칩니다.
3. `PICKS` 에서 `member` 가 내 id인 작품 2개를 찾아 제목, 연도, 장르, 별점, 소개를 바꿉니다.
4. 포스터 이미지가 있으면 `images/posters/` 에 넣고 `poster: "images/posters/파일이름.jpg"` 로 적어주세요.
   비워두면 `theme` 색감으로 임시 포스터가 그려집니다.

> ⚠️ 쉼표(`,`)와 따옴표(`"`)를 지우지 않게 조심하세요! 하나만 빠져도 화면이 안 나와요.

## 💻 내 컴퓨터에서 보기

`index.html` 파일을 더블클릭하면 브라우저에서 바로 열립니다.
(VS Code를 쓴다면 **Live Server** 확장으로 열면 저장할 때마다 자동 새로고침돼요.)

## 🌐 GitHub Pages로 배포하기

1. GitHub 저장소 → **Settings** → **Pages**
2. **Source**: `Deploy from a branch` / **Branch**: `main`, 폴더 `/ (root)` → **Save**
3. 1~2분 뒤 `https://<깃허브아이디>.github.io/<저장소이름>/` 주소로 접속할 수 있어요.

## 🤝 협업 규칙 (추천)

- 각자 `data.js` 의 **자기 작품 부분만** 수정하기 → 충돌(conflict) 방지
- 작업 전에 항상 **Pull** 먼저 받기
- 커밋 메시지 예시: `민준: 그날의 우주 소개글 추가`
- 디자인 큰 변경은 브랜치를 따로 만들어 Pull Request로 올리기

## 기능

- 가운데 카드가 강조되는 캐러셀 (화살표 · 점 · 키보드 ← → · 모바일 스와이프 · 자동 넘김)
- 전체 / 영화 / 드라마 / 팀원별 필터 + 검색
- 카드 클릭 시 상세 소개 팝업
- PICKS(전체 목록), TEAM(팀원 소개), ABOUT 섹션
- 모바일 화면 대응
