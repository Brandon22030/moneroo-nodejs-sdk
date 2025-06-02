/**
 * Check Transaction Status Example
 * 
 * This script demonstrates how to check the status of a transaction
 * using the Moneroo Node.js SDK.
 */

/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import path from 'path';
import { checkTransactionStatus, TransactionStatus } from '../src';

// Load environment variables from .env file
const envPath = path.resolve(process.cwd(), '.env');

// Try to load .env file
try {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    // eslint-disable-next-line no-console
    console.warn('⚠️  Warning: Could not load .env file');
    // eslint-disable-next-line no-console
    console.warn(`   ${result.error.message}`);
  } else {
    // eslint-disable-next-line no-console
    console.log('✅ Environment variables loaded successfully');
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn('⚠️  Warning: Failed to load .env file');
  // eslint-disable-next-line no-console
  console.warn(`   ${error instanceof Error ? error.message : String(error)}`);
}

const apiKey = process.env.MONEROO_API_KEY;

// Debug: Check if API key is loaded
// eslint-disable-next-line no-console
console.log('🔑 API Key:', apiKey ? 'Loaded' : 'Not found');

// Extended TransactionStatus interface with additional fields from the API
interface ExtendedTransactionStatus extends Omit<TransactionStatus, 'data' | 'errors'> {
  data: TransactionStatus['data'] & {
    amount_formatted?: string;
    processed_at?: string | null;
    return_url?: string;
    checkout_url?: string;
    environment?: string;
    description?: string;
    currency: {
      code: string;
      name: string;
      symbol: string;
      icon_url: string;
    };
    customer: {
      first_name: string;
      last_name: string;
      email: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  errors?: {
    [key: string]: string | string[] | { [key: string]: string } | undefined;
    message?: string;
    code?: string;
  };
}

// Validate API key
if (!apiKey) {
  // eslint-disable-next-line no-console
  console.error('❌ Error: MONEROO_API_KEY is required in the .env file');
  // eslint-disable-next-line no-console
  console.log('Please add your API key to the .env file:');
  // eslint-disable-next-line no-console
  console.log('MONEROO_API_KEY=your_api_key_here');
  process.exit(1);
}

// Get transaction ID from command line arguments
const transactionId = process.argv[2];

if (!transactionId) {
  // eslint-disable-next-line no-console
  console.error('❌ Error: Transaction ID is required');
  // eslint-disable-next-line no-console
  console.log('\nUsage:');
  // eslint-disable-next-line no-console
  console.log('  pnpm run example:status <transaction_id>');
  // eslint-disable-next-line no-console
  console.log('\nExample:');
  // eslint-disable-next-line no-console
  console.log('  pnpm run example:status py_1234567890');
  process.exit(1);
}

// Format transaction ID for display (show first 8 and last 4 characters for security)
function formatTransactionId(id: string): string {
  if (!id || id.length <= 12) return id;
  return `${id.substring(0, 8)}...${id.substring(id.length - 4)}`;
}

// Helper function to get emoji for status
function getStatusEmoji(status: string): string {
  const statusEmojis: Record<string, string> = {
    pending: '🔄',
    processing: '⏳',
    completed: '✅',
    failed: '❌',
    expired: '⌛',
    refunded: '💸',
  };
  return statusEmojis[status.toLowerCase()] || '❓';
}

// Format dates for better readability
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  } catch (error) {
    return 'Invalid date';
  }
}

// Format amount with currency
function formatAmount(amount: number | string, currency?: { code?: string, symbol?: string }): string {
  const amountNumber = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(amountNumber)) return 'Invalid amount';
  
  const formattedAmount = (amountNumber / 100).toFixed(2);
  const currencySymbol = currency?.symbol || currency?.code || '';
  
  return `${currencySymbol} ${formattedAmount}`.trim();
}

