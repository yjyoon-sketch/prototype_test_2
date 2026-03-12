"use client";

import { useEffect, useState } from "react";
import * as Checkbox from "@teamsparta/stack-checkbox";
import { TextButton } from "@teamsparta/stack-button";
import { Text } from "@teamsparta/stack-text";
import { vars } from "@teamsparta/stack-tokens";
import { PledgeModal } from "./PledgeModal";
import { PledgeBottomSheet } from "./PledgeBottomSheet";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

interface AgreementCheckboxItemProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description: string;
  hasPledgeModal?: boolean;
}

export function AgreementCheckboxItem({
  checked,
  onCheckedChange,
  description,
  hasPledgeModal = false,
}: AgreementCheckboxItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCheckboxChange = (newChecked: boolean) => {
    if (newChecked && hasPledgeModal) {
      // 미동의 상태에서 체크 → 모달 오픈 (아직 체크 안 함)
      setIsModalOpen(true);
    } else {
      // 동의 후 체크 해제 or 모달 없는 항목
      onCheckedChange(newChecked);
    }
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleAgree = () => {
    onCheckedChange(true);
  };

  return (
    <>
      <div
        style={{
          border: `1px solid ${vars.line.nonClickable}`,
          borderRadius: 8,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Text as="p" font="bodyCompact" color={vars.text.secondary}>
          {description}
        </Text>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Checkbox.Root
            size="sm"
            checked={checked}
            onCheckedChange={handleCheckboxChange}
            disableExpandedHitArea
          >
            <Checkbox.Control />
            <Checkbox.Label>동의합니다.</Checkbox.Label>
          </Checkbox.Root>

          {hasPledgeModal && (
            <TextButton
              size="sm"
              variant="default"
              onClick={handleViewDetails}
            >
              자세히 보기
            </TextButton>
          )}
        </div>
      </div>

      {hasPledgeModal && (
        isMobile ? (
          <PledgeBottomSheet
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            isAlreadyAgreed={checked}
            onAgree={handleAgree}
          />
        ) : (
          <PledgeModal
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            isAlreadyAgreed={checked}
            onAgree={handleAgree}
          />
        )
      )}
    </>
  );
}
