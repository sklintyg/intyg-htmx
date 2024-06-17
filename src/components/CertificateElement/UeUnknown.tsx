import {
  CertificateDataConfigType,
  ValueType,
} from "../../types/certificateElement.types.ts";

export function UeUnknown({
  config,
  value,
}: {
  config: CertificateDataConfigType;
  value: ValueType | null;
}) {
  return (
    <div class="bg-slate-800 text-red-400 p-2 rounded">
      <span class="font-bold">UNKNOWN:</span> {config.type} / {value?.type}
    </div>
  );
}