// Main async function
async function main() {
  try {
    // eslint-disable-next-line no-console
    console.log(`\n🔍 Checking status for transaction: ${formatTransactionId(transactionId)}`);
    // eslint-disable-next-line no-console
    console.log('⏳ Please wait...\n');

    // Make the API request
    const startTime = Date.now();
    // We've already validated apiKey is not null above
    const status = await checkTransactionStatus(transactionId, apiKey!) as unknown as ExtendedTransactionStatus;
    const responseTime = Date.now() - startTime;
    
    // Log API response time
    // eslint-disable-next-line no-console
    console.log(`✅ Received response in ${responseTime}ms`);
    
    // Validate response
    if (!status) {
      throw new Error('No response received from the API');
    }
    
    if (status.errors) {
      // Ensure code is a string if it exists
      if (status.errors.code && typeof status.errors.code !== 'string') {
        status.errors.code = String(status.errors.code);
      }
      // eslint-disable-next-line no-console
      console.error('❌ API returned errors:', JSON.stringify(status.errors, null, 2));
      process.exit(1);
    }
    
    if (!status.data) {
      throw new Error('No transaction data in the response');
    }
    
    // Extract data with defaults
    const {
      id,
      status: txStatus,
      amount,
      amount_formatted,
      currency = { code: 'XOF', name: 'West African CFA Franc', symbol: 'FCFA', icon_url: '' },
      customer = { first_name: '', last_name: '', email: '' },
      description,
      environment,
      created_at,
      updated_at,
      processed_at,
      return_url,
      checkout_url,
      paymentMethod,
      payment_method
    } = status.data;
    
    // Format customer name
    const customerName = [customer.first_name, customer.last_name].filter(Boolean).join(' ').trim() || 'N/A';
    
    // Display transaction summary
    // eslint-disable-next-line no-console
    console.log('\n📋 TRANSACTION DETAILS');
    // eslint-disable-next-line no-console
    console.log('══════════════════════════════════════════════════════════════');
    // eslint-disable-next-line no-console
    console.log(`🆔 Transaction ID:  ${id}`);
    // eslint-disable-next-line no-console
    console.log(`🔄 Status:          ${getStatusEmoji(String(txStatus))} ${String(txStatus).toUpperCase()}`);
    // eslint-disable-next-line no-console
    console.log(`💰 Amount:          ${amount_formatted || formatAmount(Number(amount), currency)}`);
    if (description) {
      // eslint-disable-next-line no-console
      console.log(`📝 Description:     ${String(description)}`);
    }
    
    // Customer information
    // eslint-disable-next-line no-console
    console.log('\n👤 CUSTOMER INFORMATION');
    // eslint-disable-next-line no-console
    console.log('──────────────────────────────────────────────────────────────');
    // eslint-disable-next-line no-console
    console.log(`   Name:            ${customerName}`);
    if (customer.email) {
      // eslint-disable-next-line no-console
      console.log(`   Email:           ${String(customer.email)}`);
    }
    
    // Payment details
    // eslint-disable-next-line no-console
    console.log('\n💳 PAYMENT DETAILS');
    // eslint-disable-next-line no-console
    console.log('──────────────────────────────────────────────────────────────');
    // eslint-disable-next-line no-console
    console.log(`   Currency:        ${currency.name} (${currency.code})`);
    if (environment) {
      // eslint-disable-next-line no-console
      console.log(`   Environment:     ${String(environment).toUpperCase()}`);
    }
    if (paymentMethod || payment_method) {
      // eslint-disable-next-line no-console
      console.log(`   Payment Method:  ${paymentMethod || payment_method}`);
    }
    
    // Timestamps
    // eslint-disable-next-line no-console
    console.log('\n📅 TIMESTAMPS');
    // eslint-disable-next-line no-console
    console.log('──────────────────────────────────────────────────────────────');
    // eslint-disable-next-line no-console
    console.log(`   Created:         ${formatDate(String(created_at))}`);
    // eslint-disable-next-line no-console
    console.log(`   Last updated:    ${formatDate(String(updated_at || created_at))}`);
    // eslint-disable-next-line no-console
    console.log(`   Processed:       ${processed_at ? formatDate(String(processed_at)) : 'Not processed yet'}`);
    
    // Links
    const hasLinks = return_url || checkout_url;
    if (hasLinks) {
      // eslint-disable-next-line no-console
      console.log('\n🔗 LINKS');
      // eslint-disable-next-line no-console
      console.log('──────────────────────────────────────────────────────────────');
      if (return_url) {
        // eslint-disable-next-line no-console
        console.log(`   Return URL:      ${return_url}`);
      }
      if (checkout_url) {
        // eslint-disable-next-line no-console
        console.log(`   Checkout URL:    ${checkout_url}`);
      }
    }
    
    // eslint-disable-next-line no-console
    console.log('══════════════════════════════════════════════════════════════');
    // eslint-disable-next-line no-console
    console.log('✅ Transaction details retrieved successfully\n');
    
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('\n❌ ERROR');
    // eslint-disable-next-line no-console
    console.log('──────────────────────────────────────────────────────────────');
    
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`   Message: ${error.message}`);
      
      // Add more context for common errors
      if (error.message.includes('network')) {
        // eslint-disable-next-line no-console
        console.error('   Network error: Could not connect to the Moneroo API');
        // eslint-disable-next-line no-console
        console.error('   Please check your internet connection and try again');
      } else if (error.message.includes('401')) {
        // eslint-disable-next-line no-console
        console.error('   Authentication failed: Invalid API key');
        // eslint-disable-next-line no-console
        console.error('   Please check your MONEROO_API_KEY in the .env file');
      } else if (error.message.includes('404')) {
        // eslint-disable-next-line no-console
        console.error('   Transaction not found');
        // eslint-disable-next-line no-console
        console.error('   Please verify the transaction ID and try again');
      }
      
      // Show stack trace in development
      if (process.env.NODE_ENV === 'development' && error.stack) {
        // eslint-disable-next-line no-console
        console.error('\nStack trace:');
        // eslint-disable-next-line no-console
        console.error(error.stack.split('\n').slice(0, 3).join('\n'));
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('   An unknown error occurred');
    }
    
    process.exit(1);
  }
}

// Run the main function
main().catch(error => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error in main function:', error);
  process.exit(1);
});
