import { PaymentInitParams, PaymentResponse } from './types';
import { PaymentMethods } from './methods';

/**
 * Initialize a payment with Moneroo and return the payment details
 * 
 * @param params - Payment parameters
 * @param secretKey - Moneroo secret API key
 * @param baseUrl - Moneroo API base URL (optional)
 * @returns Created payment details
 * 
 * @example
 * // Initialize a payment
 * const payment = await initiatePayment({
 *   amount: 1000, // 10.00 XOF
 *   currency: 'XOF',
 *   description: 'Payment for order #123',
 *   email: 'customer@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   returnUrl: 'https://example.com/return',
 *   paymentMethod: 'mtn_bj' // Utilisation d'une valeur de l'énumération PaymentMethod
 * }, 'your_secret_key');
 * 
 * @example
 * // Utilisation avec une méthode de paiement spécifique via l'énumération
 * import { PaymentMethod } from 'moneroo-nodejs-sdk';
 * 
 * const payment = await initiatePayment({
 *   // ... autres paramètres
 *   paymentMethod: PaymentMethod.MtnBJ // Utilisation de l'énumération
 * }, 'your_secret_key');
 */
async function initiatePayment(
  params: PaymentInitParams, 
  secretKey: string, 
  baseUrl: string = 'https://api.moneroo.io/v1'
): Promise<PaymentResponse> {
  if (!secretKey) {
    throw new Error('A Moneroo API key is required');
  }

  // Valider la méthode de paiement si elle est fournie
  if (params.paymentMethod && !(params.paymentMethod in PaymentMethods)) {
    throw new Error(`Invalid payment method: ${params.paymentMethod}`);
  }

  // Préparer les méthodes de paiement pour l'API
  const methods = params.paymentMethod 
    ? [params.paymentMethod]
    : params.methods || [];

  try {
    const response = await fetch(`${baseUrl}/payments/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency,
        description: params.description,
        customer: {
          email: params.email,
          first_name: params.firstName,
          last_name: params.lastName
        },
        return_url: params.returnUrl,
        methods: methods.length > 0 ? methods : undefined
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json() as PaymentResponse;

    if (!data.data?.checkout_url) {
      throw new Error('checkout_url is missing!');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}

export default initiatePayment;
