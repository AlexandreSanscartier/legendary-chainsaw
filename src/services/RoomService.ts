export class RoomService {
  room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  get name(): string {
    return this.room.name;
  }

  get storage(): StructureStorage | undefined {
    return this.room.storage;
  }

  get terminal(): StructureTerminal | undefined {
    return this.room.terminal;
  }

  get controller(): StructureController | undefined {
    return this.room.controller;
  }

  get visual(): RoomVisual | undefined {
    return this.room.visual;
  }

  get energyAvailable(): number {
    return this.room.energyAvailable;
  }

  get energyCapacityAvailable(): number {
    return this.room.energyAvailable;
  }

  /**
   * Calculates the total energy storage capacity for the room.
   * @returns the current storage capacity for the room.
   */
  calculateEnergyStorageCapacity(): number {
    const mySpawns = this.room.find(FIND_MY_SPAWNS);
    const myExtensions = this.room.find(FIND_MY_STRUCTURES, {
      filter: { structureType: STRUCTURE_EXTENSION }
    }) as StructureExtension[];

    var spawnEnergy = mySpawns
      .map(spawn => spawn.store.getFreeCapacity(RESOURCE_ENERGY))
      .reduce((acc, energy) => acc + energy);
    var extensionEnergy = myExtensions
      .map(ext => ext.store.getFreeCapacity(RESOURCE_ENERGY))
      .reduce((acc, energy) => acc + energy);

    return spawnEnergy + extensionEnergy;
  }
}
