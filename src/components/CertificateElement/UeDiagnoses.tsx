import { ConfigUeDiagnoses } from "../../types/certificateElement.types.ts";
import { getFieldName } from "../../util/getFieldName.ts";

export function UeDiagnoses({
  id,
  field,
  config,
}: {
  id: string;
  field: string;
  config: ConfigUeDiagnoses;
}) {
  return (
    <>
      <p>Välj kodverk:</p>
      <div class="flex gap-4 mb-4">
        {config.terminology.map(({ id: termId, label }) => (
          <div>
            <input
              id={`${id}-${termId}`}
              name={getFieldName(id, "code")}
              value={termId}
              type="radio"
              x-bind:disabled="!enabled"
              class="ids-radio pointer-events-none"
            />
            <label
              for={`${id}-${termId}`}
              class="ids-radio-label cursor-pointer"
            >
              {label}
            </label>
          </div>
        ))}
      </div>
      <p style={{ marginBottom: "1rem" }}>Diagnoskod enligt ICD-10 SE</p>
      {config.list.map((item) => (
        <div class="flex [&:not(:last-child)]:mb-4 gap-4">
          <div>
            <label hidden>Diagnoskod</label>
            <input
              type="text"
              name={getFieldName(id, item.id)}
              x-bind:disabled="!enabled"
              x-model={`${field}['${item.id}']`}
              class="ids-input"
              hx-post="/validate"
              hx-target="#certificate"
            ></input>
          </div>
          <div class="w-full">
            <label hidden>Diagnosbeskrivning</label>
            <input
              type="text"
              x-bind:disabled="!enabled"
              class="ids-input"
            ></input>
          </div>
        </div>
      ))}
    </>
  );
}
