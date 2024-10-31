export function qs(params: Record<string, unknown>): string {
  const queryString = Object.keys(params)
    .map(key => {
      if (params[key] !== undefined) return `${key}=${params[key]}`;
    })
    .join('&');

  return `${queryString}`;
}
