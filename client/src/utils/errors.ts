export function parseApiError(err: any): string {
  // Maneja axios errors y formatos comunes (DRF)
  if (!err) return 'Error desconocido';

  // Axios with response
  const resp = err.response;
  if (resp) {
    const data = resp.data;
    if (data == null) return `Error ${resp.status || ''}`;

    if (typeof data === 'string') return data;
    if (data.detail) return data.detail;
    if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
      return String(data.non_field_errors[0]);
    }

    // Si vienen errores por campo, concatena algunos
    if (typeof data === 'object') {
      const parts: string[] = [];
      for (const k of Object.keys(data)) {
        const v = data[k];
        if (Array.isArray(v)) parts.push(`${k}: ${v[0]}`);
        else parts.push(`${k}: ${String(v)}`);
      }
      if (parts.length) return parts.join(' — ');
    }
  }

  // Axios network or other message
  if (err.message) return err.message;
  return 'Error en la comunicación con el servidor';
}