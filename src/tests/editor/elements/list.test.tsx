import { render } from "@testing-library/react";
import { RenderElementProps } from "slate-react";

import ListElement from "../../../editor/elements/list";
import ListItemElement from "../../../editor/elements/list-item";

describe("Link Element component", () => {
  const testText = "List Item Text";
  const listItemProps: RenderElementProps = {
    children: testText,
    element: {
      type: "list-item",
      children: [
        {
          text: testText,
        },
      ],
    },
    attributes: {
      "data-slate-node": "element",
      "data-slate-inline": true,
      "data-slate-void": true,
      dir: "rtl",
      ref: {
        current: null,
      },
    },
  };
  const listProps: RenderElementProps = {
    children: (
      <ListItemElement
        element={listItemProps.element}
        attributes={listItemProps.attributes}
      >
        {listItemProps.children}
      </ListItemElement>
    ),
    element: {
      type: "ordered-list",
      children: [
        {
          type: "list-item",
          children: [{ text: testText }],
        },
      ],
    },
    attributes: {
      "data-slate-node": "element",
      "data-slate-inline": true,
      "data-slate-void": true,
      dir: "rtl",
      ref: {
        current: null,
      },
    },
  };

  test("Ordered List renders correctly", () => {
    const { container } = render(
      <ListElement
        element={listProps.element}
        attributes={listProps.attributes}
      >
        {listProps.children}
      </ListElement>
    );
    expect(container.firstChild).toBeDefined();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <ol
        class="sc-bdvvtL"
        data-slate-inline="true"
        data-slate-node="element"
        data-slate-void="true"
        dir="rtl"
      >
        <li
          class="sc-dkPtRN"
          data-slate-inline="true"
          data-slate-node="element"
          data-slate-void="true"
          dir="rtl"
        >
          List Item Text
        </li>
      </ol>
    `);
  });

  test("Bulleted List renders correctly", () => {
    const bulletedProps: RenderElementProps = { ...listProps };
    bulletedProps.element.type = "bulleted-list";
    const { container } = render(
      <ListElement
        element={bulletedProps.element}
        attributes={bulletedProps.attributes}
      >
        {bulletedProps.children}
      </ListElement>
    );
    expect(container.firstChild).toBeDefined();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <ul
        class="sc-gsDKAQ"
        data-slate-inline="true"
        data-slate-node="element"
        data-slate-void="true"
        dir="rtl"
      >
        <li
          class="sc-dkPtRN"
          data-slate-inline="true"
          data-slate-node="element"
          data-slate-void="true"
          dir="rtl"
        >
          List Item Text
        </li>
      </ul>
    `);
  });
});
