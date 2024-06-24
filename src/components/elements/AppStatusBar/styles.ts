import styled from 'styled-components/native';

export const Container = styled.View<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
  background-color: ${({ theme }) => theme.colors.main};
`;
