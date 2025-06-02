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
import { PaymentMethods, PaymentMethodUtils } from './methods';
import type { PaymentMethod, PaymentMethodDetails } from './methods';

// Re-export types and interfaces
export * from './types';

// Export core functions
export { initiatePayment, checkTransactionStatus };

// Re-export payment methods and types
export type { PaymentMethod, PaymentMethodDetails };
export { PaymentMethods, PaymentMethodUtils };

// Create default export with all functionality
const monerooSdk = {
  // Core functions
  initiatePayment,
  checkTransactionStatus,
  
  // Payment methods and utilities
  PaymentMethods,
  PaymentMethodUtils,
  
  // Aliases for backward compatibility
  methods: PaymentMethods,
  getPaymentMethodDetails: PaymentMethodUtils.getDetails,
  getPaymentMethods: PaymentMethodUtils.getAll,
  getPaymentMethodsByCountry: PaymentMethodUtils.getByCountry,
  getPaymentMethodsByCurrency: PaymentMethodUtils.getByCurrency
};

export default monerooSdk;
