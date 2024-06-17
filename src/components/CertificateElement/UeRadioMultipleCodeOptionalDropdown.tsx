import { ConfigUeRadioMultipleCodesOptionalDropdown } from "../../types/certificateElement.types.ts";
import { getFieldName } from "../../util/getFieldName.ts";

export function UeRadioMultipleCodeOptionalDropdown({
  id,
  field,
  config,
}: {
  id: string;
  field: string;
  config: ConfigUeRadioMultipleCodesOptionalDropdown;
}) {
  return (
    <>
      {config.list.map((item) => (
        <>
          <input
            id={`${id}-${item.id}`}
            name={getFieldName(id)}
            class="ids-radio pointer-events-none"
            x-model={field}
            x-bind:disabled="!enabled"
            type="radio"
            value={item.id}
            hx-trigger="click throttle:500"
            hx-post="/validate"
            hx-target="#certificate"
          />
          <label
            for={`${id}-${item.id}`}
            class="ids-radio-label cursor-pointer"
          >
            {item.label}
          </label>
        </>
      ))}
    </>
  );
}
