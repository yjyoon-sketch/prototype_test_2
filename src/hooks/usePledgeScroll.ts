"use client";

import { useEffect, useRef, useState } from "react";

export function usePledgeScroll(isOpen: boolean) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setHasScrolledToBottom(false);
    setIsScrollable(false);

    const timer = setTimeout(() => {
      const bodyEl = bodyRef.current;
      if (!bodyEl) return;

      // 1순위: Radix ScrollArea viewport
      // 2순위: DOM 위로 탐색하며 실제 스크롤 가능한 조상 요소 탐색
      let viewport: HTMLElement =
        (bodyEl.querySelector(
          "[data-radix-scroll-area-viewport]"
        ) as HTMLElement) || bodyEl;

      if (
        viewport === bodyEl ||
        viewport.scrollHeight <= viewport.clientHeight + 10
      ) {
        let el: HTMLElement | null = bodyEl.parentElement;
        while (el && el !== document.body) {
          const { overflowY } = window.getComputedStyle(el);
          if (
            (overflowY === "auto" || overflowY === "scroll") &&
            el.scrollHeight > el.clientHeight + 10
          ) {
            viewport = el;
            break;
          }
          el = el.parentElement;
        }
      }

      viewportRef.current = viewport;

      if (viewport.scrollHeight <= viewport.clientHeight + 10) {
        setHasScrolledToBottom(true);
        return;
      }

      setIsScrollable(true);

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = viewport;
        if (scrollHeight - scrollTop - clientHeight <= 20) {
          setHasScrolledToBottom(true);
        }
      };

      viewport.addEventListener("scroll", handleScroll, { passive: true });
      return () => viewport.removeEventListener("scroll", handleScroll);
    }, 500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
    }
  };

  return { bodyRef, hasScrolledToBottom, isScrollable, scrollToBottom };
}
