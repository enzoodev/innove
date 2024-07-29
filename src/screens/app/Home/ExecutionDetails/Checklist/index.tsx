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
import { ComplementSection } from '@/components/modules/ComplementSection';
import { ChecklistSectionSkeletonItem } from '@/components/modules/ChecklistSectionSkeletonItem';

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
    complement,
    isLoading,
    isLoadingSaveChecklist,
    control,
    errors,
    handleSaveChecklist,
    handleRespond,
    handleClassificate,
    handleOpenSection,
    handleOpenComplementSection,
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
      return Array.from({ length: 7 }).map((_, index) => (
        <ChecklistSectionSkeletonItem key={(index + 1).toString()} />
      ));
    }

    return (
      <>
        {sections.map((section, sectionIndex) => (
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
            onSetPhoto={(questionIndex, photoUri, photoIndex) =>
              handleSetPhoto({
                sectionIndex,
                questionIndex,
                photoUri,
                photoIndex,
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
        ))}
        <ComplementSection
          photos={complement.photos}
          isOpen={complement.isOpen}
          onOpenSection={handleOpenComplementSection}
          onSetPhoto={handleSetComplementPhoto}
          onDeletePhoto={handleDeleteComplementPhoto}
        />
      </>
    );
  }, [
    answersTypes,
    complement.isOpen,
    complement.photos,
    control,
    errors,
    handleClassificate,
    handleDeleteComplementPhoto,
    handleDeletePhoto,
    handleOpenComplementSection,
    handleOpenSection,
    handleRespond,
    handleSetComplementPhoto,
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
