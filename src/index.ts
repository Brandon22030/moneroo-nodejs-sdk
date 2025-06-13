/**
 * Moneroo Node.js SDK
 * Official Node.js SDK for Moneroo payment integration in Africa
 * 
 * This SDK provides a simple interface to the Moneroo API for Node.js applications.
 * It allows you to initialize payments, check transaction statuses, and process payouts.
 * 
 * @module moneroo-nodejs-sdk
 */

import initiatePayment from './payment';
import checkTransactionStatus from './transaction';
import initiatePayout from './payout';
import { verifyPayout, getPayout } from './payout-status';
import { PaymentMethods, PaymentMethodUtils } from './methods';
import { PayoutMethods, PayoutMethodUtils } from './payout-methods';
import type { PaymentMethod, PaymentMethodDetails } from './methods';
import type { PayoutMethod, PayoutMethodDetails } from './payout-methods';

// Re-export types and interfaces
export * from './types';

// Export core functions
export { initiatePayment, checkTransactionStatus, initiatePayout, verifyPayout, getPayout };

// Re-export payment methods and types
export type { PaymentMethod, PaymentMethodDetails, PayoutMethodDetails };
export { PaymentMethods, PaymentMethodUtils, PayoutMethods, PayoutMethodUtils, PayoutMethod };

// Create default export with all functionality
const monerooSdk = {
  // Core functions
  initiatePayment,
  checkTransactionStatus,
  initiatePayout,
  verifyPayout,
  getPayout,
  
  // Payment methods and utilities
  PaymentMethods,
  PaymentMethodUtils,
  
  // Payout methods and utilities
  PayoutMethods,
  PayoutMethodUtils,
  
  // Aliases for backward compatibility
  methods: PaymentMethods,
  getPaymentMethodDetails: PaymentMethodUtils.getDetails,
  getPaymentMethods: PaymentMethodUtils.getAll,
  getPaymentMethodsByCountry: PaymentMethodUtils.getByCountry,
  getPaymentMethodsByCurrency: PaymentMethodUtils.getByCurrency
};

export default monerooSdk;
