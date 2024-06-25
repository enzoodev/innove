import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  margin: 0 ${({ theme }) => theme.layout[4]}px;
`;

export const ItemSeparator = styled.View`
  margin: ${({ theme }) => theme.layout[2]}px 0;
`;

export const ListHeader = styled.View``;

export const SearchInputWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.layout[4]}px;
`;
