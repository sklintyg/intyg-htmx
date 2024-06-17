import { Certificate } from "../types/certificate.types.ts";
import { CertificateDataElement } from "../types/certificateElement.types.ts";

export interface StructuredCertificateData extends CertificateDataElement {
  children: StructuredCertificateData[];
}

function getStructure(elements: CertificateDataElement[]) {
  return (element: CertificateDataElement): StructuredCertificateData => ({
    ...element,
    children: getChildren(elements, element),
  });
}

function getChildren(
  elements: CertificateDataElement[],
  parent: CertificateDataElement
): StructuredCertificateData[] {
  return elements
    .filter((el) => el.parent === parent.id)
    .map(getStructure(elements));
}

export function structureCertificate({ data }: Certificate) {
  const elements = Object.values(data).sort((a, b) => a.index - b.index);

  return elements
    .filter(({ parent }) => parent == undefined)
    .map(getStructure(elements));
}
