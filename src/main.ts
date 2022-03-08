import { ErrorMapper } from "utils/ErrorMapper";
import { Utilities } from 'utils/Utilities';
import { Builder } from 'roles/Builder';
import { Harvester } from "roles/Harvester";
import { Upgrader } from "roles/Upgrader";
import { RoomService } from "services/RoomService";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
    building: boolean;
    upgrading: boolean;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  var myRoom = Game.rooms["E35N17"];

  const roomService = new RoomService(myRoom);

  //console.log(`[${roomService.name}] energy storage: ${roomService.calculateEnergyStorageCapacity()}`);

  var constructionSites = myRoom.find(FIND_CONSTRUCTION_SITES);

  const maxHarvester = 3;
  const maxUpgraders = 2;
  const maxBuilders = 3;

  if (Utilities.harvesterCount() < maxHarvester) {
    Utilities.spawnCreep("harvester");
  }

  if (Utilities.upgraderCount() < maxUpgraders) {
    Utilities.spawnCreep("upgrader");
  }

  if (constructionSites.length > 0 && Utilities.builderCount() < maxBuilders) {
    Utilities.spawnCreep("builder");
  }

  for (const i in Game.creeps) {
    var creep = Game.creeps[i];
    if (Utilities.isHarvester(creep)) {
      const roleHarvester = new Harvester(creep);
      roleHarvester.run(creep);
    }
    if (Utilities.isUpgrader(creep)) {
      const roleUpgrader = new Upgrader(creep);
      roleUpgrader.run(creep);
    }
    if (Utilities.isBuilder(creep)) {
      const roleBuilder = new Builder(creep);
      roleBuilder.run(creep);
    }
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
