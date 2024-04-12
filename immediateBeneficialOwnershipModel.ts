export interface ImmediateBeneficialOwnership {
  EntityID: EntityID;
  LEI: string;
  NameBusiness: string;
  Legalform: LegalForm;
  ImmediateOwners: ImmediateOwner | ImmediateOwner[];
}

export type EntityID = string;

type LegalForm =
  | "besloten vennootschap"
  | "naamloze nennootschap"
  | "limited liability company"
  | "maatschap"
  | "vof"
  | "cooperatie"
  | "stichting"
  | "vereniging"
  | "kerkgenootschap";

type ImmediateOwner = {
  ImmediateOwnerID: string;
  isControllingOwner: boolean;
  relationsWithEntity: Relation | Relation[];
};

export type Relation = {
  relationID: string;
  relationType: RelationType;
  particpation: number | undefined;
  documents: SupportingDocument | SupportingDocument[] | null;
};

export type RelationType =
  | "shareholdingVoting"
  | "shareholdingNonVoting"
  | "preferenceShares"
  | "to_be_completed";

type SupportingDocument = {
  documentType: SupportingDocumentType | undefined;
  documentName: string | undefined;
  documentDate: string | undefined;
  documentParties?: string[];
  documentAbstract?: string;
  ref: string;
  hash: string;
};

type SupportingDocumentType =
  | "ubo-form"
  | "chamber of commerce extract"
  | "corporate structure chart"
  | "shareholder register"
  | "register of certificate holders"
  | "register of members"
  | "register of participants"
  | "shareholders agreement"
  | "share purchase agreement"
  | "share transfer deed"
  | "merger deed"
  | "demerger deed"
  | "share pledge agreement"
  | "share pledge deed"
  | "partnership agreement"
  | "limited partnership agreement"
  | "association agreement"
  | "membership agreement"
  | "fund for joint account agreement"
  | "articles of association "
  | "trust office (Stak) articles of assocation"
  | "administration conditions (administratievoorwaarden)"
  | "certificate conditions (certificaatvoorwaarden)"
  | "trust deed"
  | "letter of wishes";
