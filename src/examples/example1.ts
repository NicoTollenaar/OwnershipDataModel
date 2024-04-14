import { ImmediateOwnershipVC } from "../dataTypes/immediateOwner";
import {
  OwnershipVC,
  UltimateBeneficialOwner,
} from "../dataTypes/ultimateBeneficialOwner";

// ========== THE EXAMPLE BELOW ILLUSTRATES THE OWNERSHIP DATA MODEL IN THE WALLET OF THE CUSTOMER ENTITY ======

export const OpCo_OwnershipVC: OwnershipVC = {
  thisEntity: {
    did: "1",
    businessName: "OpCo",
    LEI: "LEI-code-1",
    legalForm: "besloten vennootschap",
  },
  immediateOwners: [
    {
      did: "2",
      isControllingOwner: true,
      isNaturalPerson: false,
      relationsWithTargetEntity: [
        {
          relationType: "shareholdingVoting",
          particpation: 50,
          supportingDocuments: {
            documentName: "shareholder register OpCo",
            documentDate: "2020-04-09",
            documentType: "shareholder register",
            ref: "uri-shareholder-register-opco",
            hash: "wef0ijpsdjf",
          },
        },
      ],
    },
    {
      did: "3",
      isControllingOwner: true,
      isNaturalPerson: false,
      relationsWithTargetEntity: {
        relationType: "shareholdingVoting",
        particpation: 50,
        supportingDocuments: [
          {
            documentName: "shareholder register OpCo",
            documentDate: "2020-04-09",
            documentType: "shareholder register",
            ref: "uri-shareholder-register-opco",
            hash: "wef0ijpsdjf",
          },
        ],
      },
    },
  ],
  ultimateBeneficialOwners: [],
};

//======================== END OF EXAMPLE ========================================================

const HoldCo1_OwnershipVC: OwnershipVC = {
  thisEntity: {
    did: "2",
    businessName: "HoldCo1",
    LEI: "LEI-code-2",
    legalForm: "besloten vennootschap",
  },
  immediateOwners: [
    {
      did: "4",
      isControllingOwner: true,
      isNaturalPerson: true,
      relationsWithTargetEntity: {
        relationType: "shareholdingVoting",
        particpation: 100,
        supportingDocuments: {
          documentName: "shareholder register HoldCo1",
          documentDate: "2020-04-09",
          documentType: "shareholder register",
          ref: "uri-shareholder-register-holdco1",
          hash: "wef0ijpsdjf",
        },
      },
    },
  ],
  ultimateBeneficialOwners: [],
};

const HoldCo2_OwnershipVC: OwnershipVC = {
  thisEntity: {
    did: "3",
    businessName: "HoldCo2",
    LEI: "LEI-code-3",
    legalForm: "besloten vennootschap",
  },
  immediateOwners: [
    {
      did: "5",
      isControllingOwner: true,
      isNaturalPerson: true,
      relationsWithTargetEntity: {
        relationType: "shareholdingVoting",
        particpation: 70,
        supportingDocuments: {
          documentName: "shareholder register HoldCo2",
          documentDate: "2020-04-09",
          documentType: "shareholder register",
          ref: "uri-shareholder-register-holdco2",
          hash: "wef0ijpsdjf",
        },
      },
    },
    {
      did: "6",
      isControllingOwner: true,
      isNaturalPerson: true,
      relationsWithTargetEntity: {
        relationType: "shareholdingVoting",
        particpation: 30,
        supportingDocuments: {
          documentName: "shareholder register HoldCo2",
          documentDate: "2020-04-09",
          documentType: "shareholder register",
          ref: "uri-shareholder-register-holdco2",
          hash: "wef0ijpsdjf",
        },
      },
    },
  ],
  ultimateBeneficialOwners: [],
};

export const ultimateBeneficialOwner1: UltimateBeneficialOwner = {
  uboID: "4",
  firstNames: "John",
  lastName: "Doe",
  isPEP: false,
  identityDocument: {
    documentNumber: "54850HDK9",
    documentType: "passport",
    issueDate: "1976-05-27",
    expiryDate: "2030-12-15",
    ref: "uri-copy-passport",
    hash: "sdfoijscpoiw",
  },
  uboType: "UBO",
  address: {
    street: "Ferdinand Bolstraat",
    houseNumber: "20",
    postalCode: "3525 TH",
    city: "Amsterdam",
    country: "Netherlands",
  },
  ownershipChain: [],
};
const ultimateBeneficialOwner2: UltimateBeneficialOwner = {
  uboID: "5",
  firstNames: "Jane",
  lastName: "Doe",
  isPEP: false,
  identityDocument: {
    documentNumber: "54850HDK9",
    documentType: "passport",
    issueDate: "1974-04-06",
    expiryDate: "2028-10-12",
    ref: "uri-copy-passport",
    hash: "sdfoijscpoiw",
  },
  uboType: "UBO",
  address: {
    street: "Ferdinand Bolstraat",
    houseNumber: "20",
    postalCode: "3525 TH",
    city: "Amsterdam",
    country: "Netherlands",
  },
  ownershipChain: [],
};

export const entityDiscovery: (OwnershipVC | ImmediateOwnershipVC)[] = [
  OpCo_OwnershipVC,
  HoldCo1_OwnershipVC,
  HoldCo2_OwnershipVC,
];
