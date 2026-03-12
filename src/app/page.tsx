"use client";

import { useState } from "react";
import { Text } from "@teamsparta/stack-text";
import { vars } from "@teamsparta/stack-tokens";
import { AgreementCheckboxItem } from "@/components/pledge/AgreementCheckboxItem";

export default function Home() {
  const [pledgeAgreed, setPledgeAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [noticeConfirmed, setNoticeConfirmed] = useState(false);

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 py-12">
      <main className="w-full max-w-[820px] bg-white px-9 py-[70px] flex flex-col gap-10">
        {/* 헤더 */}
        <div className="flex flex-col gap-1.5">
          <Text as="h1" font="title1" color={vars.text.primary}>
            17기 바로인턴
          </Text>
          <Text as="p" font="bodyCompact" color={vars.text.tertiary}>
            바로인턴은 실제 기업에서 인턴 활동을 통해 실무 경험을 쌓는
            프로그램입니다.{" "}
            <br />내 이력서에 소중한 경력 한 줄을 추가해 서류 합격률을 개선할
            기회로 활용해보세요.
          </Text>
        </div>

        {/* 확인 및 동의 섹션 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-0.5 items-center">
              <Text as="span" font="bodyB" color={vars.text.secondary}>
                확인 및 동의
              </Text>
              <Text as="span" font="bodyB" color={vars.orangeRed[70]}>
                *
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* 서약서 동의 */}
            <AgreementCheckboxItem
              checked={pledgeAgreed}
              onCheckedChange={setPledgeAgreed}
              description="바로인턴 참여하는 수료생에게 근무 조건 및 참여 규칙을 고지하며, 동의를 받고자 합니다. 자세한 내용은 하단의 자세히 보기 버튼을 클릭해주세요. 동의하지 않을 경우, 바로인턴 서비스 이용이 제한될 수 있습니다."
              hasPledgeModal
            />

            {/* 개인정보 동의 */}
            <AgreementCheckboxItem
              checked={privacyAgreed}
              onCheckedChange={setPrivacyAgreed}
              description="바로인턴 참여에 있어서 개인정보 제3자 제공 동의를 받고자 합니다. 자세한 내용은 하단의 자세히 보기 버튼을 클릭해주세요. 동의하지 않을 경우, 바로인턴 서비스 이용이 제한될 수 있습니다."
            />

            {/* 안내 확인 */}
            <AgreementCheckboxItem
              checked={noticeConfirmed}
              onCheckedChange={setNoticeConfirmed}
              description="지원 후 서류 검토를 통해 선발을 진행하며, 결과는 영업일 기준 모집 마감 익일 오후에 문자로 안내드릴 예정입니다. 안내 예정 전화번호인 02-552-7758 수신 거부 여부를 미리 확인해주세요. 수신 거부로 인한 안내 미수신에 대한 책임은 본인에게 있습니다."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
