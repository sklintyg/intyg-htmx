import { ConfigUeSickLeavePeriod } from "../../types/certificateElement.types.ts";
import { getFieldName } from "../../util/getFieldName.ts";

function getDate() {
  return new Date().toISOString().split("T")[0];
}

export function UeCheckboxDateRangeList({
  id,
  field,
  config,
}: {
  id: string;
  field: string;
  config: ConfigUeSickLeavePeriod;
}) {
  const defaultState = "{from: null, to: null}";
  return (
    <>
      {config.list.map((item) => (
        <div
          id={`${id}-${item.id}`}
          class="grid grid-cols-3 gap-4 items-center mb-2"
          x-data={`{date: ${defaultState}, checked: Boolean(q("${id}","${item.id}"))}`}
          x-init={`
            ${field}.${item.id} = ${field}.${item.id} || ${defaultState};
            $watch('checked', value => { if (!checked) {  date = ${defaultState}; } else { date = {from: '${getDate()}', to: null}; $refs.date_to.focus() }})`}
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
          {["from", "to"].map((period) => (
            <div>
              <label hidden for={`${id}-${item.id}-${period}-datepicker`}>
                {item.label}
              </label>
              <input
                name={getFieldName(id, item.id, period)}
                id={`${id}-${item.id}-${period}-datepicker`}
                type="date"
                x-bind:disabled="!checked || !enabled"
                x-model={`date.${period}`}
                x-ref={`date_${period}`}
                class="ids-input"
              ></input>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
