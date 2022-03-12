import { render } from "@testing-library/react";
import "jest-styled-components";

import Code from "../../../../editor/toolbar/icons/code";

describe("Code Icon component", () => {
  test("Renders Code icon with correct color", () => {
    const TEST_COLOR = "red";
    const { container } = render(<Code color={TEST_COLOR} />);
    expect(container.firstChild).toHaveAttribute("fill", TEST_COLOR);
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        height: 24px;
        width: 24px;
      }

      <svg
        class="c0"
        fill="red"
        viewBox="-3 -5 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.24264069,6.65685425 L0.292893219,1.70710678 C-0.0976310729,1.31658249 -0.0976310729,0.683417511 0.292893219,0.292893219 C0.683417511,-0.0976310729 1.31658249,-0.0976310729 1.70710678,0.292893219 L7.36396103,5.94974747 C7.75448532,6.34027176 7.75448532,6.97343674 7.36396103,7.36396103 L1.70710678,13.0208153 C1.31658249,13.4113396 0.683417511,13.4113396 0.292893219,13.0208153 C-0.0976310729,12.630291 -0.0976310729,11.997126 0.292893219,11.6066017 L5.24264069,6.65685425 Z M9,11 L17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L9,13 C8.44771525,13 8,12.5522847 8,12 C8,11.4477153 8.44771525,11 9,11 Z"
        />
      </svg>
    `);
  });
});
