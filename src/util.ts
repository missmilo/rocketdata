export const buildQueryParams = (params: Record<string, any>): string => {
    const query = new URLSearchParams();
  
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    }
    return query.toString();
  }
  