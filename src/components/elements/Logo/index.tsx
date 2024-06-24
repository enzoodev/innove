import { memo } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Innove from '@/assets/images/Innove.png';

type Props = {
  size: number;
};

export const Logo = memo(({ size }: Props) => {
  const width = RFValue(size);
  const height = RFValue(size * 0.26);

  return <Image style={{ width, height }} source={Innove} />;
});
