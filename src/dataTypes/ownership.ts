import { ImmediateOwner, ImmediateOwnershipVC } from "./immediateOwner";
import { UltimateBeneficialOwner } from "./ultimateBeneficialOwner";

export type OwnershipVC = ImmediateOwnershipVC & {
  ultimateBeneficialOwners: UltimateBeneficialOwner[];
};

export interface BasicEntityInfo {
  entityId: string; // could be "did"
  LEI: string;
  businessName: string;
  legalForm: LegalForm;
}

type LegalForm =
  | "besloten vennootschap"
  | "naamloze nennootschap"
  | "limited liability company"
  | "maatschap"
  | "vof"
  | "cooperatie"
  | "stichting"
  | "vereniging"
  | "kerkgenootschap"
  | "waterschap"
  | "zelfstandig bestuursorgaan"
  | "gemeente"
  | "provincie"
  | "staat";
