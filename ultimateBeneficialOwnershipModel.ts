interface UltimateBeneficialOwnership {
  uboID: string;
  firstNames: string | string[];
  lastName: string;
  isPEP: boolean;
  identityDocument: IdentityDocument;
  UboType: UboType;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
  };
  ownershipChain: [];
}

type UboType = "UBO" | "pseudo-UBO";

type IdentityDocument = PaperID | VerifiableCredentialID;

type VerifiableCredentialID = Record<string, any>;

type PaperID = {
  documentType: IdentityDocumentType;
  documentNumber: string;
  issueDate: Date;
  expiryDate: Date;
  ref: string;
  hash: string;
};

type IdentityDocumentType =
  | "passport"
  | "drivers license"
  | "identity card"
  | "other";
