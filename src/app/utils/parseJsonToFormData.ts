export const parseJsonToFormData = (json?: unknown): FormData | null => {
  if (!json) {
    return null;
  }

  const formData = new FormData();

  Object.keys(json).forEach(key => {
    formData.append(key, (json as any)[key]);
  });

  return formData;
};
