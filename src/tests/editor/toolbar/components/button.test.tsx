import { render, screen, fireEvent } from "@testing-library/react";

import Button from "../../../../editor/toolbar/components/button";

describe("Toolbar Button component", () => {
  test("Renders Primary Button", () => {
    const onClickHandler = jest.fn();
    const { container } = render(
      <Button onClick={onClickHandler} primary>
        Button Text
      </Button>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        class="sc-bdvvtL fkJOrK"
        data-testid="button"
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
    fireEvent.click(screen.getByTestId("button"));
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  test("Renders Secondary Button", () => {
    const onClickHandler = jest.fn();
    const { container } = render(
      <Button onClick={onClickHandler}>Button Text</Button>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        class="sc-bdvvtL fkJOrK"
        data-testid="button"
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
    fireEvent.click(screen.getByTestId("button"));
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
});
