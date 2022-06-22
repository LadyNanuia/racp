export function getErrorMessage<T extends ErrorLike>(
  error?: T
): string | undefined {
  if (!error) {
    return;
  }
  if ("error" in error) {
    return `${error.error}`;
  }
  if ("message" in error) {
    return `${error.message}`;
  }
  if ("data" in error) {
    return error.data && typeof error.data === "object"
      ? getErrorMessage(error.data)
      : `${error.data}`;
  }
}

type ErrorLike =
  | { error?: string }
  | { message?: string }
  | { data?: Record<string, unknown> | unknown };
