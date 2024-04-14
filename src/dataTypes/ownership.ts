import { ImmediateOwnershipVC } from "./immediateOwner";
import { UltimateBeneficialOwner } from "./ultimateBeneficialOwner";

// customer entity uses this datastructure which extends the ImmediateOwnershipVC and includes the UBO information
// the UBO information can be automatically generated with the script getUBOs()

export interface OwnershipVC extends ImmediateOwnershipVC {
  ultimateBeneficialOwners: UltimateBeneficialOwner[];
}