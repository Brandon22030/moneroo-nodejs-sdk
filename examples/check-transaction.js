'use strict';

// Load environment variables from .env file
require('dotenv').config();

// Import Moneroo SDK
const { checkTransactionStatus } = require('../src/index');

// Check if API key is defined
if (!process.env.MONEROO_API_KEY) {
  console.error('Error: MONEROO_API_KEY environment variable is not defined.');
  console.error('Create a .env file at the root of the project with your API key:');
  console.error('MONEROO_API_KEY=your_api_key');
  process.exit(1);
}

// Check if transaction ID is provided
const transactionId = process.argv[2];
if (!transactionId) {
  console.error('Error: Please provide a transaction ID.');
  console.error('Usage: node check-transaction.js <transaction_id>');
  process.exit(1);
}

// Example of checking transaction status
async function checkStatus() {
  try {
    console.log(`Checking status of transaction ${transactionId}...`);
    const status = await checkTransactionStatus(transactionId, process.env.MONEROO_API_KEY);
    
    console.log('Transaction status:');
    console.log(JSON.stringify(status, null, 2));
    
    // Display a message based on the status
    if (status.data && status.data.status) {
      switch (status.data.status) {
      case 'pending':
        console.log('⏳ Transaction is pending payment.');
        break;
      case 'success':
        console.log('✅ Transaction was paid successfully.');
        break;
      case 'failed':
        console.log('❌ Transaction failed.');
        break;
      case 'cancelled':
        console.log('🚫 Transaction was cancelled.');
        break;
      default:
        console.log(`ℹ️ Transaction status: ${status.data.status}`);
      }
    }
    
    return status;
  } catch (error) {
    console.error('Error checking transaction status:');
    if (error.response?.data) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

// Run the example
checkStatus();
