interface IRequestFormatter {
  format(data?: Record<string, unknown> | FormData): BodyInit | null;
}
