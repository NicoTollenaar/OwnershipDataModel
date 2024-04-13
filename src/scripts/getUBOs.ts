import { OpCo_OwnershipVC, dataBaseOfEntityVCs } from "../examples/example1";
import { OwnershipVC } from "../dataTypes/ultimateBeneficialOwner";
import {
  ImmediateOwner,
  ImmediateOwnershipVC,
} from "../dataTypes/immediateOwner";

// gets the ultimate beneficial owners of an entity on the basis of (only) the
// immediate ownership of each of the intermediate entities

function getUBOs(
  entityOwnershipVC: OwnershipVC | ImmediateOwnershipVC
) /*add return type*/ {
  let entities: (OwnershipVC | ImmediateOwnershipVC | undefined)[] = [
    entityOwnershipVC,
  ];
  let controllingEntities = entityOwnershipVC.immediateOwners.filter(
    (owner: ImmediateOwner) => owner.isControllingOwner
  );

  // let controllingLegalEntities = controllingEntities.filter(
  //   (owner: ImmediateOwner) => !owner.isNaturalPerson
  // );

  let uboChains: any = {}; // revisit type of Ubochains later
  controllingEntities.forEach((controllingEntity: ImmediateOwner) => {
    uboChains[controllingEntity.entityId] = [entityOwnershipVC.entity.entityId];
  });
  console.log("uboChains:", uboChains);

  let controllingLegalEntitiesNextLayer: (
    | OwnershipVC
    | ImmediateOwnershipVC
    | undefined
  )[] = getControllingLegalEntitiesNextLayer(controllingEntities);

  console.log("entities next layer:", controllingLegalEntitiesNextLayer);

  getUboChainsNextLayer(controllingLegalEntitiesNextLayer);
  function getUboChainsNextLayer(
    legalEntitiesNextLayer: OwnershipVC | ImmediateOwnershipVC[]
  ) {
    controllingEntities = controllingLegalEntitiesNextLayer.reduce(
      (acc, curr) => {
        let newControllingEntities: ImmediateOwner[] = [
          ...acc?.immediateOwners,
          ...curr?.immediateOwners,
        ];
        return newControllingEntities;
      }
    );
    console.log("controllingEntities next Layer:", controllingEntities);
  }
  entities?.forEach(
    (entity: OwnershipVC | ImmediateOwnershipVC | undefined) => {
      controllingEntities.forEach((controllingEntity: ImmediateOwner) => {
        uboChains[controllingEntity.entityId] = [
          ...uboChains[entity?.entityId],
          entity?.entityId,
        ];
        delete uboChains[entity?.entityId];
      });
    }
  );
  console.log("new uboChains:", uboChains);
}

function getControllingLegalEntitiesNextLayer(
  controllingEntities: ImmediateOwner[]
): (OwnershipVC | ImmediateOwnershipVC | undefined)[] {
  const controllingLegalEntities: ImmediateOwner[] = controllingEntities.filter(
    (owner: ImmediateOwner) => !owner.isNaturalPerson
  );
  const controllingLegalEntityVCs: (
    | OwnershipVC
    | ImmediateOwnershipVC
    | undefined
  )[] = getOwnershipVCs(controllingLegalEntities);
  return controllingLegalEntityVCs;
}

function getOwnershipVCs(
  controllingEntities: ImmediateOwner[]
): (OwnershipVC | ImmediateOwnershipVC | undefined)[] {
  console.log(
    "In getOwnershipVCs logging controllingEntities:",
    controllingEntities
  );
  console.log(
    "In getOwnershipVCs logging dataBaseOfEntityVCs:",
    dataBaseOfEntityVCs
  );
  const OwnershipVCs: (OwnershipVC | ImmediateOwnershipVC | undefined)[] =
    controllingEntities.map((controllingEntity: ImmediateOwner) => {
      const found = dataBaseOfEntityVCs.find(
        (dbEntity: OwnershipVC | ImmediateOwnershipVC) =>
          dbEntity.entity.entityId === controllingEntity.entityId
      );
      console.log("found:", found);
      return found;
    });
  console.log("OwnershipVCs:", OwnershipVCs);
  return OwnershipVCs;
}

getUBOs(OpCo_OwnershipVC);

// let uboChain
// let controllingEntitiesCurrentLayer
// controllingEntitiesCurrentLayer = entityVC.immediateOwners.filter(isControllingEntity)

// entities: any[] = [bottomMostentity]
// controllingEntities: any[] = bottomMostEntity.immediateCOwners.filter(controlling)

// runthroughlayer

// forEach entity{

// forEach controllingEntity

// getChainsForNextLayer()

// uboChainObject[controllingentityId] = [...uboChainObject[entityId]?, entityId]
// if !entity.isNateralPerson delete uboChainObject[entity]
// entities = sum of all controllingEntities (concat/reduce)
// legalEntities = entities.filter(!natural person)
// if length.legalEntities === 0; break
// getChainsForNextLayer(legalEntities)
