import { ConfigUeCheckboxMultipleDate } from "../../types/certificateElement.types.ts";
import { getFieldName } from "../../util/getFieldName.ts";
import { minifyExpression } from "../../util/minifyExpression.ts";

function getDate() {
  return new Date().toISOString().split("T")[0];
}

export function UeCheckboxMultipleDate({
  id,
  field,
  config,
}: {
  id: string;
  field: string;
  config: ConfigUeCheckboxMultipleDate;
}) {
  return (
    <>
      {config.list.map((item) => (
        <div
          id={`${id}-${item.id}`}
          class="grid grid-cols-2 gap-4 items-center mb-2"
          x-data={`{date: null, checked: Boolean(${field}.${item.id})}`}
          x-init={minifyExpression(`
            ${field}.${item.id} = ${field}.${item.id} || null; 
            $watch('checked', value => { if (!checked) {  date = null; } else { date = '${getDate()}'; $refs.date.focus() }})
          `)}
          x-modelable="date"
          x-model={`${field}.${item.id}`}
          hx-trigger="clicked changed throttle:500"
          hx-post="/validate"
          hx-target="#certificate"
        >
          <div>
            <input
              id={`${id}-${item.id}-checkbox`}
              class="ids-checkbox pointer-events-none"
              x-model="checked"
              type="checkbox"
              x-bind:disabled="!enabled"
            />
            <label
              id={`${id}-${item.id}-label`}
              for={`${id}-${item.id}-checkbox`}
              class="ids-checkbox-label cursor-pointer"
            >
              {item.label}
            </label>
          </div>
          <div>
            <label hidden for={`${id}-${item.id}-datepicker`}>
              {item.label}
            </label>
            <input
              name={getFieldName(id, item.id)}
              id={`${id}-${item.id}-datepicker`}
              type="date"
              x-bind:disabled="!checked || !enabled"
              x-model="date"
              x-ref="date"
              class="ids-input"
            ></input>
          </div>
        </div>
      ))}
    </>
  );
}
