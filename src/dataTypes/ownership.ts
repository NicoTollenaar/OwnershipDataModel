import { ImmediateOwner } from "./immediateOwner";
import { UltimateBeneficialOwner } from "./ultimateBeneficialOwner";

export interface Ownership {
  entity: BasicEntityInfo;
  immediateOwners: ImmediateOwner | ImmediateOwner[];
  ultimateBeneficialOwners: UltimateBeneficialOwner | UltimateBeneficialOwner[];
}

export interface OwnershipVC extends Ownership {
  [key: string]: any;
}

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
