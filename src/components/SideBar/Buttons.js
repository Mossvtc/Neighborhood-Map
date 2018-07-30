import styled from "styled-components";

export const Buttons = styled.button`
    width: calc(50% - 10px);
    padding: 5px 14px;
    font-size: 1vw;
    border: 1px solid #2d2d52;
    background: transparent;
    border-radius: 7px;
    margin-bottom: 10px;
    margin: 6px;
    transition: all 0.5s;

  &:hover {
    cursor: pointer;
    background: #cc9200;
    color: #435a70;
  }
`;
