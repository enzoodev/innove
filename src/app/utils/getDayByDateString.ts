const days = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export const getDayByDateString = (dateString?: string) => {
  if (!dateString) {
    return 'Sem data';
  }

  const date = new Date(dateString);
  const day = date.getDay();
  return days[day];
};
