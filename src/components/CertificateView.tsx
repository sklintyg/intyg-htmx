import { Certificate, CertificateData } from "../types/certificate.types.ts";
import { getKeyValuePair } from "../util/getKeyValuePair.ts";
import { structureCertificate } from "../util/structureCertificate.ts";
import { CertificateElement } from "./CertificateElement.tsx";

function getCertificateState(data: CertificateData) {
  const entries = Object.entries(data).map(([id, { value }]) => [
    id,
    value && getKeyValuePair(value),
  ]);
  return JSON.stringify(Object.fromEntries(entries));
}

export function CertificateView({
  certificate: { data, metadata, links },
}: {
  certificate: Certificate;
}) {
  const structuredData = structureCertificate({ data, metadata, links });
  return (
    <form
      id="certificate"
      class="max-w-screen-lg px-2 py-4 m-auto"
      x-data={`certificate(${getCertificateState(data)})`}
      x-on:submit="showValidation = true"
      hx-post="/sign"
      hx-target="this"
      hx-ext="alpine-morph"
      hx-swap="morph"
      hx-disabled-elt="#sign-certificate"
      un-cloak
    >
      <div class="mb-4">
        <h1 class="ids-heading-1">{metadata.name}</h1>
      </div>
      {structuredData.map((element, index) => (
        <CertificateElement key={element.id} element={element} index={index} />
      ))}
      <button id="sign-certificate" type="submit" class="ids-button">
        Signera
      </button>
      {/* <ids-button type="submit">Signera</ids-button> */}
    </form>
  );
}
