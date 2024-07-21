import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFormChecklist } from '@/hooks/api/useFormChecklist';

import { Header } from '@/components/elements/Header';
import { AnimatedKeyboardWrapper } from '@/components/elements/AnimatedKeyboardWrapper';

import * as S from './styles';

export const Checklist = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { checklistId, locationId, clientId, executionId } =
    route.params as TChecklistRouteParams;

  const {
    sections,
    answersTypes,
    complementPhotos,
    isLoading,
    isLoadingSaveChecklist,
    control,
    errors,
    handleSaveChecklist,
    handleAddPhoto,
    handleDeletePhoto,
    handleAddComplementPhoto,
    handleDeleteComplementPhoto,
  } = useFormChecklist({
    idclient: clientId,
    idlocal: locationId,
    idchecklist: checklistId,
    executionId,
  });

  return (
    <S.Container>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: theme.layout[4] + insets.bottom,
        }}
      >
        <AnimatedKeyboardWrapper>
          <S.Content>
            <Header hasBackButton title="Checklist" />
          </S.Content>
        </AnimatedKeyboardWrapper>
      </ScrollView>
    </S.Container>
  );
};
