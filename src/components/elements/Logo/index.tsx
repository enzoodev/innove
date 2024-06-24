import { memo } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Innove from '@/assets/images/Innove.png';

type Props = {
  size: number;
};

export const Logo = memo(({ size }: Props) => {
  const width = RFValue(size);

  return <Image style={{ width }} source={Innove} />;
});
