'use strict';

/**
 * @typedef {Object} PaymentInitParams
 * @property {number} amount - Payment amount (in cents)
 * @property {string} currency - Payment currency (e.g. XOF)
 * @property {string} description - Payment description
 * @property {string} email - Customer email
 * @property {string} firstName - Customer first name
 * @property {string} lastName - Customer last name
 * @property {string} returnUrl - Return URL after payment
 * @property {Array<string>} [methods] - Accepted payment methods (e.g. ['mtn_bj'])
 */

/**
 * @typedef {Object} PaymentResponse
 * @property {string} message - Response message
 * @property {Object} data - Response data
 * @property {string} data.id - Transaction ID
 * @property {string} data.checkout_url - URL to redirect the customer to
 * @property {Object} [errors] - Errors if any
 */

/**
 * @typedef {Object} TransactionStatus
 * @property {string} message - Response message
 * @property {Object} data - Response data
 * @property {string} data.id - Transaction ID
 * @property {string} data.status - Transaction status (e.g. 'completed', 'pending', 'failed')
 * @property {string} data.amount - Transaction amount
 * @property {string} data.currency - Transaction currency
 * @property {Object} data.customer - Customer information
 * @property {string} data.created_at - Creation date
 * @property {string} data.updated_at - Last update date
 */

// Ce fichier ne contient que des définitions de types JSDoc et n'exporte rien
module.exports = {};
