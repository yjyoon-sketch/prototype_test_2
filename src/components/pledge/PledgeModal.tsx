"use client";

import * as CustomModal from "@teamsparta/stack-custom-modal";
import { usePledgeScroll } from "@/hooks/usePledgeScroll";
import { PledgeContent } from "./PledgeContent";

interface PledgeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAlreadyAgreed: boolean;
  onAgree: () => void;
}

export function PledgeModal({
  isOpen,
  onOpenChange,
  isAlreadyAgreed,
  onAgree,
}: PledgeModalProps) {
  const { bodyRef, hasScrolledToBottom, isScrollable, scrollToBottom } =
    usePledgeScroll(isOpen);

  const handleAgree = () => {
    onAgree();
    onOpenChange(false);
  };

  return (
    <CustomModal.Root open={isOpen} onOpenChange={onOpenChange} size="lg">
      <CustomModal.Content>
        <CustomModal.Header>
          <CustomModal.Title>바로인턴 수료생 서약서</CustomModal.Title>
        </CustomModal.Header>

        <CustomModal.Body ref={bodyRef}>
          <PledgeContent />
        </CustomModal.Body>

        {!isAlreadyAgreed && (
          <CustomModal.Footer>
            {isScrollable && !hasScrolledToBottom ? (
              <CustomModal.Button
                colorScheme="secondary"
                onClick={scrollToBottom}
              >
                아래로 스크롤
              </CustomModal.Button>
            ) : (
              <CustomModal.Button onClick={handleAgree}>
                동의합니다
              </CustomModal.Button>
            )}
          </CustomModal.Footer>
        )}
      </CustomModal.Content>
    </CustomModal.Root>
  );
}
