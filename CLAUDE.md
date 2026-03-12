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
- `@teamsparta/stack-checkbox` — 체크박스 (Checkbox.Root/Control/Label)
- `@teamsparta/stack-button` — 버튼 (Button, TextButton, IconButton)
- `@teamsparta/stack-text` — 텍스트 (Text as polymorphic component)
- `@teamsparta/stack-tokens` — 디자인 토큰 (`vars` 객체로 색상/간격 참조)
- `@teamsparta/stack-core` — StackProvider (테마/반응형 컨텍스트 제공)

`src/providers/Providers.tsx`에서 `StackProvider`로 앱 전체를 감싸고 있음 (`src/app/layout.tsx`에서 사용).

모든 Stack 컴포넌트를 사용하는 파일은 `"use client"` 지시어 필요.

### 서약서 기능 (`src/components/pledge/`)

- **`AgreementCheckboxItem`** — 체크박스 + 조건부 "자세히 보기" 버튼. `hasPledgeModal` prop이 true면 체크 시 모달을 먼저 열고, 해제는 바로 가능.
- **`PledgeModal`** — 서약서 내용 표시 모달. 스크롤 끝 도달 시 CTA 활성화, `isAlreadyAgreed`가 true면 CTA 미노출. Radix ScrollArea viewport를 `querySelector`로 찾아 scroll 이벤트 감지.

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
