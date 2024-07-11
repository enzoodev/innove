import { useCallback, useEffect } from 'react';
import { useTheme } from 'styled-components/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  startExecutionSchema,
  TStartExecutionSchema,
} from '@/app/schemas/execution/startExecution';

import { useAuth } from '@/hooks/useAuth';
import { useLocations } from '@/hooks/useLocations';
import { useExecution } from '@/hooks/useExecution';

import { Label } from '@/components/elements/Label';
import { Button } from '@/components/elements/Button';
import { AppModal } from '@/components/elements/AppModal';
import {
  SelectDropDown,
  SelectDropDownItem,
} from '@/components/elements/SelectDropDown';

import * as S from './styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StartExecutionModal = ({ isOpen, onClose }: Props) => {
  const theme = useTheme();
  const { clientId } = useAuth();
  const {
    locations,
    isLoading: isLoadingLocations,
    refresh,
  } = useLocations({
    idclient: clientId,
  });
  const { handleStartExecution, isLoadingStartExecution } = useExecution();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TStartExecutionSchema>({
    resolver: zodResolver(startExecutionSchema),
  });

  const formattedLocations = locations.map(location => ({
    label: location.nome,
    value: location.id.toString(),
  }));

  const selectedLocation =
    formattedLocations.find(
      location => location.value === watch('local')?.idlocal.toString(),
    ) ?? null;

  const handleSelectLocal = useCallback(
    (item: SelectDropDownItem) => {
      const location = locations.find(
        location => location.id.toString() === item.value,
      );

      if (!location) {
        return;
      }

      setValue('local', {
        idlocal: location.id,
        idtipo: location.tipo.id,
      });
    },
    [locations, setValue],
  );

  const onSubmit: SubmitHandler<TStartExecutionSchema> = useCallback(
    async data => {
      await handleStartExecution(data.local);
      onClose();
      reset();
    },
    [handleStartExecution, onClose, reset],
  );

  useEffect(() => {
    if (isOpen) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AppModal title="Iniciar execução" isOpen={isOpen} onClose={onClose}>
      <S.Container>
        <Label title="Escolha um local">
          <SelectDropDown
            placeholder="Local"
            value={selectedLocation}
            items={formattedLocations}
            onSelectValue={handleSelectLocal}
            formError={errors.local?.message}
            isLoading={isLoadingLocations}
            isInModal
          />
        </Label>
      </S.Container>
      <S.Footer>
        <Button
          title="Iniciar"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoadingStartExecution}
        />
        <Button
          title="Cancelar"
          onPress={onClose}
          bgColor={theme.colors.backgroundDark}
          color={theme.colors.textPrimary}
          itsCancelButton
        />
      </S.Footer>
    </AppModal>
  );
};
