import { ConfigUeRadioBoolean } from "../../types/certificateElement.types.ts";
import { getFieldName } from "../../util/getFieldName.ts";

export function UeRadioBoolean({
  id,
  field,
  config,
}: {
  id: string;
  field: string;
  config: ConfigUeRadioBoolean;
}) {
  return (
    <div
      id={`${id}.${config.id}`}
      class="flex gap-4"
      x-data={`{selected: false, value: q('${id}', '${config.id}') ? '1' : '0' }`}
      x-modelable="selected"
      x-model={`${field}.${config.id}`}
      x-init={`
        ${field}.${config.id} = ${field}.${config.id} || true;
        $watch('value', val => selected = val === '1')
      `}
    >
      {[1, 0].map((option) => (
        <>
          <input
            id={`${id}-${config.id}-${option}`}
            name={getFieldName(id, config.id)}
            class="ids-radio pointer-events-none"
            x-model="value"
            x-bind:disabled="!enabled"
            type="radio"
            value={option}
            hx-trigger="click throttle:500"
            hx-post="/validate"
            hx-target="#certificate"
          />
          <label
            for={`${id}-${config.id}-${option}`}
            class="ids-radio-label cursor-pointer"
          >
            {option === 1 ? config.selectedText : config.unselectedText}
          </label>
        </>
      ))}
    </div>
  );
}
