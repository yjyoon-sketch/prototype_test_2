"use client";

import { Text } from "@teamsparta/stack-text";
import { vars } from "@teamsparta/stack-tokens";

export function PledgeContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Text as="p" font="bodyCompact" color={vars.text.secondary}>
        팀스파르타 주식회사(이하 &apos;팀스파르타&apos;)는 바로인턴
        프로그램에 참여하는 수료생에게 아래 사항을 고지하며, 수료생은
        이를 충분히 숙지하고 성실히 이행할 것을 서약합니다.
      </Text>

      {/* 고지 사항 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Text as="h3" font="bodyB" color={vars.text.primary}>
          고지 사항
        </Text>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text as="p" font="bodyB" color={vars.text.secondary}>
            1. 근로계약 및 급여
          </Text>
          <Text as="p" font="bodyCompact" color={vars.text.secondary}>
            바로인턴 실습에서의 근로계약, 급여, 근무 조건 등은 수료생과
            기업이 직접 협의하여 결정하는 사항입니다. 팀스파르타는 해당
            계약의 당사자가 아니므로, 이와 관련하여 발생하는 분쟁에
            개입하거나 중재하는 것이 불가하며, 근로조건 결정 및
            근로관계 유지에 관한 법적 책임을 지지 않습니다.
          </Text>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text as="p" font="bodyB" color={vars.text.secondary}>
            2. 인턴 계약 종료 및 재참여 제한
          </Text>
          <Text as="p" font="bodyCompact" color={vars.text.secondary}>
            아래의 경우, 기업은 수료생과의 인턴 계약을 중도 종료할 수
            있습니다. 해당 사유로 인한 인턴 계약 종료 시, 바로인턴
            프로그램 재참여가 제한됩니다.
          </Text>
          <ul
            style={{
              paddingLeft: 16,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              margin: 0,
            }}
          >
            {[
              "기업의 기밀정보를 외부에 공개·누설·유포하거나 보안 정책을 위반한 경우",
              "기업의 윤리 규정 및 각종 직무 규정을 위반한 경우",
              "기업의 명예 또는 신용을 훼손하는 행위를 한 경우",
              "무단결근·지각·조퇴 반복, 업무 지시 불이행 등 성실한 근무 태도를 유지하지 않는 경우",
            ].map((item) => (
              <li key={item} style={{ listStyleType: "disc" }}>
                <Text as="span" font="bodyCompact" color={vars.text.secondary}>
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text as="p" font="bodyB" color={vars.text.secondary}>
            3. 바로인턴 지원 및 참여
          </Text>
          <Text as="p" font="bodyCompact" color={vars.text.secondary}>
            바로인턴 지원 및 참여는{" "}
            <strong>4대보험 가입이 가능한 수료생</strong>에 한해
            가능합니다. 국민취업제도 참여 중이신 분은 지원 전, 담당
            상담사를 통해 본 프로그램을 통한 4대보험 가입 가능 여부를
            반드시 확인하시기 바랍니다. 미확인으로 인한 선발 취소 및
            불이익의 책임은 본인에게 있습니다.
          </Text>
        </div>
      </div>

      {/* 서약 사항 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Text as="h3" font="bodyB" color={vars.text.primary}>
          서약 사항
        </Text>
        <ul
          style={{
            paddingLeft: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            margin: 0,
          }}
        >
          {[
            "본인은 위 고지 사항을 모두 읽고 충분히 이해하였으며, 아래 사항을 성실히 이행할 것을 서약합니다.",
            "근로계약 및 급여 관련 사항은 기업과 직접 협의하며, 관련 분쟁에 팀스파르타가 개입하거나 중재하는 것이 불가함을 인지하였습니다.",
            "기업의 보안 정책, 윤리 규정, 직무 규정을 성실히 준수하겠습니다.",
            "기업의 기밀정보를 외부에 공개하거나 누설하지 않겠습니다.",
            "성실한 근무 태도를 유지하고, 기업의 정당한 업무 지시에 따르겠습니다.",
            "위 서약을 위반하여 인턴 계약이 종료될 경우, 바로인턴 프로그램에 재참여하지 못할 수 있음을 인지하였습니다.",
            "팀스파르타의 바로인턴 프로그램 관련 만족도 조사, 후기 및 인터뷰 요청에 성실히 응하겠습니다.",
          ].map((item) => (
            <li key={item} style={{ listStyleType: "disc" }}>
              <Text as="span" font="bodyCompact" color={vars.text.secondary}>
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
