import styled from "styled-components";

export const Toggle = styled.button`
    padding: 5px 14px;
    background: url(img/bars.svg) center no-repeat;
    border: none;
    -webkit-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    border-radius: 7px;
    margin: 5px;
    margin-bottom: 9px;
    height: 22px;
    width: 22px;
    position: absolute;
    right: 0;
    top: 0;


  &:hover {
    cursor: pointer;
    color: #56748f;
  }
`;