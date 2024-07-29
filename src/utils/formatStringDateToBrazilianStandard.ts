export const formatStringDateToBrazilianStandard = (
  dateString: string,
): string => {
  if (!dateString || dateString.trim().length === 0) {
    return 'Sem data';
  }

  const dateParts = dateString.split('-');
  const parsedYear = parseInt(dateParts[0]);
  const parsedMonth = parseInt(dateParts[1]) - 1;
  const parsedDay = parseInt(dateParts[2]);

  const date = new Date(parsedYear, parsedMonth, parsedDay);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
