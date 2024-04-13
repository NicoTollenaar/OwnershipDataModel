export type ImmediateOwner = {
  entityID: string;
  isControllingOwner: boolean;
  isNaturalPerson: boolean; //true only if natural person holds the participation for itself rather than for another
  relationsWithTargetEntity: Relation | Relation[];
};

export type Relation = {
  relationType: RelationType;
  particpation: number | undefined; // meaning depends on relationType; to be worked out
  supportingDocuments: SupportingDocument | SupportingDocument[] | null;
};

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
