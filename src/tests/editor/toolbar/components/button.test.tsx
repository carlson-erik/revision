import { render } from "@testing-library/react";

import Button from "../../../../editor/toolbar/components/button";

describe("Toolbar Button component", () => {
  test("Renders Primary Button", () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button onClick={onClick} primary>
        Button Text
      </Button>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        class="sc-bdvvtL fkJOrK"
      >
        <button
          class="sc-gsDKAQ sc-dkPtRN kuwXBZ gdULhr"
        >
          <span
            class="sc-eCImPb aNykz"
          >
            Button Text
          </span>
        </button>
      </a>
    `);
  });

  test("Renders Secondary Button", () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button onClick={onClick}>Button Text</Button>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        class="sc-bdvvtL fkJOrK"
      >
        <button
          class="sc-gsDKAQ sc-hKwDye kuwXBZ bbODPH"
        >
          <span
            class="sc-eCImPb aNykz"
          >
            Button Text
          </span>
        </button>
      </a>
    `);
  });
});
