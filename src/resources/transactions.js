'use strict';

/**
 * Module pour gérer les transactions via l'API Moneroo
 * @param {Object} moneroo - Instance du client Moneroo
 * @returns {Object} - Méthodes pour interagir avec les transactions
 */
module.exports = function(moneroo) {
  return {
    /**
     * Récupère les détails d'une transaction
     * @param {string} transactionId - ID de la transaction
     * @returns {Promise<Object>} - Réponse de l'API
     */
    retrieve: async function(transactionId) {
      try {
        const response = await moneroo.client.get(`/transactions/${transactionId}`);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Liste les transactions
     * @param {Object} params - Paramètres de filtrage
     * @returns {Promise<Object>} - Réponse de l'API
     */
    list: async function(params = {}) {
      try {
        const response = await moneroo.client.get('/transactions', { params });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    }
  };
};

/**
 * Gère les erreurs de l'API
 * @param {Error} error - Erreur Axios
 * @returns {Error} - Erreur formatée
 */
function handleApiError(error) {
  if (error.response) {
    // L'API a répondu avec un code d'erreur
    const { status, data } = error.response;
    const message = data.message || `Erreur API (${status})`;
    const apiError = new Error(message);
    apiError.status = status;
    apiError.data = data;
    return apiError;
  }
  
  // Erreur réseau ou autre
  return error;
}
