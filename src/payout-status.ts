import { PayoutStatus } from './types';

/**
 * Verifies the status of a payout transaction with Moneroo.
 * This function allows checking if a payout has been processed successfully.
 * 
 * @param payoutId - ID of the payout transaction to verify
 * @param secretKey - Moneroo secret API key obtained from your Moneroo dashboard
 * @param baseUrl - Base URL of the Moneroo API (optional, defaults to 'https://api.moneroo.io/v1')
 * @returns Detailed status of the payout transaction
 * 
 * @example
 * // Verifying the status of a payout
 * const status = await verifyPayout('payout_id_123', 'your_secret_key');
 * console.log('Payout status:', status.data.status);
 * 
 * @example
 * // Using a custom API URL
 * const status = await verifyPayout(
 *   'payout_id_123', 
 *   'your_secret_key', 
 *   'https://staging-api.moneroo.io/v1'
 * );
 */
async function verifyPayout(
  payoutId: string,
  secretKey: string,
  baseUrl: string = 'https://api.moneroo.io/v1'
): Promise<PayoutStatus> {
  if (!secretKey) {
    throw new Error('A Moneroo API key is required');
  }

  if (!payoutId) {
    throw new Error('Payout ID is required');
  }

  try {
    const response = await fetch(`${baseUrl}/payouts/${payoutId}/verify`, {
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

    const data = await response.json() as PayoutStatus;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}

/**
 * Retrieves the details of a payout transaction with Moneroo.
 * 
 * @param payoutId - ID of the payout transaction to retrieve
 * @param secretKey - Moneroo secret API key obtained from your Moneroo dashboard
 * @param baseUrl - Base URL of the Moneroo API (optional, defaults to 'https://api.moneroo.io/v1')
 * @returns Complete details of the payout transaction
 * 
 * @example
 * // Retrieving details of a payout
 * const payoutDetails = await getPayout('payout_id_123', 'your_secret_key');
 * console.log('Payout details:', payoutDetails.data);
 */
async function getPayout(
  payoutId: string,
  secretKey: string,
  baseUrl: string = 'https://api.moneroo.io/v1'
): Promise<PayoutStatus> {
  if (!secretKey) {
    throw new Error('A Moneroo API key is required');
  }

  if (!payoutId) {
    throw new Error('Payout ID is required');
  }

  try {
    const response = await fetch(`${baseUrl}/payouts/${payoutId}`, {
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

    const data = await response.json() as PayoutStatus;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}

export { verifyPayout, getPayout };
