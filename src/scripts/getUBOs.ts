// getUboChains(entityId) gets the ultimate beneficial owners of the entity with id entityId on the basis
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

function getUboChains(entityId: string): UboChains {
  let entities: (OwnershipVC | ImmediateOwnershipVC)[] = getOwnershipVCs([
    entityId,
  ]);

  let uboChains: {
    [key: string]: string[];
  } = {};

  const controllingOwners: ImmediateOwner[] =
    entities[0].immediateOwners.filter(
      (e: ImmediateOwner) => e.isControllingOwner
    );

  controllingOwners.forEach((controllingOwner: ImmediateOwner) => {
    uboChains[controllingOwner.entityId] = [entities[0].entity.entityId];
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
        uboChains[controllingOwner.entityId] = [
          ...uboChains[entity.entity.entityId],
          entity.entity.entityId,
        ];
      });
      delete uboChains[entity.entity.entityId];
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

  const allControllingLegalEntityIds: string[] = allImmediateOwners
    .filter((owner: ImmediateOwner) => owner.isControllingOwner)
    .filter(
      (controllingOwner: ImmediateOwner) => !controllingOwner.isNaturalPerson
    )
    .map(
      (controllingLegalEntityOwner: ImmediateOwner) =>
        controllingLegalEntityOwner.entityId
    );

  if (allControllingLegalEntityIds.length === 0) return [];

  return getOwnershipVCs(allControllingLegalEntityIds);
}
function getOwnershipVCs(
  entityIds: string[]
): (OwnershipVC | ImmediateOwnershipVC)[] {
  const entityVCs: (OwnershipVC | ImmediateOwnershipVC | undefined)[] =
    entityIds.map((entityId: string) => {
      const VC = entityDiscovery.find(
        (discoverableEntity: OwnershipVC | ImmediateOwnershipVC) =>
          discoverableEntity.entity.entityId === entityId
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
const uboChains: UboChains = getUboChains("1");
const uboChainsPopulated: UboChainsPopulated = getUboChainsPopulated(uboChains);

console.log("uboChains:", uboChains);
console.log("uboChainsPopulated:", uboChainsPopulated);
