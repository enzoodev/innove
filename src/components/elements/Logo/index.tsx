import { memo } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Innove from '@/assets/images/Innove.png';

type Props = {
  size: number;
};

export const Logo = memo(({ size }: Props) => {
  const height = RFValue(size);
  const width = height * 3;

  return <Image style={{ height, width }} source={Innove} />;
});
