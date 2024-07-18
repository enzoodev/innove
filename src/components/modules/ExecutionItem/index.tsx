import { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { IconChevronRight, IconHammer } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  item: TExecution;
};

export const ExecutionItem = memo(({ item, ...rest }: Props) => {
  const theme = useTheme();
  const isDone = item.status === 'Finalizado';

  return (
    <S.Container disabled={isDone} {...rest}>
      <S.IconWrapper>
        <IconHammer
          stroke={1.5}
          size={theme.iconSizes.md}
          color={theme.colors.mainContrast}
        />
      </S.IconWrapper>
      <S.Content>
        <S.InfoWrapper>
          <S.Title>{item.detalhes.nome}</S.Title>
          <S.Subtitle>{item.datestart}</S.Subtitle>
          <S.Execution>
            <S.ExecutionText>{item.tipo.name}</S.ExecutionText>
          </S.Execution>
        </S.InfoWrapper>
      </S.Content>
      {!isDone && (
        <IconChevronRight
          stroke={1.25}
          size={theme.iconSizes.md}
          color={theme.colors.textSecondary}
        />
      )}
    </S.Container>
  );
});
