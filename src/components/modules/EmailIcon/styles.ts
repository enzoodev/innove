import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    bottom: ${theme.layout[3]}px;
    right: ${theme.layout[18]}px;
    width: ${theme.layout[10]}px;
    height: ${theme.layout[10]}px;
    border-radius: ${theme.border.radius.full}px;
    background-color: ${theme.colors.mail};
  `};
`;
