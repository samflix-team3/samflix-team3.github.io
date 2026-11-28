/* =========================================================
   SAMFLIX 데이터 파일
   ---------------------------------------------------------
   👉 팀원들은 이 파일만 고치면 사이트 내용이 바뀝니다!
   지금 들어있는 내용은 전부 "예시"예요. 실제 이름·작품으로 바꿔주세용.

   [작품 항목 설명]
   title    : 작품 제목
   type     : "movie"(영화) 또는 "drama"(드라마)
   member   : 추천한 팀원의 id (아래 TEAM의 id와 똑같이)
   year     : 개봉/방영 연도
   genre    : 장르
   rating   : 내 별점 (0.0 ~ 5.0)
   poster   : 포스터 이미지 경로 (예: "images/posters/parasite.jpg or jpeg")
              비워두면("") 아래 theme 색감으로 임시 포스터가 그려져요.
   theme    : 임시 포스터 분위기
              galaxy / sunset / rain / forest / city / snow / ocean / neon / dawn / autumn
   oneLine  : 한 줄 소개
   review   : 작품 소개 (2~4문장 정도)
   likes    : 마음에 들었던 점 (짧게 여러 개)
              예) likes: ["마지막 장면의 색감", "OST가 계속 생각남"]
   comments : 팀원 코멘트 (다른 팀원이 한두 줄씩 남기는 곳)
              예) comments: [
                    { member: "jinwoo", text: "저도 봤는데 진짜 좋았어요!" },
                    { member: "jiwon",  text: "주말에 꼭 볼게요" }
                  ]
              member 에는 코멘트를 쓴 사람의 id를 적어요.
   ========================================================= */

const TEAM = [
  { id: "minseok", name: "민석", role: "웹 개발 총괄", intro: "세련된 연출을 좋아하고, 인간적인 서사에 매력을 느낍니다." },
  { id: "sunpyo", name: "순표", role: "디자인", intro: "색감이 예쁜 영화라면 무조건 봅니다." },
  { id: "jinwoo", name: "진우", role: "기획", intro: "영화가 끝난 뒤에도 영화에서 헤어나오지 못하는 여운이 긴 영화를 선호해요. 또한 판타지 장르를 좋아합니다" },
  { id: "youngrok", name: "영록", role: "구조 설계", intro: "반전 있는 스릴러를 찾아다녀요." },
  { id: "jiwon", name: "지원", role: "디자인", intro: "정주행 각 나오는 드라마 담당." }
];

