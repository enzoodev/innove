export const parseJsonToFormData = (
  json?: Record<string, unknown>,
): FormData | null => {
  if (!json) {
    return null;
  }

  const formData = new FormData();
  formData.append('json', JSON.stringify(json));

  return formData;
};
