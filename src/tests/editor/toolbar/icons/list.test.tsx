import { render } from "@testing-library/react";
import "jest-styled-components";

import List from "../../../../editor/toolbar/icons/list";

describe("List Icon component", () => {
  test("Renders Ordered List icon with correct color", () => {
    const TEST_COLOR = "red";
    const { container } = render(<List ordered color={TEST_COLOR} />);
    expect(container.firstChild).toHaveAttribute("fill", TEST_COLOR);
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        height: 24px;
        width: 24px;
      }

      <svg
        class="c0"
        fill="red"
        viewBox="-5 -6 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 1h9a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 8h9a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0-4h9a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zM.438.845h.72L1.111 3H.65L.7 1.28H.224L.438.845zM.523 5.59l-.45-.053c.011-.244.09-.439.234-.582a.76.76 0 0 1 .556-.214c.139 0 .263.03.37.089a.67.67 0 0 1 .26.258.677.677 0 0 1 .097.342.988.988 0 0 1-.115.435c-.075.153-.211.33-.407.535l-.158.17h.647V7H.014l.015-.231.666-.68c.158-.16.263-.288.313-.382a.531.531 0 0 0 .074-.245.227.227 0 0 0-.067-.17.242.242 0 0 0-.179-.067.233.233 0 0 0-.182.081c-.034.038-.077.132-.131.284zm.982 4.398c.08.106.121.23.121.373a.7.7 0 0 1-.23.528.813.813 0 0 1-.579.215.758.758 0 0 1-.545-.203c-.142-.136-.22-.32-.183-.603l.456.042c.015.101.05.174.1.22.05.045.115.068.194.068.083 0 .15-.026.203-.078a.253.253 0 0 0 .08-.19.256.256 0 0 0-.109-.209c-.075-.06-.187-.09-.386-.143l.046-.401a.622.622 0 0 0 .203-.042.223.223 0 0 0 .092-.077.175.175 0 0 0 .032-.1.142.142 0 0 0-.045-.109.176.176 0 0 0-.127-.044.211.211 0 0 0-.13.044.217.217 0 0 0-.08.113l-.048.035-.444-.056a.703.703 0 0 1 .185-.413.71.71 0 0 1 .53-.217c.189 0 .35.06.479.182a.58.58 0 0 1 .195.436.516.516 0 0 1-.087.29c-.056.085-.136.153-.246.12a.626.626 0 0 1 .323.219z"
        />
      </svg>
    `);
  });

  test("Renders Bulleted List icon with correct color", () => {
    const TEST_COLOR = "red";
    const { container } = render(<List color={TEST_COLOR} />);
    expect(container.firstChild).toHaveAttribute("fill", TEST_COLOR);
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        height: 24px;
        width: 24px;
      }

      <svg
        class="c0"
        fill="red"
        viewBox="-5 -7 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 0h9a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 8h9a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0-4h9a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zM1 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
    `);
  });
});
