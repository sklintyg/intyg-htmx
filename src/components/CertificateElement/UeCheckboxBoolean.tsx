import { ConfigUeCheckboxBoolean } from "../../types/certificateElement.types.ts";
import { getFieldName } from "../../util/getFieldName.ts";

export function UeCheckboxBoolean({
  id,
  field,
  config,
}: {
  id: string;
  field: string;
  config: ConfigUeCheckboxBoolean;
}) {
  return (
    <>
      <input
        id={`${id}-${config.id}`}
        name={getFieldName(id, config.id)}
        class="ids-checkbox pointer-events-none"
        x-model={`${field}.${config.id}`}
        x-bind:disabled="!enabled"
        type="checkbox"
        hx-trigger="click throttle:500"
        hx-post="/validate"
        hx-target="#certificate"
      />
      <label
        for={`${id}-${config.id}`}
        class="ids-checkbox-label cursor-pointer"
      >
        {config.label}
      </label>
    </>
  );
}
