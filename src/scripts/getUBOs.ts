// getUboChains(did) gets the ultimate beneficial owners of the entity with id did on the basis
// of (only) the immediate ownership of each of the intermediate entities

import { entityDiscovery } from "../examples/example1";
import { OwnershipVC } from "../dataTypes/ultimateBeneficialOwner";
import {
  ImmediateOwner,
  ImmediateOwnershipVC,
} from "../dataTypes/immediateOwner";

interface UboChains {
  [key: string]: string[];
}
interface UboChainsPopulated {
  [key: string]: (OwnershipVC | ImmediateOwnershipVC)[];
}

function getUboChains(did: string): UboChains | null {
  let entities: (OwnershipVC | ImmediateOwnershipVC)[] = getOwnershipVCs([did]);

  if (
    !entities[0] ||
    !("immediateOwners" in entities[0] || entities.length === 0)
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
    uboChains[controllingOwner.did] = [entities[0].entity.did];
  });

  getUboChainsNextLayer(entities);
  function getUboChainsNextLayer(
    entitiesCurrentLayer: (OwnershipVC | ImmediateOwnershipVC)[]
  ) {
    entities = getControllingLegalEntitiesNextLayer(entitiesCurrentLayer);
    if (entities.length === 0) return;

    entities.forEach((entity: OwnershipVC | ImmediateOwnershipVC) => {
      const controllingOwners: ImmediateOwner[] = entity.immediateOwners.filter(
        (e: ImmediateOwner) => e.isControllingOwner
      );

      controllingOwners.forEach((controllingOwner: ImmediateOwner) => {
        uboChains[controllingOwner.did] = [
          ...uboChains[entity.entity.did],
          entity.entity.did,
        ];
      });
      delete uboChains[entity.entity.did];
    });
    getUboChainsNextLayer(entities);
  }

  return uboChains;
}

function getControllingLegalEntitiesNextLayer(
  entities: (OwnershipVC | ImmediateOwnershipVC)[]
): (OwnershipVC | ImmediateOwnershipVC)[] {
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

  return getOwnershipVCs(allControllingLegalEntityDids);
}
function getOwnershipVCs(
  entityDids: string[]
): (OwnershipVC | ImmediateOwnershipVC)[] {
  const entityVCs: (OwnershipVC | ImmediateOwnershipVC | undefined)[] =
    entityDids.map((did: string) => {
      const VC = entityDiscovery.find(
        (discoverableEntity: OwnershipVC | ImmediateOwnershipVC) =>
          discoverableEntity.entity.did === did
      );
      return VC;
    });

  return entityVCs.filter(
    (e): e is OwnershipVC | ImmediateOwnershipVC => e !== undefined
  );
}

function getUboChainsPopulated(uboChain: {
  [key: string]: string[];
}): UboChainsPopulated {
  let uboChainsPopulated: UboChainsPopulated = {};
  for (let key in uboChain) {
    uboChainsPopulated[key] = getOwnershipVCs(uboChain[key]);
  }
  return uboChainsPopulated;
}
const uboChains: UboChains | null = getUboChains("1");
if (uboChains) {
  const uboChainsPopulated: UboChainsPopulated =
    getUboChainsPopulated(uboChains);
  console.log("uboChains:", uboChains);
  console.log("uboChainsPopulated:", uboChainsPopulated);
}
