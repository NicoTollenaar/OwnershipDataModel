interface OwnershipStructure {
  EntityID: string;
  LEI: string;
  NameBusiness: string;
  Legalform: LegalForm;
  ImmediateOwners: Owner[];
}

type Owner = {
  OwnerID: string;
  UBO: boolean;
  relations: Relation[];
}

type Relation = {
  relationID: string;
  relationType: RelationType;
  particpation: number;
  documents: SupportingDocument[];
}

type SupportingDocument = {
  ref: string;
  hash: string;
}

type LegalForm = "Besloten Vennootschap" | "Naamloze Vennootschap" | "Limited Liability Company" | "Maatschap" |"VOF" | "Cooperatie" | "Stichting" | "Vereniging";

type RelationType =
  | "shareholdingVoting"
  | "shareholdingNonVoting"
  | "preferenceShares";


const ryanBV: OwnershipStructure = {
  EntityID: "ryansSecretId",
  Legalform: "Besloten Vennootschap",
  LEI: "49-34rfw-d",
  NameBusiness: "Ryan's Pizzeria",
  ImmediateOwners: [
    {
      OwnerID: "RyanHoldingID",
      UBO: true;
      relations: [
        {
          relationID: "shareholdingID",
          relationType: "shareholdingVoting",
          particpation: 100,
          documents: [
            {
              ref: "aandeelhoudersregister-xyz",
              hash: "2409r5uwefpjfwe"
            }
          ]
        }
      ]
    }
  ]
}  