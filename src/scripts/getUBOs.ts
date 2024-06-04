// getUboChains(did) gets the ultimate beneficial owners of the entity with id did on the basis
// of (only) the immediate ownership of each of the intermediate entities
import fs from "fs";
import {
  HoldCo2,
  JohnDoe,
  MaryDoe,
  OpCo,
  entityDiscovery,
} from "./testDataSet1";
import {
  ImmediateOwner,
  ImmediateOwnershipVC,
} from "../dataTypes/immediateOwnership";
import { ImmediateAndUltimateOwnershipVC } from "../dataTypes/immediateAndUltimateOwnership";
import { UltimateBeneficialOwner } from "../dataTypes/ultimateBeneficialOwner";
import { NaturalPerson } from "../dataTypes/naturalPerson";

interface UboChains {
  [key: string]: string[];
}
interface UboChainsPopulated {
  [key: string]: (ImmediateAndUltimateOwnershipVC | ImmediateOwnershipVC)[];
}

function getUboChains(did: string): UboChains | null {
  let entities: (ImmediateAndUltimateOwnershipVC | ImmediateOwnershipVC)[] =
    getVCs([did]) as (ImmediateAndUltimateOwnershipVC | ImmediateOwnershipVC)[];

  if (
    !entities[0] ||
    !("immediateOwners" in entities[0]) ||
    entities.length === 0
  ) {
    console.log(
      "The id that you entered belongs to a natural person or is unknown"
    );
    return null;
  }
  let uboChains: {
    [key: string]: string[];
  } = {};

  const controllingOwners: ImmediateOwner[] =
    entities[0].immediateOwners.filter(
      (e: ImmediateOwner) => e.isControllingOwner
    );

  controllingOwners.forEach((controllingOwner: ImmediateOwner) => {
    uboChains[controllingOwner.did] = [entities[0].thisEntity.did];
  });

  getUboChainsNextLayer(entities);
  function getUboChainsNextLayer(
    entitiesCurrentLayer: (
      | ImmediateAndUltimateOwnershipVC
      | ImmediateOwnershipVC
    )[]
  ) {
    entities = getControllingLegalEntitiesNextLayer(entitiesCurrentLayer);
    if (entities.length === 0) return;

    entities.forEach(
      (entity: ImmediateAndUltimateOwnershipVC | ImmediateOwnershipVC) => {
        const controllingOwners: ImmediateOwner[] =
          entity.immediateOwners.filter(
            (e: ImmediateOwner) => e.isControllingOwner
          );

        controllingOwners.forEach((controllingOwner: ImmediateOwner) => {
          uboChains[controllingOwner.did] = [
            ...uboChains[entity.thisEntity.did],
            entity.thisEntity.did,
          ];
        });
        delete uboChains[entity.thisEntity.did];
      }
    );
    getUboChainsNextLayer(entities);
  }

  return uboChains;
}

function getControllingLegalEntitiesNextLayer(
  entities: (ImmediateAndUltimateOwnershipVC | ImmediateOwnershipVC)[]
): (ImmediateAndUltimateOwnershipVC | ImmediateOwnershipVC)[] {
  const allImmediateOwners: ImmediateOwner[] = entities.reduce(
    (acc: ImmediateOwner[], curr) => {
      let allImmediateOwnerIds: ImmediateOwner[] = [
        ...acc,
        ...curr?.immediateOwners,
      ];
      return allImmediateOwnerIds;
    },
    []
  );

  const allControllingLegalEntityDids: string[] = allImmediateOwners
    .filter((owner: ImmediateOwner) => owner.isControllingOwner)
    .filter(
      (controllingOwner: ImmediateOwner) => !controllingOwner.isNaturalPerson
    )
    .map(
      (controllingLegalEntityOwner: ImmediateOwner) =>
        controllingLegalEntityOwner.did
    );

  if (allControllingLegalEntityDids.length === 0) return [];

  return getVCs(allControllingLegalEntityDids) as (
    | ImmediateAndUltimateOwnershipVC
    | ImmediateOwnershipVC
  )[];
}

