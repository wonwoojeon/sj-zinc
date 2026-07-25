# SJ징크지붕공사 — 디자인 레퍼런스 조사 결과

작성: 디자인 리서처 | 목적: 웹사이트 제작 전 디자인 레퍼런스·트렌드 정리
**우선순위 규칙: 본 문서의 내용이 `_brief/design.md`와 충돌할 경우 design.md가 항상 우선한다. 본 문서는 보완·영감용이다.**

---

## ① X(트위터) 아티클 디자인 관찰 — 접근 실패 (솔직 보고)

- 대상: https://x.com/i/article/2078060934648483840 ("이 정도 퀄리티로"라고 사용자가 제시한 링크)
- 시도: Kimi WebBridge(사용자 실제 브라우저 제어)로 접근 시도
  - 1차: 데몬 응답은 있으나 `no extension connected` (브라우저 확장 미연결)
  - 데몬 재시작 후 2차 시도 → 동일 오류
  - 대기 후 3차(최종) 시도 → 동일 오류 → **규칙에 따라 포기**
- 결론: X 아티클의 레이아웃/타이포/모션/컬러를 직접 관찰하지 못함.
  사용자가 브라우저에서 Kimi WebBridge 확장을 연결해 주면 재시도 가능.
- 임시 대응: X 아티클 형태의 프리미엄 웹디자인 쇼케이스는 통상적으로
  (a) 풀스크린 비주얼 + 초대형 타이포, (b) 스크롤 기반 시네마틱 스토리텔링,
  (c) GSAP/WebGL 수준의 부드러운 모션을 특징으로 하므로, ③의 아이디어가 이 방향을 커버함.
  단, 이는 관찰이 아닌 추정임을 명시.

## ② Instagram @sj_exdesign 비주얼 톤 관찰 — 접근 실패 (솔직 보고)

- 대상: https://www.instagram.com/sj_exdesign
- 동일한 WebBridge 확장 미연결 문제로 2회 재시도 후 포기. 로그인 없는 공개 fetch도 인스타그램 정책상 차단됨.
- **간접 단서 (company-facts.md 기반, 관찰 아님):**
  - 핸들/브랜딩: "SJ EX DESIGN" — '디자인'을 내세우는 네이밍 → 단순 시공업체가 아닌 디자인 감각을 어필하는 포지셔닝으로 추정
  - 블로그 톤: 과장 없는 현장 사실 중심, 실제 시공 사진 중심 콘텐츠
  - 추정 피드 무드: 징크 특유의 은회색 금속 질감, 사선 외장, 시공 전/후 사진, 작업 중 현장 사진
- **이미지 팀 참고용 추정 가이드(검증 필요):**
  - 대표 사진 스타일은 "실제 현장 사진"이 핵심 자산일 가능성이 높음 → 스톡 이미지보다 실사 시공 사진 확보가 최우선
  - 로고/피드 톤 확인이 필요하면 사용자에게 인스타 스크린샷 몇 장을 요청하는 것이 가장 빠름

## ③ 2025–2026 웹디자인 트렌드 조사 (웹 검색 기반) + SJ 적용 아이디어

### 트렌드 요약 (출처: Wix 2026 트렌드, Figma 2026, Awwwards 수상작, 디자인 매체들)

1. **Exaggerated Hierarchy (과장된 위계)** — 화면을 지배하는 초대형 타이포 + 극단적으로 작은 보조 텍스트의 대비. 2026년 핵심 트렌드.
2. **Editorial / Museumcore 레이아웃** — 잡지·미술관 도록 같은 그리드, 넉넉한 여백, 세리프 액센트. 건축 스튜디오 사이트의 표준(예: Carles Faus Arquitectura, Awwwards SOTD — "Spatial Silence" 콘셉트, 사진이 구조 요소가 되는 레이아웃).
3. **Cinematic Scrolling / Scrollytelling** — GSAP ScrollTrigger 기반 스크롤 연동 서사(Apple식). Awwwards 2025 올해의 사이트(Lando Norris)도 스크롤 드리븐 시퀀스가 핵심.
4. **가로 스크롤 갤러리** — 데스크톱에서 pin + horizontal 스크롤, 포트폴리오에 특히 효과적(Awwwards 수상 다수, Lenis + parallax 조합).
5. **Before/After 인터랙션** — 리노베이션·건설 분야에서 신뢰를 즉각 증명하는 슬라이더(Awwwards "Ever" 사례).
6. **Kinetic / Fluid Typography** — 스크롤·호버에 반응하는 가변 폰트(웨이트가 스크롤에 따라 변하는 등), 라인별 마스크 리빌.
7. **저채도 어시(Earthy) 팔레트 + 따뜻한 웜톤** — "Nature distilled" 트렌드: 흙·나무·돌 질감의 뮤트 톤 + 종이/스톤 텍스처. design.md의 Zinc/Bone/Copper 팔레트와 정확히 일치.
8. **텍스처와 재료의 물성 강조 (Tactile)** — 금속·돌·나무 등 재료 질감을 클로즈업으로 보여주는 'material honesty'. 건축·장인 브랜드의 핵심 언어.
9. **커스텀 커서 & 마그네틱 버튼** — 포트폴리오급 사이트의 디테일 차별화 요소.
10. **무한 마퀴(Marquee)** — 서비스 키워드 롤링 배너는 여전히 유효한 트렌드.
11. **메가 푸터** — 초대형 타이포 + 신뢰 정보를 담은 푸터의 부활.
12. **성능 = 디자인** — 수상작 공통점: lazy loading, 최적화된 에셋, 부드러운 60fps 스크롤. 화려함보다 매끄러움이 프리미엄의 척도.

