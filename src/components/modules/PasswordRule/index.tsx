import { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { IconCheck } from 'tabler-react-native/icons';

import * as S from './styles';

type Props = S.TTypeStyleProps & {
  message: string;
};

export const PasswordRule = memo(({ message, isSatisfied }: Props) => {
  const theme = useTheme();

  return (
    <S.Container isSatisfied={isSatisfied}>
      <S.IconWrapper isSatisfied={isSatisfied}>
        <IconCheck
          stroke={2.5}
          size={theme.iconSizes.xs}
          color={
            isSatisfied
              ? theme.colors.passwordRuleBgContrast
              : theme.colors.textPrimary
          }
        />
      </S.IconWrapper>
      <S.Title>{message}</S.Title>
    </S.Container>
  );
});
