import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.layout[4]}px;
`;

export const ButtonWrapper = styled.View`
  margin: 0 ${({ theme }) => theme.layout[4]}px;
`;
