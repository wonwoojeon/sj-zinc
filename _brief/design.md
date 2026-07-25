# SJ징크지붕공사 웹사이트 — 디자인 시스템 (Awwwards 수준 목표)

## 콘셉트: "ZINC & CRAFT — 지붕 위의 장인정신"
징크(아연) 금속의 물성에서 출발하는 프리미엄 무드.
차가운 금속 + 따뜻한 장인의 손길. 건축 잡지(에디토리얼) 레이아웃 + 부드러운 모션.

## 컬러 (저채도, 웜톤 — 파랑-볼라 그라디언트 금지)
- Ink (거의 검정): #1A1917
- Zinc (징크 그레이): #8E8B84
- Steel line: #D8D4CC
- Bone (배경 웜화이트): #F4F1EB
- Paper: #FBF9F5
- Accent — Burnt Copper (버nt 코퍼): #B4552D (CTA/포인트만, 면적 5% 이내)
- Dark section 배경: #211F1C

### 접근성 파생색 (팔레트 확장 — 대비 보정용)
- Zinc Deep: #6E6B64 — 밝은 배경 위 11px 라벨·보조 텍스트 (--zinc는 밝은 배경에서 대비 미달)
- Copper Bright: #C96B3F — 다크 배경 위 코퍼 라벨·인덱스 넘버
- Ink Soft: #3A3835 — 본문 보조 텍스트 (Ink보다 한 단계 연함)
- Copper Deep: #9C4825 — 코퍼 버튼 호버 (어두운 변형)

## 타이포그래피 (CDN)
- 한글 본문/헤드라인: Pretendard (https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.min.css)
- 헤드라인 액센트(세리프): Noto Serif KR (700, 일부 키워드만)
- 영문/숫자 디스플레이: 'Archivo' 또는 Pretendard 그대로, 자간 -0.02em
- 히어로 헤드라인: clamp(3rem, 9vw, 8.5rem), 줄간 1.05
- 라벨/캡션: 11px, letter-spacing 0.14em, uppercase

## 레이아웃/섹션 구성 (single-page, index.html)
0. 프리로더 — 로고/카운터, 1.2s 이내, 부드러운 커튼 업
1. HERO — 풀스크린. 실제 징크지붕 시공 사진(어둡게 그레이드) 위에 초대형 타이포
   카피: "지붕, 그 이상을 짓다." / 서브: "징크 · 슁글 · 데크 · 외장 전문 — SJ징크지붕공사"
   스크롤 인디케이터, 상단 고정 낸(투명→스크롤 시 bone 배경)
2. MARQUEE — 무한 롤링 텍스트: ZINC ROOFING — SHINGLE — DECK — EXTERIOR — LEAK REPAIR
3. ABOUT/철학 — "겉이 아니라, 구조를 봅니다." 20년 경력 직접 시공, 큰 세리프 인용구 + 스탯(20년 경력 / 누수 제로 / 100% 직접 시공)
4. SERVICES — 6개 서비스, 스티키 스태킹 카드 또는 대형 인덱스 리스트(01 징크지붕 / 02 징크외장 / 03 슁글·덧방 / 04 캐노피 / 05 빗물받이 / 06 누수보수) — 호버 시 이미지 프리뷰
5. WORKS — 실제 시공 사진 가로 스크롤 갤러리(GSAP ScrollTrigger pin + horizontal) + 전/후(Before/After) 비교 슬라이더 1개
6. PROCESS — 5단계: 상담·진단 → 구조 설계 → 방수시트 → 정밀 시공 → 마감·AS (스크롤 연동 넘버링)
7. WHY SJ — 4개 포인트: 묵료견적 / 브로커 없는 직접상담 / 누수 제로 철학 / AS 보장
8. CTA — 다크 섹션, 초대형 전화번호 010-5065-9580, "사진만 병내주세요. 1차 견적은 묵료입니다." + SNS 링크(Instagram/Threads/Blog)
9. FOOTER — 상호, 전화, SNS, © 2026

## 모션 (CDN: GSAP 3 + ScrollTrigger + Lenis)
- Lenis smooth scroll
- 히어로 타이포 라인별 마스크 업 리빌
- 섹션 진입 시 fade/slide (y:40, stagger)
- Works 가로 스크롤 pin
- 이미지 parallax (scale 1.15 → 1)
- 커스텀 커서(도트 + 링, 호버 시 "VIEW" 라벨)
- 매그네틱 버튼 (CTA, 전화번호)
- prefers-reduced-motion 대응

## 기술 규칙
- 파일 구조: /Users/j2w/SJ/index.html, css/style.css, js/main.js, assets/img/*
- 외부 라이브러리는 CDN만 사용, 빌드 스텝 없음 (더블클릭으로 바로 열리게)
- 완전 반응형 (모바일 퍼스트 브레이크포인트 768/1024)
- 이미지는 assets/img 로컬 참조, loading="lazy", alt 한글
- SEO: title/description/OG 태그, 시맨틱 태그, JSON-LD LocalBusiness 스키마
- 접근성: 대비, focus 스타일, aria-label
