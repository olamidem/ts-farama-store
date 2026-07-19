export function getStatusBadge<T extends string>(
  status: T,
  styles: Record<T, string>,
) {
  return styles[status];
}
