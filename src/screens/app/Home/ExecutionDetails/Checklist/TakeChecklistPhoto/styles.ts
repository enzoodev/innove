import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BorderlessButton } from '@/components/elements/BorderlessButton';

export const Container = styled.View`
  flex: 1;
  background-color: #060606;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #060606;
`;

export const Wrapper = styled.View`
  flex: 1;
`;

export const WrapperSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const GoBackButton = styled(BorderlessButton)``;

export const LoadWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const CameraContentWrapper = styled.View`
  height: 100%;
  justify-content: space-between;
  padding: ${({ theme }) => theme.layout[8]}px
    ${({ theme }) => theme.layout[4]}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TakePhotoButton = styled.View`
  align-self: center;
  ${({ theme }) => css`
    padding: ${RFValue(30)}px;
    border-radius: ${theme.border.radius.full}px;
    border: ${RFValue(4)}px solid ${theme.colors.mainContrast};
  `};
`;

export const IconButton = styled(BorderlessButton)`
  padding: ${RFValue(6)}px;
  border-radius: ${({ theme }) => theme.border.radius.full}px;
  background-color: rgba(242, 239, 240, 0.5);
`;

export const Image = styled.ImageBackground`
  flex: 1;
`;

export const ImageContentWrapper = styled.View`
  padding: ${({ theme }) => theme.layout[8]}px
    ${({ theme }) => theme.layout[4]}px;
`;

export const ImageContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ImagesButtonsFullWrapper = styled.View`
  height: ${Dimensions.get('screen').height * 0.83}px;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ImageButtonsWrapper = styled.View`
  gap: ${({ theme }) => theme.layout[4]}px;
`;

export const NoPermissionWrapper = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.layout[4]}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const NotPermissionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.layout[4]}px;
`;

export const NotPermissionText = styled.Text`
  text-align: center;
  width: 80%;
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textPrimary};
  `};
`;

export const ButtonWrapper = styled.View`
  width: 70%;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.md}px;
    color: #fff;
  `};
`;
