// the ownershipChain is an array of OwnershipVCs of all intermediate entities
// starting from the bottom with the target entity
// (the first element in the array) and then
// moving all the way up the corporate chain to this entity immediately
// beneath the respective UBO or pseudo-UBO (this entity being the last element in the array)

import { ImmediateOwnershipVC } from "./immediateOwner";
import { NaturalPerson } from "./naturalPerson";
import { OwnershipVC } from "./ownership";

export interface UltimateBeneficialOwner extends NaturalPerson {
  isPEP: boolean;
  uboType: UboType;
  ownershipChain: (OwnershipVC | ImmediateOwnershipVC)[];
}

type UboType = "UBO" | "pseudo-UBO";
