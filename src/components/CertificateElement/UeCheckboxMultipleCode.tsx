import { ConfigUeCheckboxMultipleCodes } from "../../types/certificateElement.types.ts";
import { getFieldName } from "../../util/getFieldName.ts";

export function UeCheckboxMultipleCode({
  id,
  field,
  config,
}: {
  id: string;
  field: string;
  config: ConfigUeCheckboxMultipleCodes;
}) {
  return (
    <div class="grid grid-rows-4 grid-flow-col gap-x-4">
      {config.list.map((item) => (
        <>
          <input
            type="checkbox"
            id={`${id}-${item.id}`}
            name={getFieldName(id, item.id)}
            class="ids-checkbox pointer-events-none"
            x-on:change={`${field}.${item.id} = $event.target.checked ? true : undefined`}
            x-bind:checked={`${field}.${item.id} != null`}
            x-bind:disabled={`disabledSub("${item.id}") || !enabled`}
          />
          <label
            for={`${id}-${item.id}`}
            class="ids-checkbox-label cursor-pointer"
          >
            {item.label}
          </label>
        </>
      ))}
    </div>
  );
}
