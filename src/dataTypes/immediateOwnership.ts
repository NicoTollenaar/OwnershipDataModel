// intermediate entities use either the ImmediateOwnership VC or the Ownership VC with UBO information

export interface ImmediateOwnershipVC {
  thisEntity: BasicEntityInfo;
  immediateOwners: ImmediateOwner[];
  [key: string]: any;
}

export interface BasicEntityInfo {
  did: string;
  LEI: string;
  businessName: string;
  legalForm: LegalForm;
  registeredAddress: {
    street?: string;
    houseNumber?: string;
    postalCode?: string;
    city?: string;
    country: string;
  };
}

interface LegalForm {
  transliteratedName: ELF_Netherlands | ELF_Rest_Of_World; // per ISO 01-140-10 as used by GLEIF in ELF list
  ELF_code: ELF_Code; // to be retrieved from the ISO 20275 Entity Form List maintained by GLEIF
}

type ELF_Netherlands =
  | "eenmanszaak"
  | "maatschap"
  | "vennootschap onder firma"
  | "commanditaire vennootschap"
  | "besloten vennootschap met beperkte aansprakelijkheid"
  | "naamloze vennootschap"
  | "stichting"
  | "vereniging"
  | "coöperatieve vereniging"
  | "onderlinge waarborgmaatschappij"
  | "Europees economisch samenwerkingsverband"
  | "Europese coöperatieve vennootschap"
  | "Europese naamloze vennootschap"
  | "kerkgenootschap"
  | "publiekrechtelijke rechtspersoon"
  | "rederij"
  | "overige privaatrechtelijke rechtspersoon"
  | "fonds voor gelijke behandeling"
  | "fonds voor collectieve belangen"
  | "samenwerkingsverband zonder rechtspersoonlijkheid"
  | "andere niet in de lijst opgenomen rechtsvorm";

// import ELF codes from the ISO 20275 Entity Legal Forms List at
// https://www.gleif.org/en/about-lei/code-lists/iso-20275-entity-legal-forms-code-list
type ELF_Rest_Of_World = string;

type ELF_Code = string;

export type ImmediateOwner = {
  did: string;
  isControllingOwner: boolean;
  isNaturalPerson: boolean;
  relationsWithTargetEntity: Relation | Relation[];
};

export type Relation = {
  relationType: RelationType;
  particpation: number | undefined; // meaning depends on relationType; to be worked out
  supportingDocuments: SupportingDocument | SupportingDocument[] | null;
};

// RelationshipTypes to be completed using appropriate taxonomies
// check and align with UBO-relationship terminology used by GLEIF
export type RelationType =
  | "shareholdingVoting"
  | "shareholdingNonVoting"
  | "preferenceShares"
  | "to_be_completed";

type SupportingDocument = {
  documentType: SupportingDocumentType | undefined;
  documentName: string | undefined;
  documentDate: string | undefined; // date string in ISO 8601 format ("YYYY-MM-DD");
  documentParties?: string[];
  documentAbstract?: string; // short summary of document
  ref: string;
  hash: string;
};

// to be expanded and improved using appropriate taxonomies
// check and align with UBO-relationship terminology used by GLEIF
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
