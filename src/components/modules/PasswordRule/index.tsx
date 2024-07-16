import { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { IconCheck, IconX } from 'tabler-react-native/icons';

import * as S from './styles';

type Props = {
  message: string;
  isSatisfied: boolean;
};

export const PasswordRule = memo(({ message, isSatisfied }: Props) => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.IconWrapper isSatisfied={isSatisfied}>
        {isSatisfied ? (
          <IconCheck
            stroke={1.5}
            size={theme.iconSizes.md}
            color={theme.colors.success}
          />
        ) : (
          <IconX
            stroke={1.5}
            size={theme.iconSizes.md}
            color={theme.colors.error}
          />
        )}
      </S.IconWrapper>
      <S.Title>{message}</S.Title>
    </S.Container>
  );
});
