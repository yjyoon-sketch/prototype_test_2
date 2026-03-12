# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
npx tsc --noEmit # 타입 체크 (빌드 없이)
```

Stack 패키지 설치 시 `--legacy-peer-deps` 필수 (React 19 vs Stack의 React 18 peer dep 충돌):
```bash
npm install @teamsparta/stack-* --legacy-peer-deps
```

## Architecture

**Next.js 16 App Router** + **TypeScript** + **Tailwind CSS**

### Stack 디자인 시스템

모든 UI 컴포넌트는 `@teamsparta/stack-*` 패키지 사용. Emotion(CSS-in-JS) 기반이므로 `@emotion/react`, `@emotion/styled`도 함께 설치 필요.

- `@teamsparta/stack-custom-modal` — 모달 (CustomModal.Root/Content/Header/Body/Footer/Button)
- `@teamsparta/stack-bottom-sheet` — 바텀시트 (BottomSheet.Root/Content/Header/Body/Footer/Button/ButtonGroup). vaul 기반, Radix ScrollArea 내장.
- `@teamsparta/stack-checkbox` — 체크박스 (Checkbox.Root/Control/Label)
- `@teamsparta/stack-button` — 버튼 (Button, TextButton, IconButton). Button `colorScheme`: primary/secondary/tertiary/error. **TextButton은 `colorScheme` 미지원**, `variant: "link" | "default"`만 사용 가능
- `@teamsparta/stack-text` — 텍스트 (Text as polymorphic component)
- `@teamsparta/stack-tokens` — 디자인 토큰 (`vars` 객체로 색상/간격 참조)
- `@teamsparta/stack-core` — StackProvider (테마/반응형 컨텍스트 제공)

`src/providers/Providers.tsx`에서 `StackProvider`로 앱 전체를 감싸고 있음 (`src/app/layout.tsx`에서 사용).

모든 Stack 컴포넌트를 사용하는 파일은 `"use client"` 지시어 필요.

### 서약서 기능 (`src/components/pledge/`)

- **`AgreementCheckboxItem`** — 체크박스 + 조건부 "자세히 보기" 버튼. `hasPledgeModal` prop이 true면 체크 시 모달/바텀시트를 먼저 열고, 해제는 바로 가능. `useIsMobile` (767px 기준)로 데스크톱/모바일 분기.
- **`PledgeModal`** — 데스크톱용 서약서 모달 (`@teamsparta/stack-custom-modal`). `isAlreadyAgreed`가 true면 CTA 미노출.
- **`PledgeBottomSheet`** — 모바일용 서약서 바텀시트 (`@teamsparta/stack-bottom-sheet`). 767px 이하에서 렌더링.
- **`PledgeContent`** — 서약서 본문 JSX (Modal/BottomSheet 공용).

**CTA 동작**: 스크롤이 필요한 경우 "아래로 스크롤" 버튼(secondary) 노출 → 클릭 시 자동 스크롤 → 하단 도달 시 "동의합니다" 버튼으로 전환. 스크롤 불필요 시 처음부터 "동의합니다" 노출.

#### 스크롤 감지 훅 (`src/hooks/usePledgeScroll.ts`)

Radix ScrollArea가 내부적으로 스크롤을 처리하므로 일반 scroll 이벤트가 발생하지 않음. 해결 방법:
1. `querySelector('[data-radix-scroll-area-viewport]')`로 Radix viewport 탐색
2. 없으면 `parentElement`를 위로 순회하며 `overflowY: auto/scroll`인 조상 요소 탐색
3. `scrollHeight <= clientHeight + 10`이면 스크롤 불필요로 판단, 즉시 활성화
4. 모달 오픈 애니메이션 완료 대기를 위해 500ms 딜레이 후 감지 시작

### 배포

GitHub Actions로 자동 배포 (`.github/workflows/deploy.yml`). `main` 브랜치 push 시 트리거.

- `next.config.ts`: `output: "export"` + `basePath: "/prototype_test_2"` (static export)
- GitHub 레포 Settings → Pages → Source를 `GitHub Actions`로 설정 필요
- 배포 URL: `https://yjyoon-sketch.github.io/prototype_test_2/`

### 디자인 토큰 사용법

```tsx
import { vars } from "@teamsparta/stack-tokens";

// 색상
vars.text.primary / vars.text.secondary / vars.text.tertiary
vars.line.nonClickable
vars.orangeRed[70]  // 필수 표시 빨간색

// Text 컴포넌트 폰트
// title1(28px/700), bodyB(15px/700), bodyM(15px/500), bodyCompact(14px/500), captionSb(13px/600)
```
