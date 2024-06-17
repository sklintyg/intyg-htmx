import {
  CertificateDataValueType,
  ValueType,
} from "../types/certificateElement.types.ts";
import { getFieldValuePair } from "./getFieldValuePair.ts";

export const getKeyValuePair = (value: ValueType): Record<string, unknown> => {
  return Object.entries(getFieldValuePair(value)).reduce(
    (result, [field, value]) => {
      switch (value.type) {
        case CertificateDataValueType.BOOLEAN:
          return { ...result, [field]: Boolean(value.selected) };
        case CertificateDataValueType.CODE:
          return { ...result, [field]: value.code };
        case CertificateDataValueType.DATE:
          return { ...result, [field]: value.date };
        case CertificateDataValueType.YEAR:
          return { ...result, [field]: value.year };
        case CertificateDataValueType.INTEGER:
          return { ...result, [field]: value.value };
        case CertificateDataValueType.DATE_RANGE:
          return {
            ...result,
            [field]: { from: value.from, to: value.to },
          };
        case CertificateDataValueType.UNCERTAIN_DATE:
          return { ...result, [field]: value.value };
        case CertificateDataValueType.DIAGNOSIS:
          return { ...result, [field]: value.code };
        case CertificateDataValueType.ICF:
        case CertificateDataValueType.TEXT:
          return { ...result, [field]: value.text };
        case CertificateDataValueType.DOUBLE:
          return { ...result, [field]: value.value };
      }
      return result;
    },
    {}
  );
};
