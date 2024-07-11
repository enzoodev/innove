import styled, { css } from 'styled-components/native';

export type ContainerTypeStyleProps = {
  modalHeight?: number;
  modalMaxHeight?: number;
};

export type TitleTypeStyleProps = {
  fontSize?: number;
};

export const Container = styled.View<ContainerTypeStyleProps>`
  ${({ theme, modalHeight, modalMaxHeight }) => css`
    background-color: ${theme.colors.modalBackgroundColor};
    border-color: ${theme.colors.modalBorderColor};
    border-width: ${theme.border.width.md}px;
    border-top-left-radius: ${theme.border.radius.lg}px;
    border-top-right-radius: ${theme.border.radius.lg}px;
    ${!!modalHeight &&
    css`
      height: ${`${modalHeight}%`};
    `};
    ${!!modalMaxHeight &&
    css`
      max-height: ${`${modalMaxHeight}%`};
    `};
  `};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    padding: ${theme.layout[3]}px ${theme.layout[3]}px ${theme.layout[3]}px
      ${theme.layout[4]}px;
    border-color: ${theme.colors.cardBorderInner};
    border-bottom-width: ${theme.border.width.md}px;
  `};
`;

export const Title = styled.Text<TitleTypeStyleProps>`
  ${({ theme, fontSize }) => css`
    flex: 1;
    font-family: ${theme.fonts.main.bold};
    font-size: ${fontSize || theme.fontSizes.lg}px;
    color: ${theme.colors.textPrimary};
  `};
`;

export const HeaderRightComponentWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;
