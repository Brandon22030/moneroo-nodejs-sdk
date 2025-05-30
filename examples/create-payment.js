'use strict';

// Load environment variables from .env file
require('dotenv').config();

// Import Moneroo SDK
const { initiatePayment, checkTransactionStatus } = require('../src/index');

// Check if API key is defined
if (!process.env.MONEROO_API_KEY) {
  console.error('Error: MONEROO_API_KEY environment variable is not defined.');
  console.error('Create a .env file at the root of the project with your API key:');
  console.error('MONEROO_API_KEY=your_api_key');
  process.exit(1);
}

// Example of payment initialization
async function createPayment() {
  try {
    // Payment data
    const paymentData = {
      amount: 1000, // Amount in cents (10.00)
      currency: 'XOF',
      description: 'Test payment via Node.js SDK',
      email: 'customer@example.com',
      firstName: 'Customer',
      lastName: 'Test',
      returnUrl: 'https://example.com/callback',
      methods: ['mtn_bj', 'moov_bj'] // Accepted payment methods
    };

    console.log('Initializing payment...');
    const payment = await initiatePayment(paymentData, process.env.MONEROO_API_KEY);
    
    console.log('Payment successfully initialized:');
    console.log(JSON.stringify(payment, null, 2));
    
    // In a browser environment, the user would be redirected to the payment URL
    console.log('Payment URL:', payment.data.checkout_url);
    
    // In a Node.js environment, you can store the transaction ID to check its status later
    console.log('Transaction ID:', payment.data.id);
    
    return payment;
  } catch (error) {
    console.error('Error initializing payment:');
    if (error.response?.data) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

// Example of checking transaction status
async function checkStatus(transactionId) {
  try {
    console.log(`Checking status of transaction ${transactionId}...`);
    const status = await checkTransactionStatus(transactionId, process.env.MONEROO_API_KEY);
    
    console.log('Transaction status:');
    console.log(JSON.stringify(status, null, 2));
    
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

// Run the payment creation example
createPayment().then(payment => {
  if (payment && payment.data && payment.data.id) {
    // Wait 5 seconds before checking the status
    setTimeout(() => {
      checkStatus(payment.data.id);
    }, 5000);
  }
});
