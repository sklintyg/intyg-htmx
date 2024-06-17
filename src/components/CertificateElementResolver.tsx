import { h } from "preact";
import { ConfigTypes } from "../types/certificateElement.types.ts";
import { CertificateDataValidation } from "../types/certificateValidation.types.ts";
import { StructuredCertificateData } from "../util/structureCertificate.ts";
import { UeCheckboxBoolean } from "./CertificateElement/UeCheckboxBoolean.tsx";
import { UeCheckboxDateRangeList } from "./CertificateElement/UeCheckboxDateRangeList.tsx";
import { UeCheckboxMultipleCode } from "./CertificateElement/UeCheckboxMultipleCode.tsx";
import { UeCheckboxMultipleDate } from "./CertificateElement/UeCheckboxMultipleDate.tsx";
import { UeDiagnoses } from "./CertificateElement/UeDiagnoses.tsx";
import { UeICF } from "./CertificateElement/UeICF.tsx";
import { UeRadioBoolean } from "./CertificateElement/UeRadioBoolean.tsx";
import { UeRadioMultipleCodeOptionalDropdown } from "./CertificateElement/UeRadioMultipleCodeOptionalDropdown.tsx";
import { UeTextArea } from "./CertificateElement/UeTextArea.tsx";
import { UeUnknown } from "./CertificateElement/UeUnknown.tsx";

export function CertificateElementResolver({
  element,
  validations,
  index,
}: {
  element: StructuredCertificateData;
  validations: CertificateDataValidation[];
  index: number;
}) {
  const { id, config } = element;
  const field = `data['${id}']`;

  switch (config.type) {
    case ConfigTypes.UE_TEXTAREA:
      return h(UeTextArea, {
        id,
        field,
        config,
        validations,
      });
    case ConfigTypes.UE_CHECKBOX_BOOLEAN:
      return h(UeCheckboxBoolean, {
        id,
        field,
        config,
      });
    case ConfigTypes.UE_RADIO_BOOLEAN:
      return h(UeRadioBoolean, {
        id,
        field,
        config,
      });
    case ConfigTypes.UE_CHECKBOX_MULTIPLE_DATE:
      return h(UeCheckboxMultipleDate, {
        id,
        field,
        config,
      });
    case ConfigTypes.UE_CHECKBOX_MULTIPLE_CODE:
      return h(UeCheckboxMultipleCode, {
        id,
        field,
        config,
      });
    case ConfigTypes.UE_DIAGNOSES:
      return h(UeDiagnoses, {
        id,
        field,
        config,
      });
    case ConfigTypes.UE_SICK_LEAVE_PERIOD:
      return h(UeCheckboxDateRangeList, {
        id,
        field,
        config,
      });
    case ConfigTypes.UE_ICF:
      return h(UeICF, {
        id,
        field,
        config,
        validations,
      });
    case ConfigTypes.UE_RADIO_MULTIPLE_CODE_OPTIONAL_DROPDOWN:
      return h(UeRadioMultipleCodeOptionalDropdown, {
        id,
        field,
        config,
      });
  }

  return h(UeUnknown, {
    config: element.config,
    value: element.value,
  });
}
