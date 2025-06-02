/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import { initiatePayment, checkTransactionStatus } from '../src';

// Charger les variables d'environnement
dotenv.config();

// Récupérer la clé API et s'assurer qu'elle est définie
const apiKey = process.env.MONEROO_API_KEY;

if (!apiKey) {
  // eslint-disable-next-line no-console
  console.error('❌ Error: MONEROO_API_KEY is required in the .env file');
  // eslint-disable-next-line no-console
  console.log('Make sure the .env file contains a line like this:');
  // eslint-disable-next-line no-console
  console.log('MONEROO_API_KEY=your_api_key_here');
  process.exit(1);
}

// Debug message
// eslint-disable-next-line no-console
console.log('🔧 Starting script with API key:', apiKey ? 'Defined' : 'Not defined');

// Paramètres de paiement
const paymentParams = {
  amount: 1000, // 10.00 XOF
  currency: 'XOF',
  description: 'Test payment via Node.js SDK',
  email: 'customer@example.com',
  firstName: 'Customer',
  lastName: 'Test',
  returnUrl: 'https://example.com/callback',
  methods: ['mtn_bj', 'moov_bj']
};

// Fonction principale asynchrone
async function main() {
  try {
    // eslint-disable-next-line no-console
    console.log('🔄 Initializing payment...');
    
    // Ensure apiKey is defined
    if (!apiKey) {
      throw new Error('API key is undefined');
    }
    
    // Initialiser le paiement
    const payment = await initiatePayment(paymentParams, apiKey);
    
    // Validate the response
    if (!payment || !payment.data) {
      throw new Error('Invalid payment response');
    }
    
    // Display payment details
    // eslint-disable-next-line no-console
    console.log('✅ Payment initialized successfully!');
    // eslint-disable-next-line no-console
    console.log('📋 Payment details:');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(payment, null, 2));
    
    // Display payment URL and transaction ID
    // eslint-disable-next-line no-console
    console.log('🔗 Payment URL:', payment.data.checkout_url);
    // eslint-disable-next-line no-console
    console.log('🆔 Transaction ID:', payment.data.id);
    
    // Check transaction status (optional)
    // eslint-disable-next-line no-console
    console.log('\n🔄 Checking transaction status...');
    
    // Check status
    const status = await checkTransactionStatus(payment.data.id, apiKey);
    
    // Display status
    // eslint-disable-next-line no-console
    console.log('📊 Transaction status:');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(status, null, 2));
    
    // Display success message
    // eslint-disable-next-line no-console
    console.log('\n✨ Task completed successfully!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('\n❌ An error occurred:');
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error('Message:', error.message);
      if (error.stack) {
        // eslint-disable-next-line no-console
        console.error('Stack:', error.stack.split('\n').slice(0, 3).join('\n'));
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Unknown error:', String(error));
    }
    process.exit(1);
  }
}

// Exécuter la fonction principale
main();
