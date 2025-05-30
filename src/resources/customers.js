'use strict';

/**
 * Module pour gérer les clients via l'API Moneroo
 * @param {Object} moneroo - Instance du client Moneroo
 * @returns {Object} - Méthodes pour interagir avec les clients
 */
module.exports = function(moneroo) {
  return {
    /**
     * Crée un nouveau client
     * @param {Object} data - Données du client
     * @returns {Promise<Object>} - Réponse de l'API
     */
    create: async function(data) {
      try {
        const response = await moneroo.client.post('/customers', data);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Récupère les détails d'un client
     * @param {string} customerId - ID du client
     * @returns {Promise<Object>} - Réponse de l'API
     */
    retrieve: async function(customerId) {
      try {
        const response = await moneroo.client.get(`/customers/${customerId}`);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Liste les clients
     * @param {Object} params - Paramètres de filtrage
     * @returns {Promise<Object>} - Réponse de l'API
     */
    list: async function(params = {}) {
      try {
        const response = await moneroo.client.get('/customers', { params });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Met à jour un client
     * @param {string} customerId - ID du client
     * @param {Object} data - Données à mettre à jour
     * @returns {Promise<Object>} - Réponse de l'API
     */
    update: async function(customerId, data) {
      try {
        const response = await moneroo.client.patch(`/customers/${customerId}`, data);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Supprime un client
     * @param {string} customerId - ID du client
     * @returns {Promise<Object>} - Réponse de l'API
     */
    delete: async function(customerId) {
      try {
        const response = await moneroo.client.delete(`/customers/${customerId}`);
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
