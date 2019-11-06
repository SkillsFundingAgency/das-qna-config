import styled, { css } from "styled-components";

const FloatingLabel = props => {
  console.log(props.dirty);

  const dirtyStyles = `
  position: absolute;
  top: -6px;
  left: 10px;
  padding: 0 1px;
  line-height: 1;
  font-size: 11px;
  font-weight: bold;
  color: #555555;
  background: #fff;
  `;

  const Label = styled.label`
    pointer-events: none;
    position: absolute;
    top: ${props => (props.dirty ? "-6px" : 0)};
    left: ${props => (props.dirty ? "10px" : 0)};
    padding: 11px;
    line-height: 1.15;
    font-size: 16px;
    color: #767676;
  `;

  return <Label dirty>{props.children}</Label>;
};

export default FloatingLabel;
