import { PaymentInitParams, PaymentResponse } from './types';
import { PaymentMethods } from './methods';

/**
 * Initialize a payment with Moneroo and return the payment details.
 * This function creates a new payment transaction and returns a checkout URL
 * that can be used to redirect the customer to the Moneroo payment page.
 * 
 * @param params - Payment parameters including amount, currency, customer details, etc.
 * @param secretKey - Moneroo secret API key obtained from your Moneroo dashboard
 * @param baseUrl - Moneroo API base URL (optional, defaults to 'https://api.moneroo.io/v1')
 * @returns Created payment details including transaction ID and checkout URL
 * 
 * @example
 * // Basic payment initialization
 * const payment = await initiatePayment({
 *   amount: 1000, // 10.00 XOF (amount in cents)
 *   currency: 'XOF',
 *   description: 'Payment for order #123',
 *   email: 'customer@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   returnUrl: 'https://example.com/return'
 * }, 'your_secret_key');
 * 
 * console.log('Transaction ID:', payment.data.id);
 * console.log('Checkout URL:', payment.data.checkout_url);
 * 
 * // Redirect the customer to the checkout URL
 * // window.location.href = payment.data.checkout_url; // In browser context
 * 
 * @example
 * // Specifying a payment method
 * import { PaymentMethod } from 'moneroo-nodejs-sdk';
 * 
 * const payment = await initiatePayment({
 *   amount: 1000,
 *   currency: 'XOF',
 *   description: 'Payment for order #123',
 *   email: 'customer@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   returnUrl: 'https://example.com/return',
 *   paymentMethod: PaymentMethod.MtnBJ // Utilisation de l'énumération pour MTN Mobile Money au Bénin
 * }, 'your_secret_key');
 * 
 * @example
 * // Using a custom API base URL (for testing or staging environments)
 * const payment = await initiatePayment({
 *   amount: 1000,
 *   currency: 'XOF',
 *   description: 'Payment for order #123',
 *   email: 'customer@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   returnUrl: 'https://example.com/return'
 * }, 'your_secret_key', 'https://staging-api.moneroo.io/v1');
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
        methods: methods.length > 0 ? methods : ['mtn_bj']
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
