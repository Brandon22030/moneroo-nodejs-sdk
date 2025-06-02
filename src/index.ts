/**
 * Moneroo Node.js SDK
 * Official Node.js SDK for Moneroo payment integration in Africa
 * 
 * This SDK provides a simple interface to the Moneroo API for Node.js applications.
 * It allows you to initialize payments and check transaction statuses.
 * 
 * @module moneroo-nodejs-sdk
 */

import initiatePayment from './payment';
import checkTransactionStatus from './transaction';

// Export types
export * from './types';

// Export functions
export {
  initiatePayment,
  checkTransactionStatus
};
