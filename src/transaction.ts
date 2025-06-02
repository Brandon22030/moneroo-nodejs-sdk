import { TransactionStatus } from './types';
import { PaymentMethod } from './methods';

/**
 * Check the status of a Moneroo transaction
 * 
 * @param transactionId - Transaction ID
 * @param secretKey - Moneroo secret API key
 * @param baseUrl - Moneroo API base URL (optional)
 * @returns Transaction status with payment method details
 * 
 * @example
 * // Check transaction status
 * const status = await checkTransactionStatus('tx_123456789', 'your_secret_key');
 * console.log('Status:', status.data.status); // 'completed', 'pending', 'failed', etc.
 * 
 * // Get payment method details
 * if (status.data.paymentMethod) {
 *   const methodDetails = PaymentMethodUtils.getDetails(status.data.paymentMethod);
 *   console.log('Payment method:', methodDetails.name);
 *   console.log('Supported countries:', methodDetails.countries.join(', '));
 * }
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

    const data = await response.json() as TransactionStatus;
    
    // Convertir le code de méthode de paiement en enum si présent
    if (data.data?.payment_method) {
      const methodCode = data.data.payment_method as keyof typeof PaymentMethod;
      if (methodCode in PaymentMethod) {
        data.data.paymentMethod = PaymentMethod[methodCode as keyof typeof PaymentMethod];
      }
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}

export default checkTransactionStatus;
