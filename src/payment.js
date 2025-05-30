'use strict';

/**
 * Initialize a payment with Moneroo and return the payment details
 * 
 * @param {Object} params - Payment parameters
 * @param {number} params.amount - Payment amount (in cents)
 * @param {string} params.currency - Payment currency (e.g. XOF)
 * @param {string} params.description - Payment description
 * @param {string} params.email - Customer email
 * @param {string} params.firstName - Customer first name
 * @param {string} params.lastName - Customer last name
 * @param {string} params.returnUrl - Return URL after payment
 * @param {Array<string>} [params.methods] - Accepted payment methods (e.g. ['mtn_bj'])
 * @param {string} secretKey - Moneroo secret API key
 * @param {string} [baseUrl] - Moneroo API base URL (optional)
 * @returns {Promise<Object>} - Created payment details
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
 *   methods: ['mtn_bj']
 * }, 'your_secret_key');
 */
async function initiatePayment(params, secretKey, baseUrl = 'https://api.moneroo.io/v1') {
  if (!secretKey) {
    throw new Error('A Moneroo API key is required');
  }

  console.log('🔍 SDK - Data sent:', params);

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
        methods: params.methods || ['mtn_bj']
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Moneroo response:', data);

    if (!data.data?.checkout_url) {
      console.error('❌ checkout_url is missing in the response!');
      throw new Error('checkout_url is missing!');
    }

    return data;
  } catch (error) {
    console.error('❌ Error initializing payment:', error.message);
    throw error;
  }
}

module.exports = initiatePayment;
