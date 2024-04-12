import { ImmediateBeneficialOwnership } from "../immediateBeneficialOwnershipModel";

const ryanBV: ImmediateBeneficialOwnership = {
  EntityID: "ryansSecretId",
  Legalform: "besloten vennootschap",
  LEI: "49-34rfw-d",
  NameBusiness: "Ryan's Pizzeria",
  ImmediateOwners: [
    {
      ImmediateOwnerID: "RyanHoldingID",
      isControllingOwner: true,
      relationsWithEntity: [
        {
          relationID: "shareholdingID",
          relationType: "shareholdingVoting",
          particpation: 100,
          documents: [
            {
              documentType: "shareholder register",

              ref: "aandeelhoudersregister-xyz",
              hash: "2409r5uwefpjfwe",
            },
          ],
        },
      ],
    },
  ],
};
