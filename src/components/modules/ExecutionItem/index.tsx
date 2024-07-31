import { memo, useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  IconChevronRight,
  IconHammer,
  IconMapCog,
  IconSettingsCog,
} from 'tabler-react-native/icons';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  item: TExecution;
};

export const ExecutionItem = memo(({ item, ...rest }: Props) => {
  const theme = useTheme();
  const isDone = item.status === 'Finalizado';

  const icons: Record<TExecutionName, () => JSX.Element> = useMemo(
    () => ({
      Equipamentos: () => (
        <IconSettingsCog
          stroke={1.5}
          size={theme.iconSizes.md}
          color={theme.colors.mainContrast}
        />
      ),
      Obra: () => (
        <IconHammer
          stroke={1.5}
          size={theme.iconSizes.md}
          color={theme.colors.mainContrast}
        />
      ),
      'Setor/Área': () => (
        <IconMapCog
          stroke={1.5}
          size={theme.iconSizes.md}
          color={theme.colors.mainContrast}
        />
      ),
    }),
    [theme.colors.mainContrast, theme.iconSizes.md],
  );

  const Icon = icons[item.tipo.name];

  return (
    <S.Container disabled={isDone} {...rest}>
      <S.IconWrapper>
        <Icon />
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
