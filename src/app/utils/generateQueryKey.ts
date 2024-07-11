export const generateQueryKey = (
  queryKey: string,
  refreshKey: number,
  params: Record<string, unknown> = {},
) => {
  const paramsValues = Object.values(params);
  return [queryKey, refreshKey, ...paramsValues];
};
