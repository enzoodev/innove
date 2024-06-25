import { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { IconChevronRight, IconHammer } from 'tabler-react-native/icons';
import { useTheme } from 'styled-components/native';

import { formatLocationAddressLabel } from '@/app/utils/formatLocationAddressLabel';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  item: TLocation;
};

export const LocationItem = memo(({ item, ...rest }: Props) => {
  const theme = useTheme();
  const formattedAddress = formatLocationAddressLabel(item.address[0]);

  return (
    <S.Container {...rest}>
      <S.IconWrapper>
        <IconHammer
          stroke={1.5}
          size={theme.iconSizes.md}
          color={theme.colors.mainContrast}
        />
      </S.IconWrapper>
      <S.Content>
        <S.InfoWrapper>
          <S.Title>{item.nome}</S.Title>
          <S.Subtitle>{item.datestart}</S.Subtitle>
          <S.Location>
            <S.LocationText>{item.tipo.name}</S.LocationText>
          </S.Location>
          <S.LocationInfoWrapper>
            <S.LocationInfoTitle>Local</S.LocationInfoTitle>
            <S.LocationInfoSubtitle>{formattedAddress}</S.LocationInfoSubtitle>
          </S.LocationInfoWrapper>
        </S.InfoWrapper>
      </S.Content>
      <IconChevronRight
        stroke={1.25}
        size={theme.iconSizes.md}
        color={theme.colors.textSecondary}
      />
    </S.Container>
  );
});
