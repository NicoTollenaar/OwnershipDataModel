export interface NaturalPerson {
  did: string;
  firstNames: string | string[];
  lastName: string;
  identityDocument: IdentityDocument;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

type IdentityDocument = PaperID | VerifiableCredentialID<{ id: string }>;

// to be expanded and improved
export type PaperID = {
  documentType: IdentityDocumentType;
  documentNumber: string;
  issueDate: string; // date string in ISO 8601 format (YYYY-MM-DD)
  expiryDate: string; // date string in ISO 8601 format (YYYY-MM-DD)
  ref: string;
  hash: string;
};

// to be expanded and improved
type IdentityDocumentType = "passport" | "driver's license" | "identity card";

// temporary random object with at least one defined property
type VerifiableCredentialID<T extends { [key: string]: any }> = {
  [P in keyof T]: T[P];
} & {
  [key: string]: any;
};
