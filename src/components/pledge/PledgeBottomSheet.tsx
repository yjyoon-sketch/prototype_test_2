"use client";

import * as BottomSheet from "@teamsparta/stack-bottom-sheet";
import { usePledgeScroll } from "@/hooks/usePledgeScroll";
import { PledgeContent } from "./PledgeContent";

interface PledgeBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAlreadyAgreed: boolean;
  onAgree: () => void;
}

export function PledgeBottomSheet({
  isOpen,
  onOpenChange,
  isAlreadyAgreed,
  onAgree,
}: PledgeBottomSheetProps) {
  const { bodyRef, hasScrolledToBottom, isScrollable, scrollToBottom } =
    usePledgeScroll(isOpen);

  const handleAgree = () => {
    onAgree();
    onOpenChange(false);
  };

  return (
    <BottomSheet.Root open={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Content>
        <BottomSheet.Header>
          <BottomSheet.Title>바로인턴 수료생 서약서</BottomSheet.Title>
        </BottomSheet.Header>

        <BottomSheet.Body>
          <div ref={bodyRef}>
            <PledgeContent />
          </div>
        </BottomSheet.Body>

        {!isAlreadyAgreed && (
          <BottomSheet.Footer>
            <BottomSheet.ButtonGroup>
              {isScrollable && !hasScrolledToBottom ? (
                <BottomSheet.Button
                  colorScheme="secondary"
                  onClick={scrollToBottom}
                >
                  아래로 스크롤
                </BottomSheet.Button>
              ) : (
                <BottomSheet.Button onClick={handleAgree}>
                  동의합니다
                </BottomSheet.Button>
              )}
            </BottomSheet.ButtonGroup>
          </BottomSheet.Footer>
        )}
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
}
