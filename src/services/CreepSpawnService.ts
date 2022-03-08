import { CreepType } from "entities/CreepType";
import { Utilities } from "utils/Utilities";

export class CreepSpawnService {
  /*
      //console.log(BODYPARTS_ALL);
    //console.log(BODYPART_COST["move"]);
  //console.log(BODYPARTS_ALL); move,work,carry,attack,ranged_attack,tough,heal,claim
  */

  constructor() {}

  spawnCreep(energyAvailable: number, creepType: CreepType): void {
    switch (creepType) {
      case CreepType.Builder: {
        Utilities.spawnCreep("builder");
        break;
      }
      case CreepType.Harvester: {
        Utilities.spawnCreep("harvester");
        break;
      }
      case CreepType.Upgrader: {
        Utilities.spawnCreep("upgrader");
        break;
      }
    }
  }

  public calculateEnergyCost(bodyParts: BodyPartConstant[]) {
    return bodyParts.map(bodyPart => BODYPART_COST[bodyPart]).reduce((acc, cost) => acc + cost);
  }

  private addDefaultWorkParts(): BodyPartConstant[] {
    return new Array<BodyPartConstant>(MOVE, CARRY, WORK);
  }
  //returnCode = Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE], `${type}${harvesterCount}`);
  private canAffordBodyPart(bodyPart: BodyPartConstant, energyAvailable: number): boolean {
    return BODYPART_COST[bodyPart] <= energyAvailable;
  }
}
