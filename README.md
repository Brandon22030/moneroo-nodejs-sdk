# Moneroo Node.js SDK

[![npm version](https://img.shields.io/npm/v/moneroo-nodejs-sdk.svg)](https://www.npmjs.com/package/moneroo-nodejs-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight Node.js SDK for integrating with the [Moneroo](https://moneroo.io) payment platform. This SDK allows you to easily initialize payments and check transaction status using the Moneroo API.

## Features

- Initialize payments with various payment methods
- Check transaction status
- Lightweight with minimal dependencies
- Promise-based API with async/await support
- Comprehensive error handling

## Installation

### Using npm
```bash
npm install moneroo-nodejs-sdk
```

### Using pnpm (recommended)
```bash
pnpm add moneroo-nodejs-sdk
```

## Requirements

- Node.js 12.0.0 or higher
- A Moneroo account and API key

## Configuration

Create a `.env` file at the root of your project and add your Moneroo API key:

```
MONEROO_API_KEY=your_api_key
```

You can obtain your API key from the [Moneroo Dashboard](https://dashboard.moneroo.io).

## Quick Start

```javascript
const { initiatePayment, checkTransactionStatus } = require('moneroo-nodejs-sdk');
require('dotenv').config();

// Initialize a payment
async function createPayment() {
  try {
    const payment = await initiatePayment({
      amount: 1000, // Amount in cents (10.00)
      currency: 'XOF',
      description: 'Test payment',
      email: 'customer@example.com',
      firstName: 'Customer',
      lastName: 'Test',
      returnUrl: 'https://example.com/callback',
      methods: ['mtn_bj', 'moov_bj'] // Accepted payment methods
    }, process.env.MONEROO_API_KEY);
    
    console.log('Payment URL:', payment.data.checkout_url);
    console.log('Transaction ID:', payment.data.id);
    return payment;
  } catch (error) {
    console.error('Error initializing payment:', error.message);
    throw error;
  }
}

// Check transaction status
async function checkStatus(transactionId) {
  try {
    const status = await checkTransactionStatus(
      transactionId,
      process.env.MONEROO_API_KEY
    );
    
    console.log('Transaction status:', status.data.status);
    return status;
  } catch (error) {
    console.error('Error checking transaction status:', error.message);
    throw error;
  }
}
```

## API Reference

### initiatePayment(params, secretKey, [baseUrl])

Initializes a payment and returns the payment details, including a checkout URL.

**Parameters:**

- `params` (Object): Payment parameters
  - `amount` (Number): Payment amount in cents (e.g., 1000 for 10.00)
  - `currency` (String): Payment currency (e.g., 'XOF')
  - `description` (String): Payment description
  - `email` (String): Customer email
  - `firstName` (String): Customer first name
  - `lastName` (String): Customer last name
  - `returnUrl` (String): URL to redirect to after payment
  - `methods` (Array, optional): Accepted payment methods (e.g., ['mtn_bj', 'moov_bj'])
- `secretKey` (String): Moneroo secret API key
- `baseUrl` (String, optional): Moneroo API base URL (default: 'https://api.moneroo.io/v1')

**Returns:**

A Promise that resolves to the payment response object:

```javascript
{
  message: "Transaction initialized successfully",
  data: {
    id: "py_xxxxxxxx",
    checkout_url: "https://checkout.moneroo.io/py_xxxxxxxx"
  },
  errors: null
}
```

### checkTransactionStatus(transactionId, secretKey, [baseUrl])

Checks the status of a transaction.

**Parameters:**

- `transactionId` (String): Transaction ID
- `secretKey` (String): Moneroo secret API key
- `baseUrl` (String, optional): Moneroo API base URL (default: 'https://api.moneroo.io/v1')

**Returns:**

A Promise that resolves to the transaction status response object:

```javascript
{
  message: "Transaction fetched successfully",
  data: {
    id: "py_xxxxxxxx",
    amount: 1000,
    currency: "XOF",
    status: "success", // or "pending", "failed", "cancelled"
    // other transaction details
  },
  errors: null
}
```

## Error Handling

All functions in this SDK return Promises, so you can use try/catch blocks or .catch() to handle errors:

```javascript
try {
  const payment = await initiatePayment(params, apiKey);
  // Handle successful payment initialization
} catch (error) {
  // Handle error
  console.error('Payment initialization failed:', error.message);
}
```

## Examples

Check the `examples/` folder for complete usage examples:

- `examples/create-payment.js` - Example of initializing a payment
- `examples/check-transaction.js` - Example of checking a transaction status

## Development

### Installation for Development

```bash
pnpm install
```

### Running Tests

```bash
pnpm test
```

### Running Examples

```bash
pnpm run example:payment   # Run payment initialization example
pnpm run example:status    # Run transaction status check example
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support@moneroo.io](mailto:support@moneroo.io) or visit [moneroo.io](https://moneroo.io).
