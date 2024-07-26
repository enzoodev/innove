import { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFormChecklist } from '@/hooks/api/useFormChecklist';

import { Button } from '@/components/elements/Button';
import { Header } from '@/components/elements/Header';
import { AnimatedKeyboardWrapper } from '@/components/elements/AnimatedKeyboardWrapper';
import { ChecklistSection } from '@/components/modules/ChecklistSection';

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
    handleRespond,
    handleClassificate,
    handleOpenSection,
    handleSetPhoto,
    handleDeletePhoto,
    handleSetComplementPhoto,
    handleDeleteComplementPhoto,
  } = useFormChecklist({
    idclient: clientId,
    idlocal: locationId,
    idchecklist: checklistId,
    executionId,
  });

  const renderSections = useCallback(() => {
    if (isLoading) {
      return;
    }

    return sections.map((section, sectionIndex) => (
      <ChecklistSection
        key={(sectionIndex + 1).toString()}
        control={control}
        errors={errors}
        section={section}
        index={sectionIndex}
        answers={answersTypes}
        onOpenSection={() => handleOpenSection(sectionIndex)}
        onRespond={(questionIndex, answerId) =>
          handleRespond({
            sectionIndex,
            questionIndex,
            answerId,
          })
        }
        onClassificate={(questionIndex, classificationId) =>
          handleClassificate({
            sectionIndex,
            questionIndex,
            classificationId,
          })
        }
        onSetPhoto={(questionIndex, photoUri) =>
          handleSetPhoto({
            sectionIndex,
            questionIndex,
            photoUri,
          })
        }
        onDeletePhoto={(questionIndex, photoIndex) =>
          handleDeletePhoto({
            sectionIndex,
            questionIndex,
            photoIndex,
          })
        }
      />
    ));
  }, [
    answersTypes,
    control,
    errors,
    handleClassificate,
    handleDeletePhoto,
    handleOpenSection,
    handleRespond,
    handleSetPhoto,
    isLoading,
    sections,
  ]);

  return (
    <S.Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: theme.layout[4] + insets.bottom,
        }}
      >
        <AnimatedKeyboardWrapper>
          <S.Content>
            <Header
              title="Checklist"
              hasBackButton
              backButtonLeftSpace={theme.layout[4]}
            />
            {renderSections()}
            {!isLoading && (
              <S.ButtonWrapper>
                <Button
                  title="Finalizar Checklist"
                  onPress={handleSaveChecklist}
                  isLoading={isLoadingSaveChecklist}
                />
              </S.ButtonWrapper>
            )}
          </S.Content>
        </AnimatedKeyboardWrapper>
      </ScrollView>
    </S.Container>
  );
};
