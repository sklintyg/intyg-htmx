import { ConfigUeIcf } from "../../types/certificateElement.types.ts";
import {
  CertificateDataValidation,
  CertificateDataValidationType,
  TextValidation,
} from "../../types/certificateValidation.types.ts";
import { getFieldName } from "../../util/getFieldName.ts";

export function UeICF({
  id,
  field,
  config,
  validations,
}: {
  id: string;
  field: string;
  config: ConfigUeIcf;
  validations: CertificateDataValidation[];
}) {
  const textValidation = validations.find(
    (rule): rule is TextValidation =>
      rule.type === CertificateDataValidationType.TEXT_VALIDATION
  );

  return (
    <div
      style="display: block;"
      class="m-0 [&:not(:last-child)]:mb-2"
      x-init={`${field}.${config.id} = ${field}.${config.id} || ""`}
    >
      <label hidden for={`${id}-${config.id}`}>
        {config.text}
      </label>
      <textarea
        id={`${id}-${config.id}`}
        name={getFieldName(id, config.id)}
        x-model={`${field}.${config.id}`}
        style="width: 100%"
        class="ids-input"
        x-bind:disabled="!enabled"
        maxLength={textValidation?.limit}
        hx-post="/validate"
        hx-target="#certificate"
      ></textarea>
    </div>
  );
}
