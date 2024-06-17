import {
  CertificateDataValidation,
  CertificateDataValidationType,
} from "../types/certificateValidation.types.ts";
import { convertExpression } from "./convertExpression.ts";

export function getElementValidations(
  key: string,
  validations: CertificateDataValidation[],
  callback: (validation: CertificateDataValidation) => string | undefined
) {
  const result = validations
    .filter(({ expression }) => Boolean(expression))
    .map(callback)
    .filter(Boolean)
    .join(" || ");
  return result.length > 0 ? `get ${key}() { return ${result} },` : "";
}

export function getDisabledSubExpressions(
  validations: CertificateDataValidation[]
) {
  const expression = validations
    .filter(
      (validation) =>
        validation.type ===
        CertificateDataValidationType.DISABLE_SUB_ELEMENT_VALIDATION
    )
    .map(
      ({ id, questionId, expression }) =>
        `(${convertExpression(
          questionId,
          expression
        )}) ? "${id}".split(",").includes(id) : false`
    )
    .join(" || ");
  return expression.length > 0
    ? `
    get disabledSub() {
      return (id) => ${expression}
    },
  `
    : "";
}
