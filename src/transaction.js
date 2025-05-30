'use strict';

/**
 * Check the status of a Moneroo transaction
 * 
 * @param {string} transactionId - Transaction ID
 * @param {string} secretKey - Moneroo secret API key
 * @param {string} [baseUrl] - Moneroo API base URL (optional)
 * @returns {Promise<Object>} - Transaction status
 * 
 * @example
 * // Check transaction status
 * const status = await checkTransactionStatus('tx_123456789', 'your_secret_key');
 * console.log(status.data.status); // 'completed', 'pending', 'failed', etc.
 */
async function checkTransactionStatus(transactionId, secretKey, baseUrl = 'https://api.moneroo.io/v1') {
  if (!secretKey) {
    throw new Error('A Moneroo API key is required');
  }

  try {
    const response = await fetch(`${baseUrl}/payments/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error checking transaction status:', error.message);
    throw error;
  }
}

module.exports = checkTransactionStatus;
