import { ConfigTypes } from "../types/certificateElement.types.ts";
import { CertificateDataValidationType } from "../types/certificateValidation.types.ts";
import { classNames } from "../util/classNames.ts";
import { convertExpression } from "../util/convertExpression.ts";
import {
  getDisabledSubExpressions,
  getElementValidations,
} from "../util/getElementValidations.ts";
import { minifyExpression } from "../util/minifyExpression.ts";
import { safeId } from "../util/safeId.ts";
import { StructuredCertificateData } from "../util/structureCertificate.ts";
import { CertificateElementHeader } from "./CertificateElementHeader.tsx";
import { CertificateElementResolver } from "./CertificateElementResolver.tsx";
import { Debug } from "./Debug.tsx";
import { DebugButton } from "./DebugButton.tsx";
import { AsteriskIcon } from "./Icon/AsteriskIcon.tsx";

export function CertificateElement({
  element,
  index,
  level = 0,
}: {
  element: StructuredCertificateData;
  index: number;
  level?: number;
}) {
  const id = `${element.config.type.toLowerCase()}-${element.id}`;
  const validations = element.validation ?? [];
  const isCategory = element.config.type === ConfigTypes.CATEGORY;
  const isMultipleDropdown =
    element.config.type ===
    ConfigTypes.UE_RADIO_MULTIPLE_CODE_OPTIONAL_DROPDOWN;

  const visibleValidation = getElementValidations(
    "visible",
    validations,
    ({ type, questionId, expression }) => {
      switch (type) {
        case CertificateDataValidationType.HIDE_VALIDATION:
          return `!(${convertExpression(safeId(questionId), expression)})`;
        case CertificateDataValidationType.SHOW_VALIDATION:
          return `(${convertExpression(safeId(questionId), expression)})`;
      }
    }
  );

  const enabledValidation = getElementValidations(
    "enabled",
    validations,
    ({ type, questionId, expression }) => {
      switch (type) {
        case CertificateDataValidationType.DISABLE_VALIDATION:
          return `!(${convertExpression(safeId(questionId), expression)})`;
        case CertificateDataValidationType.ENABLE_VALIDATION:
          return `(${convertExpression(safeId(questionId), expression)})`;
      }
    }
  );

  const mandatoryValidation = getElementValidations(
    "mandatory",
    validations,
    ({ type, questionId, expression }) => {
      switch (type) {
        case CertificateDataValidationType.MANDATORY_VALIDATION:
          return `!(${convertExpression(safeId(questionId), expression)})`;
      }
    }
  );

  const disableSubValidation = getDisabledSubExpressions(validations);

  return (
    <div
      id={id}
      x-data={minifyExpression(`{
        ${isCategory ? "debug: false," : ""}
        ${enabledValidation}
        ${mandatoryValidation}
        ${visibleValidation}
        ${disableSubValidation}
      }`)}
      x-show="visible"
      x-transition
      class={classNames(
        isCategory && "mb-5 break-inside-avoid",
        "[&:not(:first-child)]:-mt-px relative group",
        "[&:not(:last-child)]:mb-4"
      )}
    >
      {/* <Debug
        data={validations
          .filter(({ expression }) => Boolean(expression))
          .map(({ type, questionId, expression }) => [
            type,
            expression,
            convertExpression(questionId, expression),
          ])}
      ></Debug> */}
      <div class={classNames(!isCategory && "[&:not(:last-child)]:mb-4")}>
        <div
          x-cloak
          x-show="mandatory"
          class="absolute top-0 -left-4 text-red-400 text-xs"
        >
          <AsteriskIcon />
        </div>
        {isCategory && (
          <>
            <DebugButton />
            <div x-show="debug">
              <Debug data={element} />
            </div>
          </>
        )}
        <CertificateElementHeader
          id={element.id}
          config={element.config}
          level={level}
        />
        {!isCategory && (
          <CertificateElementResolver
            element={element}
            index={index}
            validations={validations}
          />
        )}
      </div>
      {!isMultipleDropdown &&
        element.children.map((element, index) => (
          <CertificateElement
            key={element.id}
            element={element}
            index={index}
            level={level + 1}
          />
        ))}
    </div>
  );
}
