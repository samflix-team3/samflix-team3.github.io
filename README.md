# 🎬 SAMFLIX — Team 3 Movie & Drama Archive

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
4. 포스터 이미지가 있으면 `images/posters/` 에 넣고 `poster: "images/posters/파일이름.jpeg or jpg"` 로 적어주세요.

> ⚠️ 쉼표(`,`)와 따옴표(`"`)를 지우지 않게 조심. 혹시나 모를 상황을 대비하여 ctrl + a 통해 전체복사 후 메모장 넣어두기.

## 💻 내 컴퓨터에서 보기

`https://samflix-team3.github.io/` 해당 홈페이지 들어가심 됩니당

## 🌐 GitHub Pages로 배포하기

1. GitHub 저장소 → **Settings** → **Pages**
2. **Source**: `Deploy from a branch` / **Branch**: `main`, 폴더 `/ (root)` → **Save**
3. 1~2분 뒤 `https://<깃허브아이디>.github.io/<저장소이름>/` 주소로 접속가능.

## 🤝 협업 규칙 (추천)

- 각자 `data.js` 의 **자기 작품 부분만** 수정하기 → 충돌(conflict) 방지
- 작업 전에 항상 **Pull** 먼저 받기
- 디자인 큰 변경은 브랜치를 따로 만들어 Pull Request로 올리기

## 기능

- 가운데 카드가 강조되는 캐러셀 (화살표 · 점 · 키보드 ← → · 모바일 스와이프 · 자동 넘김)
- 전체 / 영화 / 드라마 / 팀원별 필터 + 검색
- 카드 클릭 시 상세 소개 팝업
- PICKS(전체 목록), TEAM(팀원 소개), ABOUT 섹션
- 모바일 화면 대응

하다가 막히시면 연락주세요 (단톡방 이용)
