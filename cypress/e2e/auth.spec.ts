import {
  assertSignedIn,
  register,
  signIn,
  signOut,
  updateProfile,
} from "../support/actions/user";
import { signInAsAdmin } from "../support/actions/admin";
import { findMainMenu } from "../support/actions/nav";

beforeEach(() => {
  cy.visit("/");
});

describe("admin", () => {
  beforeEach(signInAsAdmin);
  it("can sign in", () => assertSignedIn());
  it("have access to admin menu once signed in", () => {
    findMainMenu("Admin").should("exist");
  });
});

describe("user", () => {
  let user: TestUser;
  beforeEach(() => {
    user = nextTestUser();
    register(user.name, user.password, user.email);
  });

  it("is signed in after registering", () => {
    assertSignedIn(user.name);
  });

  it("can sign in", () => {
    signOut();
    signIn(user.name, user.password);
    assertSignedIn(user.name);
  });

  it("can change their email", () => {
    updateProfile({ email: "new@email.com" });
    cy.reload(); // Reload to clear any potential form cache
    cy.findByLabelText("Email").should("have.value", "new@email.com");
  });

  it("can change their password", () => {
    updateProfile({ password: "password2" });
    signOut();
    signIn(user.name, "password2");
    assertSignedIn(user.name);
  });

  it("does not have access to admin menu", () => {
    assertSignedIn(user.name);
    findMainMenu("Admin").should("not.exist");
  });
});

describe("guest", () => {
  it("does not have access to admin menu", () => {
    findMainMenu("Admin").should("not.exist");
  });
});

type TestUser = ReturnType<typeof nextTestUser>;
let testUserCount = 0;
function nextTestUser() {
  const id = testUserCount++;
  return {
    name: "test" + id,
    password: "foobar",
    email: `test${id}@users.com`,
  };
}
