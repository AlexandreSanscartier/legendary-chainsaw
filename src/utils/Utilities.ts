export class Utilities {
  static harvesterCount(): number {
    return _(Game.creeps)
      .filter((harvesters: Creep) => harvesters.name.toLowerCase().startsWith("harvester"))
      .value().length;
  }

  static upgraderCount(): number {
    return _(Game.creeps)
      .filter((upgraders: Creep) => upgraders.name.toLowerCase().startsWith("upgrader"))
      .value().length;
  }

  static builderCount(): number {
    return _(Game.creeps)
      .filter((builder: Creep) => builder.name.toLowerCase().startsWith("builder"))
      .value().length;
  }

  static creepCount(type: string): number {
    if (type === "harvester") {
      return this.harvesterCount();
    }
    if (type === "upgrader") {
      return this.upgraderCount();
    }
    if (type === "builder") {
      return this.builderCount();
    }
    return -1;
  }

  static spawnCreep(type: string): boolean {
    let returnCode = 0;
    if (type === "harvester") {
      const harvesterCount = this.harvesterCount() + 1;
      returnCode = Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE], `${type}${harvesterCount}`);
    }
    if (type === "upgrader") {
      const upgraderCount = this.upgraderCount() + 1;
      returnCode = Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], `${type}${upgraderCount}`);
    }
    if (type === "builder") {
      const builderCount = this.builderCount() + 1;
      returnCode = Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE], `${type}${builderCount}`);
    }
    return returnCode === 0;
  }

  static isHarvester(creep: Creep): boolean {
    return creep.name.toLowerCase().startsWith("harvester");
  }

  static isUpgrader(creep: Creep): boolean {
    return creep.name.toLowerCase().startsWith("upgrader");
  }

  static isBuilder(creep: Creep): boolean {
    return creep.name.toLowerCase().startsWith("builder");
  }
}
