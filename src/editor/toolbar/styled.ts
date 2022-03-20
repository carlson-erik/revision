import styled from "styled-components";

const ToolbarIcon = styled.svg<{ size: "small" | "large" }>`
  height: ${(props) => (props.size === "large" ? "24" : "16")}px;
  width: ${(props) => (props.size === "large" ? "24" : "16")}px;
`;

const SectionContainer = styled.div<{ noSeparator?: boolean }>`
  width: fit-content;
  height: fit-content;
  margin-right: ${(props) => (props.noSeparator ? "0" : "0.5rem")};
  padding-right: ${(props) => (props.noSeparator ? "0" : "0.5rem")};
  border-right: 1px solid
    ${(props) => (props.noSeparator ? "transparent" : "#D1D4D9")};
  display: flex;
  align-items: center;
`;

export { ToolbarIcon, SectionContainer };
