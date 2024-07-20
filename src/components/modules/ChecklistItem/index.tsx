import { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { IconChevronRight, IconHammer } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { formatStringDateToBrazilianStandard } from '@/app/utils/formatStringDateToBrazilianStandard';
import { getDayByDateString } from '@/app/utils/getDayByDateString';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  item: TChecklist;
};

export const ChecklistItem = memo(({ item, ...rest }: Props) => {
  const theme = useTheme();
  const [date, hour] = item.dateRegister?.split(' ') ?? [];
  const formattedDate = formatStringDateToBrazilianStandard(date);
  const day = getDayByDateString(item.dateRegister);
  const isFinished = item.status === 1;

  return (
    <S.Container disabled={isFinished} {...rest}>
      <S.IconWrapper>
        <IconHammer
          stroke={1.5}
          size={theme.iconSizes.md}
          color={theme.colors.mainContrast}
        />
      </S.IconWrapper>
      <S.Content>
        <S.InfoWrapper>
          <S.Title>{item.name}</S.Title>
          <S.Subtitle>
            {formattedDate} {hour}
          </S.Subtitle>
          <S.Checklist>
            <S.ChecklistText>{day}</S.ChecklistText>
          </S.Checklist>
        </S.InfoWrapper>
      </S.Content>
      {!isFinished && (
        <IconChevronRight
          stroke={1.25}
          size={theme.iconSizes.md}
          color={theme.colors.textSecondary}
        />
      )}
    </S.Container>
  );
});
