import { PayoutInitParams, PayoutResponse } from './types';
import { PayoutMethods } from './payout-methods';

/**
 * Initiates a payout with Moneroo and returns the payout details.
 * This function creates a new payout transaction to send money to a customer.
 * 
 * @param params - Payout parameters including amount, currency, customer details, etc.
 * @param secretKey - Moneroo secret API key obtained from your Moneroo dashboard
 * @param baseUrl - Base URL of the Moneroo API (optional, defaults to 'https://api.moneroo.io/v1')
 * @returns Created payout details, including the transaction ID
 * 
 * @example
 * // Basic payout initialization to MTN Mobile Money Benin
 * const payout = await initiatePayout({
 *   amount: 1000, // 10.00 XOF (amount in cents)
 *   currency: 'XOF',
 *   description: 'Refund for order #123',
 *   customer: {
 *     email: 'customer@example.com',
 *     first_name: 'John',
 *     last_name: 'Doe'
 *   },
 *   method: 'mtn_bj',
 *   msisdn: '22912345678' // MTN Benin phone number
 * }, 'your_secret_key');
 * 
 * console.log('Transaction ID:', payout.data.id);
 * 
 * @example
 * // Using a custom API URL (for test or staging environments)
 * const payout = await initiatePayout({
 *   amount: 1000,
 *   currency: 'XOF',
 *   description: 'Refund for order #123',
 *   customer: {
 *     email: 'customer@example.com',
 *     first_name: 'John',
 *     last_name: 'Doe'
 *   },
 *   method: 'mtn_bj',
 *   msisdn: '22912345678'
 * }, 'your_secret_key', 'https://staging-api.moneroo.io/v1');
 */
async function initiatePayout(
  params: PayoutInitParams, 
  secretKey: string, 
  baseUrl: string = 'https://api.moneroo.io/v1'
): Promise<PayoutResponse> {
  if (!secretKey) {
    throw new Error('A Moneroo API key is required');
  }

  // Validate the payout method
  if (!(params.method in PayoutMethods)) {
    throw new Error(`Invalid payout method: ${params.method}`);
  }

  // Check required fields for the specified payout method
  const methodDetails = PayoutMethods[params.method];
  const requiredFields = methodDetails.requiredFields;
  
  for (const field of requiredFields) {
    if (!(field in params) || !params[field as keyof PayoutInitParams]) {
      throw new Error(`Field '${field}' is required for payout method '${params.method}'`);
    }
  }

  try {
    const payloadData: Record<string, unknown> = {
      amount: params.amount,
      currency: params.currency,
      description: params.description,
      customer: params.customer,
      method: params.method,
      metadata: params.metadata || {}
    };

    // Ajouter les champs spécifiques à la méthode de payout
    if (params.msisdn) {
      payloadData.msisdn = params.msisdn;
    }
    
    if (params.phone) {
      payloadData.phone = params.phone;
    }
    
    if (params.account_number) {
      payloadData.account_number = params.account_number;
    }

    const response = await fetch(`${baseUrl}/payouts/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(payloadData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json() as PayoutResponse;

    if (!data.data?.id) {
      throw new Error('Transaction ID missing in response!');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}

export default initiatePayout;
