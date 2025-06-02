import { TransactionStatus } from './types';

/**
 * Check the status of a Moneroo transaction
 * 
 * @param transactionId - Transaction ID
 * @param secretKey - Moneroo secret API key
 * @param baseUrl - Moneroo API base URL (optional)
 * @returns Transaction status
 * 
 * @example
 * // Check transaction status
 * const status = await checkTransactionStatus('tx_123456789', 'your_secret_key');
 * console.log(status.data.status); // 'completed', 'pending', 'failed', etc.
 */
async function checkTransactionStatus(
  transactionId: string, 
  secretKey: string, 
  baseUrl: string = 'https://api.moneroo.io/v1'
): Promise<TransactionStatus> {
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

    return await response.json() as TransactionStatus;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}

export default checkTransactionStatus;
