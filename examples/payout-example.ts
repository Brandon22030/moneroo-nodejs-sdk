/**
 * Example of using the payout features of the Moneroo SDK
 * 
 * This example shows how to:
 * 1. Initialize a payout to MTN Mobile Money Benin
 * 2. Verify the status of a payout
 * 3. Retrieve the details of a payout
 * 
 * To run this example, you need a valid Moneroo API key.
 * You can obtain an API key from your Moneroo dashboard.
 */

// Import the Moneroo SDK functions and types
import { 
  initiatePayout, 
  verifyPayout, 
  getPayout, 
  PayoutMethod 
} from '../src';

// Load environment variables from a .env file
import dotenv from 'dotenv';
dotenv.config();

// Get the API key from environment variables
const MONEROO_API_KEY = process.env.MONEROO_API_KEY as string;
// Use the sandbox API URL for testing
const MONEROO_API_URL = process.env.MONEROO_API_URL || 'https://api.moneroo.io/v1';

// Main async function
async function main(): Promise<void> {
  try {
    // eslint-disable-next-line no-console
    console.log('Initializing a payout to MTN Mobile Money Benin...');
    
    // 1. Initialize a payout
    const payout = await initiatePayout({
      amount: 1000, // 10.00 XOF (amount in cents)
      currency: 'XOF',
      description: 'Refund for order #123',
      customer: {
        email: 'customer@example.com',
        first_name: 'John',
        last_name: 'Doe'
      },
      method: PayoutMethod.MtnBJ, // Using the enum for MTN Mobile Money Benin
      // MTN Benin phone number (for tests, use a valid test number)
      msisdn: '22912345678',
      // Optional metadata
      metadata: {
        order_id: '123',
        customer_id: '456'
      }
    }, MONEROO_API_KEY, MONEROO_API_URL);
    
    // eslint-disable-next-line no-console
    console.log('Payout initialized successfully!');
    // eslint-disable-next-line no-console
    console.log('Transaction ID:', payout.data.id);
    
    // Wait a few seconds for the payout to be processed
    // eslint-disable-next-line no-console
    console.log('Waiting for 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 2. Verify the status of the payout
    // eslint-disable-next-line no-console
    console.log('\nVerifying payout status...');
    const payoutStatus = await verifyPayout(
      payout.data.id,
      MONEROO_API_KEY,
      MONEROO_API_URL
    );
    
    // eslint-disable-next-line no-console
    console.log('Payout status:', payoutStatus.data.status);
    // eslint-disable-next-line no-console
    console.log('Is processed:', payoutStatus.data.is_processed ? 'Yes' : 'No');
    
    // 3. Retrieve the complete details of the payout
    // eslint-disable-next-line no-console
    console.log('\nRetrieving payout details...');
    const payoutDetails = await getPayout(
      payout.data.id,
      MONEROO_API_KEY,
      MONEROO_API_URL
    );
    
    // eslint-disable-next-line no-console
    console.log('Payout details:');
    // eslint-disable-next-line no-console
    console.log('- Amount:', payoutDetails.data.amount_formatted);
    // eslint-disable-next-line no-console
    console.log('- Currency:', payoutDetails.data.currency);
    // eslint-disable-next-line no-console
    console.log('- Description:', payoutDetails.data.description);
    // eslint-disable-next-line no-console
    console.log('- Customer:', `${payoutDetails.data.customer.first_name} ${payoutDetails.data.customer.last_name}`);
    // eslint-disable-next-line no-console
    console.log('- Method:', payoutDetails.data.method.name);
    // eslint-disable-next-line no-console
    console.log('- Environment:', payoutDetails.data.environment);
    // eslint-disable-next-line no-console
    console.log('- Initiated at:', new Date(payoutDetails.data.initiated_at).toLocaleString());
    
    if (payoutDetails.data.processed_at) {
      // eslint-disable-next-line no-console
      console.log('- Processed at:', new Date(payoutDetails.data.processed_at).toLocaleString());
    }
    
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing payout:', error instanceof Error ? error.message : String(error));
  }
}

// Run the main function
main().catch(error => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', error);
  process.exit(1);
});
