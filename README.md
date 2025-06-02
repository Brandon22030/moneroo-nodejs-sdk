# Moneroo Node.js SDK

[![npm version](https://img.shields.io/npm/v/moneroo-nodejs-sdk.svg)](https://www.npmjs.com/package/moneroo-nodejs-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight Node.js SDK for integrating with the [Moneroo](https://moneroo.io) payment platform. This SDK allows you to easily initialize payments and check transaction status using the Moneroo API.

## Features

- Initialize payments with various payment methods
- Check transaction status
- Lightweight with minimal dependencies
- Promise-based API with async/await support
## Installation

### Using pnpm (recommended)

```bash
pnpm add moneroo-nodejs-sdk
```

### Using npm

```bash
npm install moneroo-nodejs-sdk
```

## Usage

### Initialize a Payment

```typescript
import { initiatePayment, PaymentInitParams } from 'moneroo-nodejs-sdk';

// Your Moneroo API key
const apiKey = 'your_moneroo_api_key';

// Payment parameters
const paymentParams: PaymentInitParams = {
  amount: 1000, // 10.00 XOF
  currency: 'XOF',
  description: 'Payment for order #123',
  email: 'customer@example.com',
  firstName: 'John',
  lastName: 'Doe',
  returnUrl: 'https://example.com/return',
  methods: ['mtn_bj'] // Optional, defaults to ['mtn_bj']
};

// Initialize payment
initiatePayment(paymentParams, apiKey)
  .then(response => {
    console.log('Payment initialized:', response);
    console.log('Checkout URL:', response.data.checkout_url);
    console.log('Transaction ID:', response.data.id);
  })
  .catch(error => {
    console.error('Error initializing payment:', error.message);
  });
```

### Using CommonJS

```javascript
const { initiatePayment } = require('moneroo-nodejs-sdk');

// Your Moneroo API key
const apiKey = 'your_moneroo_api_key';

// Payment parameters (same as above)
// ...

// Initialize payment
initiatePayment(paymentParams, apiKey)
  .then(response => {
    // ...
  });
```

### Check Transaction Status

```typescript
import { checkTransactionStatus } from 'moneroo-nodejs-sdk';

// Your Moneroo API key
const apiKey = 'your_moneroo_api_key';

// Transaction ID to check
const transactionId = 'transaction_id_from_payment_initialization';

// Check transaction status
checkTransactionStatus(transactionId, apiKey)
  .then(response => {
    console.log('Transaction status:', response);
    console.log('Status:', response.data.status);
  })
  .catch(error => {
    console.error('Error checking transaction status:', error.message);
  });
```

## API Reference

### initiatePayment(params, secretKey, [baseUrl])

Initializes a payment with Moneroo.

**Parameters:**

- `params` (PaymentInitParams): Payment parameters
  - `amount` (number): Payment amount (in cents)
  - `currency` (string): Payment currency (e.g. XOF)
  - `description` (string): Payment description
  - `email` (string): Customer email
  - `firstName` (string): Customer first name
  - `lastName` (string): Customer last name
  - `returnUrl` (string): Return URL after payment
  - `methods` (string[]): Optional. Accepted payment methods (e.g. ['mtn_bj'])
- `secretKey` (string): Moneroo secret API key
- `baseUrl` (string): Optional. Moneroo API base URL (default: 'https://api.moneroo.io/v1')

**Returns:** Promise<PaymentResponse> that resolves to the payment response object.

### checkTransactionStatus(transactionId, secretKey, [baseUrl])

Checks the status of a Moneroo transaction.

**Parameters:**

- `transactionId` (string): Transaction ID
- `secretKey` (string): Moneroo secret API key
- `baseUrl` (string): Optional. Moneroo API base URL (default: 'https://api.moneroo.io/v1')

**Returns:** Promise<TransactionStatus> that resolves to the transaction status object.

## Development

### Setup

1. Clone the repository
2. Install dependencies with pnpm: `pnpm install`
3. Create a `.env` file at the root of the project with your Moneroo API key:

```
MONEROO_API_KEY=your_moneroo_api_key
```

### Building the SDK

```bash
pnpm run build
```

### Running Examples

```bash
# Initialize a payment
pnpm run example:payment

# Check transaction status
pnpm run example:status <transaction_id>
```

### Running Tests

```bash
pnpm test
```

### Linting

```bash
pnpm run lint
```

## License

MIT

## Error Handling

All functions in this SDK return Promises, so you can use try/catch blocks or .catch() to handle errors:

```javascript
try {
  // ...
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
