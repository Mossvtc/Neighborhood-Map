import styled from "styled-components";

export const Lists = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  padding: 9px 14px;
  border-radius: 4px;
  margin-bottom: 7px;
  font-size: 1vw;
  background: #a6a6a6;
  color: #1a1a1a;
  transition: all 0.5s;

  &:hover {
    background: #5abfbf;
    color: #b35900;
    cursor: pointer;
  }
`;