const PICKS = [
  {
    title: "007 No Time to Die", type: "movie", member: "minseok",
    year: 2021, genre: "액션, 스릴러", rating: 4.8,
    poster: "images/posters/007notimetodie.jpeg",
    oneLine: "가장 인간적이었던 제임스 본드, 그의 마지막 임무.",
    review: "화려한 액션과 세련된 미장센, 그리고 그 이면에 자리한 사랑과 희생. 다니엘 크레이그가 15년간 완성해 온 제임스 본드라는 인물의 가장 인간적이고도 아름다운 피날레. 한 시대의 끝을 이토록 낭만적으로 그려낼 수 있을까.",
    likes: ["한스 짐머의 웅장하고도 서정적인 음악", "다니엘 크레이그의 007 은퇴작"],
    comments: [
      { member: "sunpyo", text: "저도 봤는데 진짜 좋았어요!" },
      { member: "jinwoo", text: "이번 주말에 꼭 볼게요 👀" }
    ]
  },
  {
    title: "Succession Season 2", type: "drama", member: "minseok",
    year: 2019, genre: "드라마, 블랙 코미디", rating: 4.7,
    poster: "images/posters/succession.jpeg", theme: "forest",
    oneLine: "모든 것을 가진 자들의, 모든 것을 차지하기 위한 경쟁",
    review: "화려한 부와 권력, 그 이면에 자리한 끝없는 욕망과 불신. 가족이라는 이름 아래 벌어지는 치밀한 권력 다툼과 인간의 본성을 날카롭게 그려낸 작품. 세련된 영상미와 냉소적인 대사, 클래식한 선율이 어우러져 현대의 셰익스피어적 비극을 완성한다.",
    likes: ["니콜라스 브리텔의 우아하고도 비극적인 음악", "배우들의 압도적인 연기와 치밀한 심리 묘사", "올드머니 감성이 돋보이는 의상과 미장센"],
    comments: [
      { member: "jinwoo", text: "포스터부터 취향 저격이네요" },
      { member: "youngrok", text: "추천 감사합니다!" }
    ]
  },
  {
    title: "수평선 너머", type: "movie", member: "sunpyo",
    year: 2025, genre: "드라마 · 로드무비", rating: 4.9,
    poster: "", theme: "sunset",
    oneLine: "바다를 따라 달리는 마지막 기차, 끝나지 않을 여행.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요.",
    likes: ["예시: 마음에 들었던 장면이나 대사", "예시: 음악·연출·배우 연기 등"],
    comments: [
      { member: "youngrok", text: "저도 봤는데 진짜 좋았어요!" },
      { member: "jiwon", text: "이번 주말에 꼭 볼게요 👀" }
    ]
  },
  {
    title: "네온 블루스", type: "movie", member: "sunpyo",
    year: 2022, genre: "음악 · 청춘", rating: 4.5,
    poster: "", theme: "neon",
    oneLine: "새벽 세 시의 도시, 무대 위에서만 솔직해지는 밴드.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요.",
    likes: ["예시: 마음에 들었던 장면이나 대사", "예시: 음악·연출·배우 연기 등"],
    comments: [
      { member: "jiwon", text: "포스터부터 취향 저격이네요" },
      { member: "minseok", text: "추천 감사합니다!" }
    ]
  },
{
  title: "그린 북",
  type: "movie",
  member: "jinwoo",
  year: 2018,
  genre: "휴먼 · 코미디 · 실화",
  rating: 5.0,
  poster: "images/posters/greenbook.jpg",
  theme: "autumn",

  oneLine: "편견을 넘어 서로를 이해하게 된 두 남자의 특별한 여행.",

  review: "1962년 미국, 흑인 피아니스트 돈 셜리와 그의 운전기사 토니가 미국 남부로 공연 여행을 떠나는 이야기입니다. 서로 다른 환경에서 살아온 두 사람이 여행을 통해 점차 서로를 이해하는 과정이 인상적인 작품입니다. 인종차별이라는 무거운 소재를 유쾌하면서도 따뜻하게 풀어냈다는 점에서 추천하고 싶습니다.",

  likes: [
    "서로 다른 두 인물의 관계 변화",
    "인종차별과 사회적 편견에 대한 메시지",
    "유머와 감동이 조화를 이루는 연출",
    "두 주연 배우의 뛰어난 연기와 호흡"
  ],

  comments: []
},
{
  title: "체르노빌",
  type: "drama",
  member: "jinwoo",
  year: 2019,
  genre: "역사 · 재난 · 스릴러",
  rating: 5.0,
  poster: "images/posters/chernobyl.jpg",
  theme: "city",

  oneLine: "거짓의 대가는 무엇인가, 재앙 속에서 진실을 마주한 사람들.",

  review: "1986년 소련에서 발생한 체르노빌 원자력 발전소 사고를 바탕으로 제작된 5부작 드라마입니다. 단순히 재난의 참혹함을 보여주는 것을 넘어, 진실을 은폐하려는 권력과 이를 밝히려는 사람들의 모습을 그려냅니다. 실제 사건을 바탕으로 한 긴장감과 진실에 대한 묵직한 메시지가 오래도록 여운을 남기는 작품입니다.",

  likes: [
    "실제 사건을 바탕으로 한 사실적인 연출",
    "보이지 않는 방사능의 공포를 표현한 방식",
    "진실과 거짓에 대한 철학적 메시지",
    "5부작이라는 짧은 분량과 높은 완성도"
  ],

  comments: []
},
  {
    title: "회색 도시", type: "movie", member: "youngrok",
    year: 2023, genre: "스릴러 · 범죄", rating: 4.8,
    poster: "", theme: "city",
    oneLine: "모두가 거짓말을 하는 도시에서 단 하나의 진실.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요.",
    likes: ["예시: 마음에 들었던 장면이나 대사", "예시: 음악·연출·배우 연기 등"],
    comments: [
      { member: "jinwoo", text: "저도 봤는데 진짜 좋았어요!" },
      { member: "jiwon", text: "이번 주말에 꼭 볼게요 👀" }
    ]
  },
  {
    title: "깊은 바다", type: "drama", member: "youngrok",
    year: 2025, genre: "미스터리 · SF", rating: 4.6,
    poster: "", theme: "ocean",
    oneLine: "심해 기지에서 사라진 한 명의 대원.",
    review: "예시 문구입니다. 실제 작품 정보로 바꿔주세요.",
    likes: ["예시: 마음에 들었던 장면이나 대사", "예시: 음악·연출·배우 연기 등"],
    comments: [
      { member: "jiwon", text: "포스터부터 취향 저격이네요" },
      { member: "minseok", text: "추천 감사합니다!" }
    ]
  },
  {
    title: "모두가 자신의 무가치함과 싸우고 있다", type: "drama", member: "jiwon",
    year: 2026, genre: "휴먼 · 블랙코미디", rating: 4.8,
    poster: "images/posters/modugazashinemugachihamgwassaugoitda.jpg", theme: "dawn",
    oneLine: "잘난 친구들 사이에서 혼자만 안 풀려 시기와 질투로 괴로워하던 인간의 처절하고도 웃픈 평화 찾기",
    review: "영화계를 배경으로 20년째 감독 데뷔를 못 한 황동만과 각자의 열등감을 안고 살아가는 인물들의 내면을 날카롭게 파고드는 휴먼 드라마다. <나의 해방일지> 박해영 작가 특유의 치부를 건드리는 대사들이 처음엔 다소 불편하게 다가오지만, 결국 내 안의 못난 감정까지 똑바로 마주하게 만들며 묘한 해방감과 위로를 건넨다.",
    likes: ["박해영 작가 특유의 뼈 때리는 대사", "구교환과 고윤정의 묘한 케미와 연기력","찌질하고 불편한 감정마저 위로로 바꾸는 서사"],
    comments: [
      { member: "minseok", text: "저도 봤는데 진짜 좋았어요!" },
      { member: "sunpyo", text: "이번 주말에 꼭 볼게요 👀" }
    ]
  },
  {
    title: "나는 내일, 어제의 너를 만난다", type: "movie", member: "jiwon",
    year: 2026, genre: "로맨스 · 판타지 · 멜로", rating: 4.7,
    poster: "images/posters/nanunnailajeinululbonda.jpg", theme: "dawn",
    oneLine: "시간이 반대로 흐르는 두 사람이 교차하는 단 한 번의 계절에서 마주하는 애틋한 사랑",
    review: "20세의 타카토시와 20세의 에미가 서로 정반대의 시간 축을 살아가며 30일마다 딱 한 번씩 마주하는 판타지 로맨스다. 처음엔 풋풋하고 설레는 첫사랑 이야기처럼 흘러가지만, 서로의 시간이 어긋나 있다는 진실이 드러나는 순간 모든 장면이 새로운 의미로 다가오며 깊은 여운과 먹먹함을 남긴다.",
    likes: ["시간 역행 설정이 주는 반전과 여운",
    "교토 풍경과 어우러진 서정적인 분위기",
    "고마츠 나나의 매력과 애틋한 감정선"],
    comments: [
      { member: "sunpyo", text: "포스터부터 취향 저격이네요" },
      { member: "jinwoo", text: "추천 감사합니다!" }
    ]
  }
];