function getVCs(
  dids: string[]
): (ImmediateAndUltimateOwnershipVC | ImmediateOwnershipVC | NaturalPerson)[] {
  const entityVCs: (
    | ImmediateAndUltimateOwnershipVC
    | ImmediateOwnershipVC
    | undefined
    | NaturalPerson
  )[] = dids.map((did: string) => {
    const VC = entityDiscovery.find(
      (
        discoverableEntity:
          | ImmediateAndUltimateOwnershipVC
          | ImmediateOwnershipVC
          | NaturalPerson
      ) => {
        if ("thisEntity" in discoverableEntity)
          return discoverableEntity.thisEntity.did === did;
        return discoverableEntity.did === did;
      }
    );
    return VC;
  });

  return entityVCs.filter(
    (
      e
    ): e is
      | ImmediateAndUltimateOwnershipVC
      | ImmediateOwnershipVC
      | UltimateBeneficialOwner => e !== undefined
  );
}

function getUboChainsPopulated(uboChain: {
  [key: string]: string[];
}): UboChainsPopulated {
  let uboChainsPopulated: UboChainsPopulated = {};
  for (let key in uboChain) {
    uboChainsPopulated[key] = getVCs(uboChain[key]) as (
      | ImmediateAndUltimateOwnershipVC
      | ImmediateOwnershipVC
    )[];
  }
  fs.writeFileSync(
    "./src/scripts/outputUboChainDids.json",
    JSON.stringify(uboChains, null, 2),
    "utf-8"
  );

  return uboChainsPopulated;
}

function getUBOs(
  uboChainsPopulated: UboChainsPopulated
): UltimateBeneficialOwner[] {
  let uboArray: UltimateBeneficialOwner[] = [];
  for (let key in uboChainsPopulated) {
    let [uboOriginal]: UltimateBeneficialOwner[] = getVCs([
      key,
    ]) as UltimateBeneficialOwner[];
    let ubo = { ...uboOriginal };
    ubo["ownershipChain"] = uboChainsPopulated[key];
    ubo.isPEP = true;
    ubo.uboType = "shareholder (voting)";
    uboArray.push(ubo);
  }
  fs.writeFileSync(
    "./src/scripts/outputUBOsInFull.json",
    JSON.stringify(uboArray, null, 2),
    "utf-8"
  );
  return uboArray;
}

function writeJsonToFiles(uboArray: UltimateBeneficialOwner[]) {
  fs.writeFileSync(
    "./src/jsonExamples/naturalPerson.json",
    JSON.stringify(MaryDoe, null, 2),
    "utf-8"
  );
  fs.writeFileSync(
    "./src/jsonExamples/ImmediateOwnershipVC.json",
    JSON.stringify(HoldCo2, null, 2),
    "utf-8"
  );
  //  let immediateAndUltimateOwnershipVC: ImmediateAndUltimateOwnershipVC = OpCo;
  // OpCo.ultimateBeneficialOwners = uboArray;

  let OpCoUltimate: ImmediateAndUltimateOwnershipVC = {
    ...OpCo,
    ultimateBeneficialOwners: uboArray,
  };
  fs.writeFileSync(
    "./src/jsonExamples/ImmediateAndUltimateOwnershipVC.json",
    JSON.stringify(OpCoUltimate, null, 2),
    "utf-8"
  );
  fs.writeFileSync(
    "./src/jsonExamples/UltimateOwnerVC.json",
    JSON.stringify(uboArray[0], null, 2),
    "utf-8"
  );
}

// ========== LOG AND WRITE TO FILES =================================

const uboChains: UboChains | null = getUboChains("did:web:opco.com");
if (uboChains) {
  const uboChainsPopulated: UboChainsPopulated =
    getUboChainsPopulated(uboChains);
  const uboArray: UltimateBeneficialOwner[] = getUBOs(uboChainsPopulated);
  console.log("uboChains:", uboChains);
  console.log("uboArray:", uboArray);
  writeJsonToFiles(uboArray);
}
