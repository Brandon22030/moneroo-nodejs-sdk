import { TransactionStatus } from './types';
import { PaymentMethod } from './methods';

/**
 * Check the status of a Moneroo transaction.
 * This function retrieves the current status of a payment transaction using its ID.
 * It returns detailed information about the transaction including its status, amount,
 * currency, customer details, and the payment method used.
 * 
 * @param transactionId - Transaction ID (usually starts with 'tx_')
 * @param secretKey - Moneroo secret API key obtained from your Moneroo dashboard
 * @param baseUrl - Moneroo API base URL (optional, defaults to 'https://api.moneroo.io/v1')
 * @returns Transaction status object with detailed payment information
 * 
 * @example
 * // Basic transaction status check
 * const status = await checkTransactionStatus('tx_123456789', 'your_secret_key');
 * 
 * // Check if the payment is completed
 * if (status.data.status === 'completed') {
 *   console.log('Payment successful!');
 *   console.log('Amount:', status.data.amount, status.data.currency);
 *   console.log('Customer:', status.data.customer.first_name, status.data.customer.last_name);
 * } else if (status.data.status === 'pending') {
 *   console.log('Payment is still pending. Please try again later.');
 * } else {
 *   console.log('Payment failed or was cancelled.');
 * }
 * 
 * @example
 * // Get detailed payment method information
 * import { PaymentMethodUtils } from 'moneroo-nodejs-sdk';
 * 
 * const status = await checkTransactionStatus('tx_123456789', 'your_secret_key');
 * 
 * if (status.data.paymentMethod) {
 *   const methodDetails = PaymentMethodUtils.getDetails(status.data.paymentMethod);
 *   console.log('Payment method:', methodDetails.name);
 *   console.log('Provider:', methodDetails.provider);
 *   console.log('Supported countries:', methodDetails.countries.join(', '));
 *   console.log('Supported currencies:', methodDetails.currencies.join(', '));
 * }
 * 
 * @example
 * // Using a custom API base URL (for testing or staging environments)
 * const status = await checkTransactionStatus(
 *   'tx_123456789',
 *   'your_secret_key',
 *   'https://staging-api.moneroo.io/v1'
 * );
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
      // La valeur payment_method est déjà le code (ex: 'mtn_bj')
      // On l'assigne directement à paymentMethod
      data.data.paymentMethod = data.data.payment_method as PaymentMethod;
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
