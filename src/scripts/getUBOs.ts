import { ultimateBeneficialOwner1 } from "../examples/example1";
import { UltimateBeneficialOwner } from "../dataTypes/ultimateBeneficialOwner";

// gets the ultimate beneficial owners of an entity on the basis of (only) the
// immediate ownership of each of the intermediate entities

const targetEntityID = process.argv[2] || "";

function getUBOs(entityId: string): UltimateBeneficialOwner[] {
  console.log("getUBOs called!");

  return [ultimateBeneficialOwner1];
}

getUBOs(targetEntityID);
