# Data Model Corporate Ownership

JSON data model for immediate and ultimate beneficial ownership

# DataTypes

The varias data types can be found in the folder "dataTypes". The datatypes have been defined in typescript.

ImmediateOwnershipVC contains: - basic information of the current entity - information about its immediate owners

ImmediateAndUltimanteOwnershipVC contains: - ImmediateOwnership information, AND - information about the ultimate beneficial owners

UltimateBeneficialOwner contains: - basic information about the ultimate beneficial owner (natural person), AND - the ownership chain,

Ownershipchain contains: - the ownership VCs of all corporate entities in which the ubo has a direct or indirect interest - the list starts at the bottom most entity in the chain and ends at the entity immediately beneath the ubo in the corporate structure

# Target Entity

The target entity must hold a credential of the type ImmediateAndUltimateOwnership, therefore including information on all ultimate owners

# Intermediate Entities

Intermediate entities must hold a credential at least of the type ImmediateOwnership. They may hold a credential of the type ImmediateAndUltimateOwnership, therefore including information about their respective ultimate beneficial owners

# Script

The folder script contains a script with which the list of ultimate beneficial holders with their respective ownership chains can be automatically generated.

The script uses only the immediate ownership information of the intermediate entities. It takes the id of the target entity as an argument. It outputs a list of all ultimate beneficial owners of the target entity including their respective ownership chains.

# JSON examples

The folder "jsonExamples" contains examples of the various data types.
