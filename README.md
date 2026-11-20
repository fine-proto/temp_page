# 지상욱 UX/UI 기획 포트폴리오 (반응형 웹)

PPT 포트폴리오(`포트폴리오_지상욱_261120_FINAL.pptx`)를 반응형 웹으로 옮긴 정적 사이트입니다.

## 구조
```
index.html            # 단일 페이지 (소개 · 프로필 · 프로젝트 10건 · 연락처)
assets/css/style.css  # 스타일 (데스크톱 / 960px / 720px 브레이크포인트)
assets/js/main.js     # 모바일 메뉴, 스크롤 효과, 이미지 확대(라이트박스)
assets/img/           # 섹션별 이미지 (PPT에서 잘라낸 WebP)
assets/slides/        # PPT 원본 슬라이드 이미지 (원본 슬라이드 보기용)
assets/portfolio.pdf  # PDF 다운로드 파일
```

## 배포 (GitHub Pages)
Settings → Pages → Source: `Deploy from a branch` → Branch `main` / `(root)` 저장.

## PDF 교체
`assets/portfolio.pdf`를 같은 이름의 새 파일로 덮어쓰면 다운로드 버튼에 바로 반영됩니다.
