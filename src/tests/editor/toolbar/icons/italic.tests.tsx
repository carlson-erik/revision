import { render } from "@testing-library/react";
import "jest-styled-components";

import Italic from "../../../../editor/toolbar/icons/italic";

describe("Italic Icon component", () => {
  test("Renders Italic icon with correct color", () => {
    const TEST_COLOR = "red";
    const { container } = render(<Italic color={TEST_COLOR} />);
    expect(container.firstChild).toHaveAttribute("fill", TEST_COLOR);
    expect(container.firstChild).toMatchInlineSnapshot();
  });
});
