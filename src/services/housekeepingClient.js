const fetch = global.fetch;

async function updateRoomStatusByNumero(numero, statut, motifBlocage, authToken) {
  if (!numero) {
    throw new Error('Numéro de chambre requis pour la synchronisation');
  }

  const url = `${process.env.HOUSEKEEPING_SERVICE_URL}/api/rooms/numero/${encodeURIComponent(numero)}/status`;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: authToken } : {})
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ statut, motifBlocage: motifBlocage || null })
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
      const message = typeof payload === 'object' && payload ? payload.error || payload.message : payload;
      const error = new Error(message || `Erreur HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }

    return payload;
  } catch (err) {
    if (err instanceof Error) {
      const msg = (err.message || '').toString();
      const isNetworkError = err.name === 'FetchError' || msg.startsWith('request to') || msg.toLowerCase().includes('fetch') || err.code === 'ECONNREFUSED';
      if (isNetworkError) {
        const error = new Error(`Impossible de joindre le service housekeeping: ${err.message}`);
        error.status = 502;
        throw error;
      }
      throw err;
    }
    const error = new Error('Erreur inattendue lors de l’appel housekeeping');
    error.status = 502;
    throw error;
  }
}

module.exports = {
  updateRoomStatusByNumero
};
