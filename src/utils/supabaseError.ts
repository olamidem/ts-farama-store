export function throwSupabaseError(
  error: { message: string } | null | undefined,
) {
  if (error) {
    throw new Error(error.message);
  }
}
