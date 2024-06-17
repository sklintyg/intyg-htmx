import { h } from "preact";
import { CertificateDataConfigType } from "../types/certificateElement.types.ts";
import { Accordion } from "./Accordion.tsx";

export function CertificateElementHeader({
  id,
  config,
  level,
}: {
  id: string;
  config: CertificateDataConfigType;
  level: number;
}) {
  const headerProps = {
    children: config.text,
    class: `ids-heading-${level + 2}`,
    style:
      config.description != null
        ? { paddingBottom: "1rem" }
        : { marginBottom: "1rem" },
  };

  return config.description != null ? (
    <div class="mb-4">
      <Accordion header={h(`h${level + 2}`, headerProps)}>
        <div class="ids-content">
          <p
            dangerouslySetInnerHTML={{
              __html: config.description,
            }}
          />
        </div>
      </Accordion>
    </div>
  ) : (
    h(`h${level + 2}`, headerProps)
  );
}
