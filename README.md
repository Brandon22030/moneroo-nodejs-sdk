# Moneroo Node.js SDK

[![npm version](https://img.shields.io/npm/v/moneroo-nodejs-sdk.svg)](https://www.npmjs.com/package/moneroo-nodejs-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight Node.js SDK for integrating with the [Moneroo](https://moneroo.io) payment platform. This SDK allows you to easily initialize payments, process payouts, and check transaction status using the Moneroo API with full TypeScript support.

## Features

- Initialize payments with various payment methods
- Process payouts to mobile money accounts and other destinations
- Check transaction status for both payments and payouts
- Lightweight with minimal dependencies
- Promise-based API with async/await support
- TypeScript support with type definitions
- Comprehensive payment and payout method enumerations with filtering capabilities
- Support for multiple currencies and countries
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

### Importing the SDK

```typescript
import { 
  // Payment functions
  initiatePayment, 
  checkTransactionStatus, 
  PaymentInitParams, 
  PaymentStatus,
  PaymentMethod,
  PaymentMethodUtils,
  type PaymentMethodDetails,
  
  // Payout functions
  initiatePayout,
  verifyPayout,
  getPayout,
  PayoutInitParams,
  PayoutMethod,
  PayoutMethodUtils,
  type PayoutMethodDetails
} from 'moneroo-nodejs-sdk';
```

### Working with Payment and Payout Methods

The SDK provides comprehensive `PaymentMethod` and `PayoutMethod` enums and utility functions to work with payment and payout methods:

```typescript
// Get all available payment methods
const allPaymentMethods = PaymentMethodUtils.getAll();

// Get payment methods available in a specific country (ISO 3166-1 alpha-2)
const paymentMethodsInNigeria = PaymentMethodUtils.getByCountry('NG');

// Get payment methods that support a specific currency (ISO 4217)
const paymentMethodsForXOF = PaymentMethodUtils.getByCurrency('XOF');

// Get details for a specific payment method
const mtnPaymentDetails = PaymentMethodUtils.getDetails(PaymentMethod.MtnBJ);

// Similarly for payout methods
const allPayoutMethods = PayoutMethodUtils.getAll();
const payoutMethodsInBenin = PayoutMethodUtils.getByCountry('BJ');
const payoutMethodsForXOF = PayoutMethodUtils.getByCurrency('XOF');
const mtnPayoutDetails = PayoutMethodUtils.getDetails(PayoutMethod.MtnBJ);
```

### Initialize a Payment

```typescript
// Your Moneroo API key
const apiKey = 'your_moneroo_api_key';

// Payment parameters with TypeScript type checking
const paymentParams: PaymentInitParams = {
  amount: 1000, // Amount in smallest currency unit (e.g., 1000 = 10.00 XOF)
  currency: 'XOF',
  description: 'Payment for order #123',
  email: 'customer@example.com',
  firstName: 'John',
  lastName: 'Doe',
  returnUrl: 'https://example.com/return',
  // Using PaymentMethod enum for type safety
  methods: [PaymentMethod.MtnBJ, PaymentMethod.MoovBJ] // Optional, defaults to all available methods
};

try {
  // Initialize payment
  const result = await initiatePayment(paymentParams, apiKey);
  console.log('Payment initialized:', result);
  
  // Redirect user to payment page
  if (result.paymentUrl) {
    window.location.href = result.paymentUrl;
  }
} catch (error) {
  console.error('Payment initialization failed:', error);
}
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
// Your Moneroo API key
const apiKey = 'your_moneroo_api_key';
const transactionId = 'your_transaction_id';

try {
  // Check status with type safety
  const status = await checkTransactionStatus(transactionId, apiKey);
  
  // TypeScript will autocomplete status values
  if (status === PaymentStatus.SUCCESS) {
    console.log('Payment was successful!');
  } else if (status === PaymentStatus.PENDING) {
    console.log('Payment is pending...');
  } else if (status === PaymentStatus.FAILED) {
    console.log('Payment failed.');
  }
  
  console.log('Transaction status:', status);
} catch (error) {
  console.error('Error checking transaction status:', error);
}
```

### Initialize a Payout

```typescript
// Your Moneroo API key (server-side only)
const apiKey = 'your_moneroo_api_key';

// Payout parameters with TypeScript type checking
const payoutParams: PayoutInitParams = {
  amount: 1000, // Amount in smallest currency unit (e.g., 1000 = 10.00 XOF)
  currency: 'XOF',
  description: 'Refund for order #123',
  customer: {
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Doe'
  },
  method: PayoutMethod.MtnBJ, // Using PayoutMethod enum for type safety
  msisdn: '22912345678', // Mobile number for MTN Benin
  metadata: {
    order_id: '123',
    customer_id: '456'
  }
};

try {
  // Initialize payout
  const result = await initiatePayout(payoutParams, apiKey);
  console.log('Payout initialized:', result);
  console.log('Payout ID:', result.data.id);
} catch (error) {
  console.error('Payout initialization failed:', error);
}
```

### Check Payout Status

```typescript
// Your Moneroo API key (server-side only)
const apiKey = 'your_moneroo_api_key';
const payoutId = 'your_payout_id';

try {
  // Verify payout status
  const status = await verifyPayout(payoutId, apiKey);
  
  // Check status values
  if (status.data.status === 'success') {
    console.log('Payout was successful!');
  } else if (status.data.status === 'pending') {
    console.log('Payout is pending...');
  } else if (status.data.status === 'failed') {
    console.log('Payout failed.');
  }
  
  console.log('Payout status:', status.data.status);
  
  // Get full payout details
  const details = await getPayout(payoutId, apiKey);
  console.log('Payout details:', details.data);
} catch (error) {
  console.error('Error checking payout status:', error);
}
```

### Payment and Payout Methods Guide

The SDK provides a comprehensive system for working with payment and payout methods through the `PaymentMethod`/`PayoutMethod` enums and `PaymentMethodUtils`/`PayoutMethodUtils` helper functions. This allows you to easily select and filter methods based on country, currency, or specific requirements.

#### Using the PaymentMethod Enum

The `PaymentMethod` enum provides type-safe access to all supported payment methods:

```typescript
import { PaymentMethod } from 'moneroo-nodejs-sdk';

// Specify a payment method in your payment parameters
const params = {
  // ... other payment parameters
  paymentMethod: PaymentMethod.MtnBJ  // Use MTN Mobile Money Benin
};

// Or specify multiple accepted methods
const params = {
  // ... other payment parameters
  methods: [PaymentMethod.MtnBJ, PaymentMethod.MoovBJ]  // Accept both MTN and Moov in Benin
};
```

#### Available Payment Method Categories

##### Mobile Money Providers
```typescript
// MTN Mobile Money (available in multiple countries)
PaymentMethod.MtnBJ  // Benin
PaymentMethod.MtnCI  // Côte d'Ivoire
PaymentMethod.MtnGH  // Ghana
PaymentMethod.MtnNG  // Nigeria
// ... and more

// Orange Money
PaymentMethod.OrangeBF  // Burkina Faso
PaymentMethod.OrangeCI  // Côte d'Ivoire
PaymentMethod.OrangeSN  // Senegal
// ... and more

// Moov Money
PaymentMethod.MoovBJ  // Benin
PaymentMethod.MoovCI  // Côte d'Ivoire
PaymentMethod.MoovTG  // Togo
// ... and more

// M-Pesa
PaymentMethod.MpesaKE  // Kenya
PaymentMethod.MpesaTZ  // Tanzania

// Airtel Money
PaymentMethod.AirtelNG  // Nigeria
PaymentMethod.AirtelUG  // Uganda
// ... and more
```

##### Card Payments
```typescript
PaymentMethod.CardUSD  // USD cards
PaymentMethod.CardXOF  // XOF cards (West African CFA franc)
PaymentMethod.CardXAF  // XAF cards (Central African CFA franc)
PaymentMethod.CardNGN  // NGN cards (Nigerian Naira)
// ... and more regional card options
```

##### Cryptocurrency
```typescript
PaymentMethod.CryptoUSD  // USD crypto payments
PaymentMethod.CryptoXOF  // XOF crypto payments
PaymentMethod.CryptoNGN  // NGN crypto payments
// ... and more
```

##### Other Payment Methods
```typescript
PaymentMethod.BankTransferNG  // Bank transfers in Nigeria
PaymentMethod.QRNGN          // QR code payments in Nigeria
PaymentMethod.USSDNGN        // USSD payments in Nigeria
// ... and more
```

#### Filtering Payment Methods

The SDK provides powerful utilities to filter payment methods based on various criteria:

```typescript
import { PaymentMethodUtils } from 'moneroo-nodejs-sdk';

// Get all available payment methods
const allMethods = PaymentMethodUtils.getAll();

// Filter by country (using ISO 3166-1 alpha-2 country codes)
const methodsInNigeria = PaymentMethodUtils.getByCountry('NG');
const methodsInBenin = PaymentMethodUtils.getByCountry('BJ');

// Filter by currency (using ISO 4217 currency codes)
const methodsForXOF = PaymentMethodUtils.getByCurrency('XOF');
const methodsForNGN = PaymentMethodUtils.getByCurrency('NGN');

// Get details for a specific payment method
const mtnDetails = PaymentMethodUtils.getDetails(PaymentMethod.MtnBJ);
console.log(mtnDetails);
// Output: { name: 'MTN MoMo Benin', code: 'mtn_bj', currency: 'XOF', countries: ['BJ'] }
```

#### Payment Method Details

Each payment method includes the following details:

- `name`: Display name of the payment method
- `code`: Unique identifier code (same as the PaymentMethod enum value)
- `currency`: ISO 4217 currency code supported by this method
- `countries`: Array of ISO 3166-1 alpha-2 country codes where this method is available

```typescript
// Example of accessing payment method details
const methodDetails = PaymentMethodUtils.getDetails(PaymentMethod.MtnBJ);
console.log(`Name: ${methodDetails.name}`);
console.log(`Currency: ${methodDetails.currency}`);
console.log(`Available in: ${methodDetails.countries.join(', ')}`);
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

Le SDK inclut plusieurs exemples pratiques pour vous aider à comprendre et implémenter l'intégration Moneroo :

### Exemples disponibles

- **`examples/create-payment.ts`** - Exemple complet d'initialisation d'un paiement et de vérification de son statut
  - Démontre le flux de paiement de bout en bout
  - Utilise l'API Moneroo avec une clé API réelle
  - Montre comment gérer les réponses et les erreurs
  - **Utilisation** : Idéal lors de l'implémentation concrète de l'intégration Moneroo

- **`examples/check-transaction.ts`** - Exemple de vérification du statut d'une transaction existante
  - Montre comment suivre l'état d'un paiement après son initialisation
  - **Utilisation** : Utile pour implémenter des webhooks ou des pages de confirmation

- **`examples/payment-methods.ts`** - Outil de référence pour explorer les méthodes de paiement
  - Liste toutes les méthodes de paiement disponibles (66+ méthodes)
  - Démontre comment filtrer les méthodes par pays ou devise
  - Montre comment obtenir les détails d'une méthode spécifique
  - **Utilisation** : Idéal pendant la phase de planification pour comprendre quelles méthodes sont disponibles dans quels pays

### Comment exécuter les exemples

```bash
# Initialiser un paiement
pnpm run example:payment

# Vérifier le statut d'une transaction
pnpm run example:status <transaction_id>

# Explorer les méthodes de paiement
pnpm ts-node examples/payment-methods.ts
```

> **Note** : Assurez-vous d'avoir configuré votre clé API Moneroo dans un fichier `.env` avant d'exécuter les exemples.

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
