import { listMonsters } from "../support/actions/nav";
import {
  findDataCells,
  findDataRows,
  findRowById,
  sortGridBy,
} from "../support/actions/grid";
import { menuSlide, waitForPageReady } from "../support/actions/common";
import {
  CompareFn,
  compareNumbers,
  createTextCompareFn,
  invertCompareFn,
} from "../support/util";

describe("can search for monsters by", () => {
  beforeEach(() => {
    cy.visit("/");
    listMonsters();
  });

  const searches: Record<string, { input: Function; verify: Function }> = {
    id: {
      input: () => cy.findByLabelText("ID").type("1309"),
      verify: () => findRowById(1309),
    },
    name: {
      input: () => cy.findByLabelText("Name").type("dopp"),
      verify: () =>
        findDataRows()
          .its("length")
          .then((length) => {
            expect(length).to.be.greaterThan(0, "No monsters found");
            findDataCells("Name", /dopp/i).should("have.length", length);
          }),
    },
    race: {
      input: () => cy.get("#Race").select("Angel"),
      verify: () => findDataCells("Name", "Angeling"),
    },
    element: {
      input: () => cy.get("#Element").select("Earth"),
      verify: () => findDataCells("Name", "Fabre"),
    },
    size: {
      input: () => cy.get("#Size").select("Small"),
      verify: () => findDataCells("Name", "Familiar"),
    },
    level: {
      input: () => menuSlide("Level", [50, 55]),
      verify: () =>
        findDataCells("Level", (text) => +text >= 50 && +text <= 55),
    },
    "move speed": {
      input: () => menuSlide("Move Speed", [100, 200]),
      verify: () =>
        findDataCells("Move Speed", (text) => +text >= 100 && +text <= 200),
    },
    "attack range": {
      input: () => menuSlide("Atk. Range", [5, 10]),
      verify: () =>
        findDataCells("Atk. Range", (text) => +text >= 5 && +text <= 10),
    },
    "skill range": {
      input: () => menuSlide("Skill Range", [4, 8]),
      verify: () =>
        findDataCells("Skill Range", (text) => +text >= 4 && +text <= 8),
    },
    "chase range": {
      input: () => menuSlide("Chase Range", [6, 13]),
      verify: () =>
        findDataCells("Chase Range", (text) => +text >= 6 && +text <= 13),
    },
    "base xp": {
      input: () => {
        cy.findByLabelText("Base XP (min)").type("5000");
        cy.findByLabelText("Base XP (max)").type("6000");
      },
      verify: () =>
        findDataCells("Base XP", (text) => +text >= 5000 && +text <= 6000),
    },
    "job xp": {
      input: () => {
        cy.findByLabelText("Job XP (min)").type("5000");
        cy.findByLabelText("Job XP (max)").type("6000");
      },
      verify: () =>
        findDataCells("Job XP", (text) => +text >= 5000 && +text <= 6000),
    },
    modes: {
      input: () => cy.get("#Modes").select("CastSensorChase"),
      verify: () => findDataCells("Name", /Archer Guardian/i),
    },
  };

  Object.entries(searches).forEach(([name, { input, verify }]) => {
    it(name, () => {
      input();
      waitForPageReady();
      verify();
    });
  });
});

describe("can sort monsters by", () => {
  before(() => {
    cy.visit("/");
    listMonsters();
  });

  const compareTexts = createTextCompareFn();
  const columns: Record<string, CompareFn> = {
    Name: compareTexts,
    Level: compareTexts,
    Attack: compareNumbers,
    "M. Attack": compareNumbers,
    Defense: compareNumbers,
    "M. Defense": compareNumbers,
    Hit: compareNumbers,
    Flee: compareNumbers,
    "Base XP": compareNumbers,
    "Job XP": compareNumbers,
    "Move Speed": compareNumbers,
    "Atk. Range": compareNumbers,
    "Skill Range": compareNumbers,
    "Chase Range": compareNumbers,
  };

  Object.entries(columns).forEach(([name, compareFn]) => {
    describe(name, () => {
      it("asc", () => {
        sortGridBy(name, "asc");
        findDataCells(name).shouldBeSortedBy(compareFn);
      });
      it("desc", () => {
        sortGridBy(name, "desc");
        findDataCells(name).shouldBeSortedBy(invertCompareFn(compareFn));
      });
    });
  });
});
