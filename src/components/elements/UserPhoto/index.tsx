import { memo } from 'react';
import { Image } from 'react-native';

import { PhotoFormatter } from '@/app/utils/PhotoFormatter';
import { useAuth } from '@/hooks/api/useAuth';

type Props = {
  size: number;
};

export const UserPhoto = memo(({ size }: Props) => {
  const { auth } = useAuth();

  if (!auth) {
    return null;
  }

  const uri = PhotoFormatter.formatUri(auth.client_logo_icon);

  return (
    <Image
      width={size}
      height={size}
      borderRadius={size / 2}
      source={{ uri }}
    />
  );
});
