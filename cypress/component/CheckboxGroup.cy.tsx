import React from "react";
import { Checkbox, CheckboxGroup } from "../../src/indexLib";

const fieldLabel = '[data-id="field--label"]';
const inputEl = '[data-id="checkbox--input"]';
const fieldDesc = '[data-id="help--description"]';
const fieldError = '[data-id="help--error"]';
const fieldGroup = '[role="group"]';

describe("Basic CheckboxGroup", () => {
  it("renders childen, unchecked by default", () => {
    cy.mount(
      <CheckboxGroup includeDataIds label="Field Label">
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get(inputEl).should("not.be.checked");
  });

  it("renders label and input #a11y related attributes correctly.", () => {
    cy.mount(
      <CheckboxGroup includeDataIds label="Field Label">
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get(fieldLabel)
      .should("have.text", "Field Label")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldGroup).should("have.attr", "aria-labelledby", id)
      );
  });

  it("fires onChange.", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <CheckboxGroup label="Field Label" onChange={onChangeSpy} includeDataIds>
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", ["cb1"]);
    cy.get("input[value='cb2']").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", ["cb1", "cb2"]);
    cy.get(inputEl).should("be.checked");
  });

  it("defaultValue works as expected - uncontrolled", () => {
    cy.mount(
      <CheckboxGroup
        includeDataIds
        label="Field Label"
        defaultValue={["cb1", "cb3"]}
      >
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
        <Checkbox value="cb3" includeDataIds>
          Checkbox label 3
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").should("be.checked");
    cy.get("input[value='cb2']").should("not.be.checked");
    cy.get("input[value='cb3']").should("be.checked");
  });

  it("value works as expected - controlled", () => {
    cy.mount(
      <CheckboxGroup includeDataIds label="Field Label" value={["cb1", "cb3"]}>
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
        <Checkbox value="cb3" includeDataIds>
          Checkbox label 3
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").should("be.checked");
    cy.get("input[value='cb2']").should("not.be.checked");
    cy.get("input[value='cb3']").should("be.checked");
  });
});

describe("CheckboxGroup isDisabled and isReadOnly", () => {
  it("isDisabled - entire group", () => {
    cy.mount(
      <CheckboxGroup includeDataIds label="Field Label" isDisabled>
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get(inputEl).should("be.disabled");
  });

  it("isDisabled - single item", () => {
    cy.mount(
      <CheckboxGroup includeDataIds label="Field Label">
        <Checkbox value="cb1" isDisabled includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").should("be.disabled");
    cy.get("input[value='cb2']").should("not.be.disabled");
  });

  it("isReadOnly - entire group", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <CheckboxGroup
        includeDataIds
        label="Field Label"
        onChange={onChangeSpy}
        isReadOnly
      >
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").click().and("not.be.checked");
    cy.get("input[value='cb2']").click().and("not.be.checked");
    cy.get("@onChangeSpy").should("not.have.been.called");
  });

  it("isReadOnly - single item", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <CheckboxGroup includeDataIds label="Field Label" onChange={onChangeSpy}>
        <Checkbox value="cb1" isReadOnly includeDataIds>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2" includeDataIds>
          Checkbox label 2
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").click().and("not.be.checked");
    cy.get("input[value='cb2']").click().and("be.checked");
    cy.get("@onChangeSpy").should("have.been.called", "once");
  });
});

describe("CheckboxGroup Help", () => {
  it("renders description correctly.", () => {
    cy.mount(
      <CheckboxGroup
        includeDataIds
        label="Field Label"
        description="Number 5 likes input."
      >
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get(fieldDesc)
      .should("have.text", "Number 5 likes input.")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
      );
  });

  it("renders errorMessage correctly.", () => {
    cy.mount(
      <CheckboxGroup
        includeDataIds
        label="Field Label"
        errorMessage="No input!"
        validationState="invalid"
      >
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get(fieldError)
      .should("have.text", "No input!")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
      );
  });

  it("renders errorMessage instead of description.", () => {
    cy.mount(
      <CheckboxGroup
        includeDataIds
        label="Field Label"
        description="Number 5 likes input."
        errorMessage="No input!"
        validationState="invalid"
      >
        <Checkbox value="cb1" includeDataIds>
          Checkbox label 1
        </Checkbox>
      </CheckboxGroup>
    );
    cy.get(fieldDesc).should("not.exist");
    cy.get(fieldError)
      .should("have.text", "No input!")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
      );
  });
});

describe("CheckboxGroup custom labels", () => {
  it("defaultValue and onChange work as expected", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <CheckboxGroup
        label="Field Label"
        defaultValue={["cb2"]}
        onChange={onChangeSpy}
        includeDataIds
      >
        <label htmlFor="cb1">Label1</label>
        <Checkbox id="cb1" value="cb1" includeDataIds />
        <label htmlFor="cb2">Label2</label>
        <Checkbox id="cb2" value="cb2" includeDataIds />
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", ["cb2", "cb1"]);
  });
});
