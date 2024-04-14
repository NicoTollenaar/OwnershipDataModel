import { ImmediateOwnershipVC } from "./immediateOwner";
import { UltimateBeneficialOwner } from "./ultimateBeneficialOwner";

export type OwnershipVC = ImmediateOwnershipVC & {
  ultimateBeneficialOwners: UltimateBeneficialOwner[];
};

export interface BasicEntityInfo {
  did: string;
  LEI: string;
  businessName: string;
  legalForm: LegalForm;
}

interface LegalForm {
  nationalType: NationalLegalEntityType; // legal form in local national terminology
  LEI_term: LEI_legalFormGlossary;
}

type NationalLegalEntityType =
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

type LEI_legalFormGlossary = string; // still to be imported
