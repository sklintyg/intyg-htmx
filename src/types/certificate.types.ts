import { CertificateDataElement } from "./certificateElement.types.ts";
import { ValidationError } from "./certificateValidation.types.ts";
import { ResourceLink } from "./resourceLink.types.ts";

export interface Certificate {
  metadata: MetaData;
  data: CertificateData;
  links: ResourceLink[];
}

export type CertificateData = Record<string, CertificateDataElement>;

export enum CertificateStatus {
  UNSIGNED = "UNSIGNED",
  LOCKED = "LOCKED",
  SIGNED = "SIGNED",
  REVOKED = "REVOKED",
  LOCKED_REVOKED = "LOCKED_REVOKED",
}

export interface MetaData {
  id: string;
  type: string;
  typeVersion: string;
  typeName: string;
  name: string;
  description: string;
  created: string;
  status: CertificateStatus;
  testCertificate: boolean;
  forwarded: boolean;
  sent: boolean;
  sentTo: string;
  relations: Relations;
  unit: Unit;
  careUnit: CareUnit;
  careProvider: CareProvider;
  patient: Patient;
  issuedBy: IssuedBy;
  version: number;
  latestMajorVersion: boolean;
  recipient: Recipient;
  summary: Summary;
  validForSign: boolean;
  patientValidationErrors?: ValidationError[];
  careUnitValidationErrors?: ValidationError[];
}

export interface Relations {
  children: unknown[];
}

export interface Unit {
  unitId: string;
  unitName: string;
  address: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  email: string;
}

export interface CareUnit {
  unitId: string;
  unitName: string;
}

export interface CareProvider {
  unitId: string;
  unitName: string;
}

export interface Patient {
  personId: PersonId;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  coordinationNumber: boolean;
  testIndicated: boolean;
  protectedPerson: boolean;
  deceased: boolean;
  differentNameFromEHR: boolean;
  personIdChanged: boolean;
  reserveId: boolean;
  addressFromPU: boolean;
}

export interface PersonId {
  type: string;
  id: string;
}

export interface IssuedBy {
  personId: string;
  fullName: string;
}

export interface Recipient {
  id: string;
  name: string;
  sent: string;
}

export interface Summary {
  label: string;
  value: string;
}
