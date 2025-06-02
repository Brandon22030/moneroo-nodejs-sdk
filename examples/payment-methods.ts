/**
 * Example: Using Payment Methods in Moneroo SDK
 * 
 * This example demonstrates how to use the payment methods and utilities
 * provided by the Moneroo SDK.
 */
import { PaymentMethodUtils } from '../src';
import { PaymentMethod } from '../src/methods';

// Example 1: List all available payment methods
function listAllPaymentMethods(): void {
  // eslint-disable-next-line no-console
  console.log('=== All Available Payment Methods ===');
  const allMethods = PaymentMethodUtils.getAll();
  
  allMethods.forEach((method, index) => {
    // eslint-disable-next-line no-console
    console.log(`${index + 1}. ${method.name} (${method.code})`);
    // eslint-disable-next-line no-console
    console.log(`   Currency: ${method.currency}`);
    // eslint-disable-next-line no-console
    console.log(`   Countries: ${method.countries.join(', ')}`);
    // Get the enum key for this payment method
    const enumKey = Object.entries(PaymentMethod).find(([, value]) => value === method.code)?.[0] || 'N/A';
    // eslint-disable-next-line no-console
    console.log(`   Enum Key: ${enumKey}\n`);
  });
}

// Example 2: Find payment methods by country
function findMethodsByCountry(countryCode: string): void {
  // eslint-disable-next-line no-console
  console.log(`\n=== Payment Methods for ${countryCode} ===`);
  const methods = PaymentMethodUtils.getByCountry(countryCode);
  
  if (methods.length === 0) {
    // eslint-disable-next-line no-console
    console.log(`No payment methods found for country: ${countryCode}`);
    return;
  }
  
  methods.forEach((method, index) => {
    // eslint-disable-next-line no-console
    console.log(`${index + 1}. ${method.name} (${method.code})`);
    // eslint-disable-next-line no-console
    console.log(`   Currency: ${method.currency}\n`);
  });
}

// Example 3: Find payment methods by currency
function findMethodsByCurrency(currency: string): void {
  // eslint-disable-next-line no-console
  console.log(`\n=== Payment Methods for ${currency} ===`);
  const methods = PaymentMethodUtils.getByCurrency(currency);
  
  if (methods.length === 0) {
    // eslint-disable-next-line no-console
    console.log(`No payment methods found for currency: ${currency}`);
    return;
  }
  
  methods.forEach((method, index) => {
    // eslint-disable-next-line no-console
    console.log(`${index + 1}. ${method.name} (${method.code})`);
    // eslint-disable-next-line no-console
    console.log(`   Countries: ${method.countries.join(', ')}\n`);
  });
}

// Example 4: Get details for a specific payment method
function getMethodDetails(methodCode: string | PaymentMethod): void {
  // eslint-disable-next-line no-console
  console.log(`\n=== Details for ${methodCode} ===`);
  
  try {
    // Convert string to PaymentMethod if needed
    const method = typeof methodCode === 'string'
      ? (Object.values(PaymentMethod).includes(methodCode as PaymentMethod)
        ? methodCode as PaymentMethod
        : null)
      : methodCode;
    
    if (!method) {
      throw new Error(`Invalid payment method: ${methodCode}`);
    }
    
    // Get payment method details
    // We know the method is valid at this point because we've already validated it
    const details = PaymentMethodUtils.getDetails(method);
    
    // This check ensures TypeScript knows details is defined
    if (!details) {
      throw new Error(`Could not retrieve details for payment method: ${method}`);
    }
    
    // At this point, TypeScript knows details is defined
    const { name, code, currency, countries } = details;
    
    // eslint-disable-next-line no-console
    console.log('Name:', name);
    // eslint-disable-next-line no-console
    console.log('Code:', code);
    // eslint-disable-next-line no-console
    console.log('Currency:', currency);
    // eslint-disable-next-line no-console
    console.log('Countries:', countries.join(', '));
    
    // Show how to use the enum
    const enumKey = Object.entries(PaymentMethod).find(([, value]) => value === method)?.[0];
    if (enumKey) {
      // eslint-disable-next-line no-console
      console.log('Enum Usage:', `PaymentMethod.${enumKey}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`❌ Error: ${error.message}`);
    } else {
      // eslint-disable-next-line no-console
      console.error('❌ An unknown error occurred');
    }
  }
}

// Example 5: Using payment methods in a transaction
async function initiateSamplePayment(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('\n=== Initiating Sample Payment ===');
  
  try {
    // Example: MTN Mobile Money payment in Benin
    const methodCode = PaymentMethod.MtnBJ;
    const details = PaymentMethodUtils.getDetails(methodCode);
    
    // eslint-disable-next-line no-console
    console.log(`Initiating ${details.name} payment...`);
    
    // Example payment data - in a real app, this would be dynamic
    const paymentData = {
      amount: '1000',
      currency: details.currency,
      method: methodCode,
      email: 'customer@example.com',
      phone: '+229XXXXXXXX',
      first_name: 'John',
      last_name: 'Doe',
      reference: `ORDER-${Date.now()}`,
      callback_url: 'https://your-website.com/callback',
      return_url: 'https://your-website.com/return',
      metadata: {
        order_id: '12345',
        custom_data: 'any additional data',
      },
    };
    
    // eslint-disable-next-line no-console
    console.log('Payment data:', JSON.stringify(paymentData, null, 2));
    
    // In a real app, you would call the Moneroo API here
    // This is just a simulation
    // Uncomment to actually process the payment
    /*
    const result = await moneroo.initiatePayment(paymentData);
    console.log('Payment initiated:', result);
    */
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error initiating payment:', error instanceof Error ? error.message : 'Unknown error');
  }
}

// Run examples
(async (): Promise<void> => {
  try {
    // Example 1: List all payment methods
    listAllPaymentMethods();
    
    // Example 2: Find methods by country
    findMethodsByCountry('BJ');
    
    // Example 3: Find methods by currency
    findMethodsByCurrency('XOF');
    
    // Example 4: Get details for specific methods
    getMethodDetails('mtn_bj'); // Using string code
    getMethodDetails(PaymentMethod.MtnBJ); // Using enum
    
    // Example 5: Initiate a sample payment (commented out to avoid accidental charges)
    // Uncomment the following line to test
    // await initiateSamplePayment();
    
    // This is a no-op to satisfy ESLint for the unused function
    // The function is meant to be used when uncommented above
    void initiateSamplePayment;
    
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred:', error);
    process.exit(1);
  }
})();
