import { IRole } from "./IRole";

export class Harvester implements IRole {
  creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  run(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
      creep.say("🔄 harvest");
    } else {
      let extensions = creep.room.find(FIND_MY_STRUCTURES, {
        filter: {structureType: STRUCTURE_EXTENSION}
      }) as StructureExtension[];

      for(let i = 0; i < extensions.length; i++) {
        let extension = extensions[i];
        if (extension.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
          if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(extension, { visualizePathStyle: { stroke: "#ffffff" } });
          }
          break;
        }
      }

      if (creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns["Spawn1"], { visualizePathStyle: { stroke: "#ffffff" } });
      }
      creep.say("🏠 home");
    }
  }
}