### 섹션별 구체적 디자인/모션 아이디어 (design.md 섹션 순서, 12가지)

> design.md에 이미 명시된 것은 확인 차 재진술, 새 아이디어는 ★ 표시.

1. **[프리로더]** "SJ" 모노그램이 아연판 텍스처로 채워지며 0→100% 카운터 → 커튼 업. 1.2초 이내 엄수(성능=프리미엄).
2. **[HERO]** 실제 징크지붕 사진을 어둡게 그레이드 + 초대형 헤드라인 라인별 마스크 리빌. ★마우스/스크롤에 따라 헤드라인 폰트 웨이트가 미세하게 변하는 가변 폰트 효과(Pretendard Variable 활용) — Kinetic Type 트렌드 적용.
3. **[HERO ★]** 히어로 이미지에 미세 parallax(scale 1.15→1) + 하단에 11px uppercase 라벨 "SCROLL — EST. 20 YEARS OF CRAFT" 같은 에디토리얼 캡션 배치로 잡지 무드 완성.
4. **[MARQUEE]** "ZINC ROOFING — SHINGLE — DECK — EXTERIOR — LEAK REPAIR" 무한 롤링. ★호버 시 마퀴 속도 감속 + 액센트 컬러(Burnt Copper)로 전환되는 인터랙션.
5. **[ABOUT/철학]** "겉이 아니라, 구조를 봅니다."를 Noto Serif KR 초대형 인용구로. ★인용구 글자가 스크롤 진행률에 따라 Zinc(#8E8B84)→Ink(#1A1917)로 채워지는 텍스트 컬러 스크럽 효과(스크롤텔링).
6. **[ABOUT ★]** 스탯(20년 경력 / 누수 제로 / 100% 직접 시공)은 뷰포트 진입 시 숫자 카운트업 + 얇은 Steel line 구분선이 좌→우로 그어지는 에디토리얼 스탯 바.
7. **[SERVICES]** 01–06 대형 인덱스 리스트 + 호버 시 이미지 프리뷰가 커서를 따라다니는 플로팅 썸네일(Awwwards 포트폴리오 표준 패턴). ★각 항목 우측에 영문 라벨(ZINC ROOF / ZINC WALL / SHINGLE …) 소문자 세리프 병기로 에디토리얼 무드.
8. **[WORKS]** GSAP ScrollTrigger pin + 가로 스크롤 갤러리(데스크톱 한정, 모바일은 세로 그리드). 각 카드: 시공 사진 + 현장 위치/항목 캡션(11px uppercase). ★카드 진입 시 clip-path로 이미지가 아래에서 위로 깎여 올라가는 리빌.
9. **[WORKS ★ Before/After]** 리모델링 사례(노후 지붕→징크, 칙칙한 외벽→사선 징크)에 드래그형 비교 슬라이더 1개. 핸들은 Burnt Copper 라인 + "BEFORE / AFTER" 라벨. 리노베이션 신뢰의 결정타 — Awwwards 사례에서 검증된 패턴.
10. **[PROCESS ★]** 5단계(상담·진단→구조 설계→방수시트→정밀 시공→마감·AS)를 스티키 넘버링으로: 좌측에 고정된 초대형 단계 번호(01–05)가 스크롤에 따라 교체, 우측에 설명 텍스트가 stagger fade-in. 방수시트 단계(보이지 않는 공정)에는 Zinc 컬러 배경 전환으로 "숨은 공정을 드러내는" 연출.
11. **[WHY SJ / CTA ★]** 다크 섹션(#211F1C)에서 전화번호 010-5065-9580을 화면 폭을 채우는 초대형 타이포 + 마그네틱 호버(숫자가 커서에 살짝 끌림). "사진만 병내주세요" 카피는 세리프로 대비. 커스텀 커서는 전화번호 위에서 "CALL" 라벨로 변형.
12. **[FOOTER ★ 메가 푸터]** "SJ EX DESIGN" 초대형 아웃라인 타이포를 푸터 배경에 깔고, 그 위에 상호/전화/SNS(Instagram/Threads/Blog)/© 2026. 스크롤 끝에서 아웃라인 텍스트가 살짝 parallax로 움직이는 여운.

### 구현 시 주의 (트렌드 조사 공통 경고)
- 가로 스크롤·무거운 모션은 데스크톱 전용, 모바일은 단순화 필수(성능=프리미엄).
- 모션이 많을수록 `prefers-reduced-motion` 대응 필수(design.md에 이미 명시됨).
- 고채도·블루-퍼플 그라디언트는 2026 트렌드(도파민 컬러)에 해당하나 **SJ 브랜드와 design.md 방향에 맞지 않아 배제** — 저채도 어시 톤 유지.

---

## 출처 (이번 턴에 실제 검색·확인한 것만)
- Wix, "The 11 Biggest Web Design Trends of 2026" — https://www.wix.com/blog/web-design-trends
- Figma, "Top Web Design Trends for 2026" — https://www.figma.com/resource-library/web-design-trends/
- UX Pilot, "14 Web Design Trends to Keep up with in 2026" — https://uxpilot.ai/blogs/web-design-trends-2026
- Digidop, "Top 5 Web Design Trends to Watch in 2025" — https://www.digidop.com/blog/5-web-design-trends-2025
- SPINX Digital, "59 Award-Winning Best Website Designs in 2026" (Carles Faus Arquitectura 사례) — https://www.spinxdigital.com/blog/best-website-design/
- Awwwards Inspiration: DeGraw & DeHaan Architects 스크롤 갤러리, Ever Before/After Slider — https://www.awwwards.com/inspiration/
- webbb.ai, "Typography Trends in 2026" (가변 폰트·키네틱 타이포) — https://www.webbb.ai/blog/typography-trends-2026
