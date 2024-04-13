// the ownershipChain is an array of OwnershipVCs of all intermediate entities
// starting from the bottom at the entity immediately above the target entity
// (this immediate parent being the first element in the array) and then
// moving all the way up the corporate chain to this entity immediately
// beneath the respective UBO or pseudo-UBO (this entity being the last element in the array)

import { Ownership } from "./ownership";

export interface UltimateBeneficialOwner {
  uboID: string;
  firstNames: string | string[];
  lastName: string;
  isPEP: boolean;
  identityDocument: IdentityDocument;
  uboType: UboType;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
  };
  ownershipChain: OwnershipVC[] | null;
}

export interface UltimateBeneficialOwnerVC extends UltimateBeneficialOwner {
  [key: string]: any;
}

type UboType = "UBO" | "pseudo-UBO";

type IdentityDocument = PaperID | VerifiableCredentialID<{ id: string }>;

export type PaperID = {
  documentType: IdentityDocumentType;
  documentNumber: string;
  issueDate: string; // date string in ISO 8601 format (YYYY-MM-DD)
  expiryDate: string; // date string in ISO 8601 format (YYYY-MM-DD)
  ref: string;
  hash: string;
};

type IdentityDocumentType = "passport" | "driver's license" | "identity card";

type VerifiableCredentialID<T extends { [key: string]: any }> = {
  [P in keyof T]: T[P];
} & {
  [key: string]: any;
};

export interface OwnershipVC extends Ownership {
  [key: string]: any;
}
