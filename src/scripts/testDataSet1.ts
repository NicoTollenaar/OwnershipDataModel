import { ImmediateOwnershipVC } from "../dataTypes/immediateOwner";
import { OwnershipVC } from "../dataTypes/ownership";
import { UltimateBeneficialOwner } from "../dataTypes/ultimateBeneficialOwner";

// ========== THE EXAMPLE BELOW ILLUSTRATES THE OWNERSHIP DATA MODEL IN THE WALLET OF THE CUSTOMER ENTITY ======

export const OpCo_OwnershipVC: OwnershipVC = {
  thisEntity: {
    did: "did:web:opco.com",
    businessName: "OpCo",
    LEI: "LEI-code-1",
    legalForm: {
      transliteratedName:
        "besloten vennootschap met beperkte aansprakelijkheid",
      ELF_code: "54M6",
    },
  },
  immediateOwners: [
    {
      did: "did:web:holdco1.com",
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
            hash: "7f693c73002cb8d0240f825adfe9bab72603090afdc9e539568c3f3ee9722e8c",
          },
        },
      ],
    },
    {
      did: "did:web:holdco2.com",
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
            hash: "7f693c73002cb8d0240f825adfe9bab72603090afdc9e539568c3f3ee9722e8c",
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
    did: "did:web:holdco1.com",
    businessName: "HoldCo1",
    LEI: "LEI-code-2",
    legalForm: {
      transliteratedName:
        "besloten vennootschap met beperkte aansprakelijkheid",
      ELF_code: "54M6",
    },
  },
  immediateOwners: [
    {
      did: "did:web:johndoe",
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
          hash: "81e7226d3695251bdd5d26220d0ba13f78ceccad72194eaa6340f7463b5e15df",
        },
      },
    },
  ],
  ultimateBeneficialOwners: [],
};

const HoldCo2_OwnershipVC: OwnershipVC = {
  thisEntity: {
    did: "did:web:holdco2.com",
    businessName: "HoldCo2",
    LEI: "LEI-code-3",
    legalForm: {
      transliteratedName:
        "besloten vennootschap met beperkte aansprakelijkheid",
      ELF_code: "54M6",
    },
  },
  immediateOwners: [
    {
      did: "did:web:janedoe.com",
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
          hash: "0c046427c7d8583d73c2bd8842f27761c54427dc96bf981d1366173279e21dfd",
        },
      },
    },
    {
      did: "did:web:marydoe.com",
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
          hash: "0c046427c7d8583d73c2bd8842f27761c54427dc96bf981d1366173279e21dfd",
        },
      },
    },
  ],
  ultimateBeneficialOwners: [],
};

export const ultimateBeneficialOwner1: UltimateBeneficialOwner = {
  did: "did:web:johndoe.com",
  firstNames: "John",
  lastName: "Doe",
  isPEP: false,
  identityDocument: {
    documentNumber: "54850HDK9",
    documentType: "passport",
    issueDate: "1976-05-27",
    expiryDate: "2030-12-15",
    ref: "uri-copy-passport",
    hash: "7bca49fa22181ff7a89b08d4ec01c4880593b47764c38b225f6e4f05321ed3e8",
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
  did: "did:web:janedoe.com",
  firstNames: "Jane",
  lastName: "Doe",
  isPEP: false,
  identityDocument: {
    documentNumber: "77850HTY5",
    documentType: "passport",
    issueDate: "1974-04-06",
    expiryDate: "2028-10-12",
    ref: "uri-copy-passport-jane-doe",
    hash: "a1b6776f98e855360faf2e04717c6ae3ec6ccae394489befd954fff4c0a5db53",
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

const ultimateBeneficialOwner3: UltimateBeneficialOwner = {
  did: "did:web:marydoe.com",
  firstNames: "Mary",
  lastName: "Doe",
  isPEP: false,
  identityDocument: {
    documentNumber: "272850HGL3",
    documentType: "passport",
    issueDate: "1974-04-06",
    expiryDate: "2028-10-10",
    ref: "uri-copy-passport-mary-doe",
    hash: "2bbd123a9b596ef551f94c6206650b38710952edd801edeb3db7160d65cebe56",
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
