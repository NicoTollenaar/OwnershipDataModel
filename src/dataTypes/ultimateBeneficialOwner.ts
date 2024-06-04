// the ownershipChain is an array of OwnershipVCs of all intermediate entities
// starting from the bottom with the target entity
// (the first element in the array) and then
// moving all the way up the corporate chain to this entity immediately
// beneath the respective UBO or pseudo-UBO (this entity being the last element in the array)

import { ImmediateAndUltimateOwnershipVC } from "./immediateAndUltimateOwnership";
import { ImmediateOwnershipVC } from "./immediateOwnership";
import { NaturalPerson } from "./naturalPerson";

export interface UltimateBeneficialOwner extends NaturalPerson {
  isPEP: boolean;
  uboType: UboType;
  ownershipChain: (ImmediateAndUltimateOwnershipVC | ImmediateOwnershipVC)[];
}

export interface UltimateBeneficialOwnerVC extends UltimateBeneficialOwner {
  [key: string]: any;
}

type UboType =
  | "shareholder (non-voting)"
  | "shareholder (voting)"
  | "natural person with ultimate control via other means"
  | "senior Management Official (SMO)"
  | "settlor"
  | "trustee"
  | "protector"
  | "beneficiary";
