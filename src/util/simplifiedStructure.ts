import {
  CertificateDataElement,
  ConfigTypes,
} from "../types/certificateElement.types.ts";
import {
  CertificateDataValidation,
  CertificateDataValidationType,
  TextValidation,
} from "../types/certificateValidation.types.ts";

enum FieldElementType {
  CHECKBOX = "CHECKBOX",
  RADIO = "RADIO",
  TEXT = "TEXT",
  DATE = "DATE",
  DATE_RANGE = "DATE_RANGE",
  TEXTAREA = "TEXTAREA",
  DROPDOWN = "DROPDOWN",
  CATEGORY = "CATEGORY",
}

type FieldElementBase = {
  id: string;
  label: string;
  disabled?: string;
};

interface CategoryElement extends FieldElementBase {
  type: FieldElementType.CATEGORY;
  description: string;
}

interface CheckboxElement extends FieldElementBase {
  type: FieldElementType.CHECKBOX;
}

interface DateFieldElement extends FieldElementBase {
  type: FieldElementType.DATE;
  min?: string;
  max?: string;
  uncertain: boolean;
}

interface DateRangeElement extends FieldElementBase {
  type: FieldElementType.DATE_RANGE;
  min?: string;
  max?: string;
}

interface DropdownElement extends FieldElementBase {
  type: FieldElementType.DROPDOWN;
  options: { value: string; label: string }[];
}

interface RadioElement extends FieldElementBase {
  type: FieldElementType.RADIO;
}

interface TextAreaElement extends FieldElementBase {
  type: FieldElementType.TEXTAREA;
  limit?: number;
}

interface TextElement extends FieldElementBase {
  type: FieldElementType.TEXT;
}

type FieldElement =
  | CategoryElement
  | CheckboxElement
  | DateFieldElement
  | DateRangeElement
  | DropdownElement
  | RadioElement
  | TextAreaElement
  | TextElement;

type Field = {
  id: string;
  elements: FieldElement[];
};

function getTextAreaLimit(validations: CertificateDataValidation[]) {
  const rule = validations.find(
    (rule): rule is TextValidation =>
      rule.type === CertificateDataValidationType.TEXT_VALIDATION
  );
  return rule ? rule?.limit : undefined;
}

export function convertCertificateDataElement({
  id,
  config,
  validation,
}: CertificateDataElement): Field[] {
  switch (config.type) {
    case ConfigTypes.CATEGORY:
      return [
        {
          id,
          elements: [
            {
              type: FieldElementType.CATEGORY,
              id: id,
              label: config.text,
              description: config.description,
            },
          ],
        },
      ];
    case ConfigTypes.UE_CHECKBOX_BOOLEAN:
      return [
        {
          id,
          elements: [
            {
              type: FieldElementType.CHECKBOX,
              id: config.id,
              label: config.label,
            },
          ],
        },
      ];
    case ConfigTypes.UE_CHECKBOX_MULTIPLE_DATE:
      return config.list.map((item) => ({
        id,
        elements: [
          {
            type: FieldElementType.CHECKBOX,
            id: `${item.id}.selected`,
            label: item.label,
          },
          {
            type: FieldElementType.DATE,
            id: `${item.id}.date`,
            label: "",
            min: item.minDate,
            max: item.maxDate,
            disabled: `${item.id}.selected`,
            uncertain: false,
          },
        ],
      }));
    // case ConfigTypes.CATEGORY:
    // case ConfigTypes.UE_CHECKBOX_DATE:
    case ConfigTypes.UE_CHECKBOX_MULTIPLE_CODE:
      return config.list.map((item) => ({
        id,
        elements: [
          { type: FieldElementType.CHECKBOX, id: item.id, label: item.label },
        ],
      }));
    // case ConfigTypes.UE_CHECKBOX_MULTIPLE_DATE_RANGE:
    // case ConfigTypes.UE_DATE:
    // case ConfigTypes.UE_DATE_RANGE:
    // case ConfigTypes.UE_DIAGNOSES:
    case ConfigTypes.UE_DROPDOWN:
      return [
        {
          id,
          elements: [
            {
              type: FieldElementType.DROPDOWN,
              id,
              label: config.label ?? "",
              options: config.list.map((option) => ({
                value: option.id,
                label: option.label,
              })),
            },
          ],
        },
      ];
    // case ConfigTypes.UE_RADIO_BOOLEAN:
    // case ConfigTypes.UE_RADIO_CODE:
    // case ConfigTypes.UE_RADIO_MULTIPLE_CODE:
    // case ConfigTypes.UE_RADIO_MULTIPLE_CODE_OPTIONAL_DROPDOWN:
    case ConfigTypes.UE_SICK_LEAVE_PERIOD:
      return config.list.map((item) => ({
        id,
        elements: [
          {
            type: FieldElementType.CHECKBOX,
            id: `${item.id}.selected`,
            label: item.label,
          },
          {
            type: FieldElementType.DATE_RANGE,
            id: `${item.id}.date`,
            label: "",
            disabled: `${item.id}.selected`,
          },
        ],
      }));
    case ConfigTypes.UE_TEXTAREA:
      return [
        {
          id,
          elements: [
            {
              type: FieldElementType.TEXTAREA,
              id: config.id,
              label: config.label ?? "",
              limit: getTextAreaLimit(validation),
            },
          ],
        },
      ];
    case ConfigTypes.UE_ICF:
    case ConfigTypes.UE_UNCERTAIN_DATE:
    case ConfigTypes.UE_TEXTFIELD:
    case ConfigTypes.UE_TYPE_AHEAD:
    case ConfigTypes.UE_MESSAGE:
    case ConfigTypes.UE_HEADER:
    case ConfigTypes.UE_MEDICAL_INVESTIGATION:
    case ConfigTypes.UE_CAUSE_OF_DEATH:
    case ConfigTypes.UE_CAUSE_OF_DEATH_LIST:
    case ConfigTypes.UE_VISUAL_ACUITY:
    case ConfigTypes.UE_VIEW_TEXT:
    case ConfigTypes.UE_VIEW_LIST:
    case ConfigTypes.UE_VIEW_TABLE:
    case ConfigTypes.UE_YEAR:
    case ConfigTypes.UE_INTEGER:
      return [{ id, elements: [] }];
  }

  return [{ id, elements: [] }];
}
