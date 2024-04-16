import { ImmediateOwnershipVC } from "./immediateOwnership";
import { UltimateBeneficialOwner } from "./ultimateBeneficialOwner";

// customer entity uses this datastructure which extends the ImmediateOwnershipVC and includes the UBO information
// the UBO information can be automatically generated with the script getUBOs()

export interface ImmediateAndUltimateOwnershipVC extends ImmediateOwnershipVC {
  ultimateBeneficialOwners: UltimateBeneficialOwner[];
}
