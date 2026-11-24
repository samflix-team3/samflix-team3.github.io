/* =========================================================
   SAMFLIX 데이터 파일
   ---------------------------------------------------------
   👉 팀원들은 이 파일만 고치면 사이트 내용이 바뀝니다!
   지금 들어있는 내용은 전부 "예시"예요. 실제 이름·작품으로 바꿔주세요.

   [작품 항목 설명]
   title    : 작품 제목
   type     : "movie"(영화) 또는 "drama"(드라마)
   member   : 추천한 팀원의 id (아래 TEAM의 id와 똑같이)
   year     : 개봉/방영 연도
   genre    : 장르
   rating   : 내 별점 (0.0 ~ 5.0)
   poster   : 포스터 이미지 경로 (예: "images/posters/parasite.jpg")
              비워두면("") 아래 theme 색감으로 임시 포스터가 그려져요.
   theme    : 임시 포스터 분위기
              galaxy / sunset / rain / forest / city / snow / ocean / neon / dawn / autumn
   oneLine  : 한 줄 소개
   review   : 추천 이유 (2~4문장 정도)
   ========================================================= */

const TEAM = [
  { id: "minseok", name: "민석", role: "웹 개발 총괄", intro: "잔잔하지만 오래 남는 이야기를 좋아해요." },
  { id: "sunpyo", name: "순표", role: "디자인", intro: "색감이 예쁜 영화라면 무조건 봅니다." },
  { id: "jinwoo", name: "진우", role: "기획", intro: "비 오는 날 보기 좋은 작품 수집가." },
  { id: "youngrok", name: "영록", role: "구조 설계", intro: "반전 있는 스릴러를 찾아다녀요." },
  { id: "jiwon", name: "지원", role: "디자인", intro: "정주행 각 나오는 드라마 담당." }
];

const PICKS = [
  {
    title: "그날의 우주", type: "movie", member: "minseok",
    year: 2024, genre: "로맨스 · SF", rating: 4.6,
    poster: "", theme: "galaxy",
    oneLine: "별이 쏟아지던 밤, 두 사람이 나눈 마지막 약속.",
    review: "예시 문구입니다. 이 작품을 추천하는 이유를 2~4문장 정도로 적어주세요. 어떤 장면이 기억에 남았는지, 누구에게 추천하고 싶은지 쓰면 좋아요."
  },
  {
    title: "작은 숲의 계절", type: "drama", member: "minseok",
    year: 2023, genre: "힐링 · 일상", rating: 4.4,
    poster: "", theme: "forest",
    oneLine: "도시를 떠나 숲속 책방을 연 사람들의 사계절.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  },
  {
    title: "수평선 너머", type: "movie", member: "sunpyo",
    year: 2025, genre: "드라마 · 로드무비", rating: 4.9,
    poster: "", theme: "sunset",
    oneLine: "바다를 따라 달리는 마지막 기차, 끝나지 않을 여행.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  },
  {
    title: "네온 블루스", type: "movie", member: "sunpyo",
    year: 2022, genre: "음악 · 청춘", rating: 4.5,
    poster: "", theme: "neon",
    oneLine: "새벽 세 시의 도시, 무대 위에서만 솔직해지는 밴드.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  },
  {
    title: "비가 그친 뒤", type: "drama", member: "jinwoo",
    year: 2024, genre: "멜로 · 미스터리", rating: 4.7,
    poster: "", theme: "rain",
    oneLine: "비 오는 밤마다 같은 정류장에 나타나는 그 사람.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  },
  {
    title: "첫눈의 기억", type: "movie", member: "jinwoo",
    year: 2021, genre: "로맨스", rating: 4.3,
    poster: "", theme: "snow",
    oneLine: "십 년 만에 내린 첫눈, 다시 열린 편지 한 장.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  },
  {
    title: "회색 도시", type: "movie", member: "youngrok",
    year: 2023, genre: "스릴러 · 범죄", rating: 4.8,
    poster: "", theme: "city",
    oneLine: "모두가 거짓말을 하는 도시에서 단 하나의 진실.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  },
  {
    title: "깊은 바다", type: "drama", member: "youngrok",
    year: 2025, genre: "미스터리 · SF", rating: 4.6,
    poster: "", theme: "ocean",
    oneLine: "심해 기지에서 사라진 한 명의 대원.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  },
  {
    title: "새벽 다섯 시", type: "drama", member: "jiwon",
    year: 2024, genre: "청춘 · 성장", rating: 4.7,
    poster: "", theme: "dawn",
    oneLine: "매일 새벽 다섯 시, 편의점에서 시작되는 이야기.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  },
  {
    title: "가을이 오면", type: "drama", member: "jiwon",
    year: 2022, genre: "가족 · 휴먼", rating: 4.5,
    poster: "", theme: "autumn",
    oneLine: "흩어졌던 가족이 다시 모이는 단 한 번의 가을.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요."
  }
];
