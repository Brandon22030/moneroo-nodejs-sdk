'use strict';

/**
 * Module pour gérer les paiements via l'API Moneroo
 * @param {Object} moneroo - Instance du client Moneroo
 * @returns {Object} - Méthodes pour interagir avec les paiements
 */
module.exports = function(moneroo) {
  return {
    /**
     * Crée un nouveau paiement
     * @param {Object} data - Données du paiement
     * @returns {Promise<Object>} - Réponse de l'API
     */
    create: async function(data) {
      try {
        const response = await moneroo.client.post('/payments', data);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Récupère les détails d'un paiement
     * @param {string} paymentId - ID du paiement
     * @returns {Promise<Object>} - Réponse de l'API
     */
    retrieve: async function(paymentId) {
      try {
        const response = await moneroo.client.get(`/payments/${paymentId}`);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Liste les paiements
     * @param {Object} params - Paramètres de filtrage
     * @returns {Promise<Object>} - Réponse de l'API
     */
    list: async function(params = {}) {
      try {
        const response = await moneroo.client.get('/payments', { params });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Annule un paiement
     * @param {string} paymentId - ID du paiement
     * @returns {Promise<Object>} - Réponse de l'API
     */
    cancel: async function(paymentId) {
      try {
        const response = await moneroo.client.post(`/payments/${paymentId}/cancel`);
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
