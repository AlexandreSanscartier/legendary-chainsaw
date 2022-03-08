import { CreepSpawnService } from "services/CreepSpawnService";

describe("CreepSpawnService", () => {
  beforeEach(() => {
    // runs before each test in this block
  });

  it("should calculate energy cost of a creep body", () => {
    // Arrange
    const expected = 200;
    const bodyParts = new Array<BodyPartConstant>(MOVE, CARRY, WORK);
    const creepSpawnService = new CreepSpawnService();

    // Act
    var actual = creepSpawnService.calculateEnergyCost(bodyParts);

    // Assert
    expect(actual).toBe(expected);
  });
});
