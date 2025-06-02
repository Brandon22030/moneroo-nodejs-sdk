/**
 * Check Transaction Status Example
 * 
 * This script demonstrates how to check the status of a transaction
 * using the Moneroo Node.js SDK.
 */

import * as dotenv from 'dotenv';
import path from 'path';
import { checkTransactionStatus, TransactionStatus } from '../src';

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '../.env');
console.log(`🔍 Loading environment from: ${envPath}`);

try {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.warn('⚠️  Warning: Could not load .env file');
    console.warn(`   ${result.error.message}`);
  } else {
    console.log('✅ Environment variables loaded successfully');
  }
} catch (error) {
  console.warn('⚠️  Warning: Failed to load .env file');
  console.warn(`   ${error instanceof Error ? error.message : String(error)}`);
}

const apiKey = process.env.MONEROO_API_KEY;

// Debug: Check if API key is loaded
console.log('🔑 API Key:', apiKey ? 'Loaded' : 'Not found');

// Interface for the transaction response
interface TransactionResponse {
  message: string;
  data: TransactionStatus & {
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
      [key: string]: any;
    };
    [key: string]: any;
  };
  errors: any;
}

// Validate API key
if (!apiKey) {
  console.error('❌ Error: MONEROO_API_KEY is required in the .env file');
  console.log('Please add your API key to the .env file:');
  console.log('MONEROO_API_KEY=your_api_key_here');
  process.exit(1);
}

// Get transaction ID from command line arguments
const transactionId = process.argv[2];

if (!transactionId) {
  console.error('❌ Error: Transaction ID is required');
  console.log('\nUsage:');
  console.log('  pnpm run example:status <transaction_id>');
  console.log('\nExample:');
  console.log('  pnpm run example:status py_1234567890');
  process.exit(1);
}

// Format transaction ID for display (show first 8 and last 4 characters for security)
const formatTransactionId = (id: string) => {
  if (id.length <= 12) return id;
  return `${id.substring(0, 8)}...${id.substring(id.length - 4)}`;
};

// Helper function to get emoji for status
function getStatusEmoji(status: string): string {
  const statusMap: Record<string, string> = {
    'initiated': '🔄',
    'pending': '⏳',
    'completed': '✅',
    'failed': '❌',
    'cancelled': '🚫',
    'refunded': '↩️',
    'expired': '⏱️',
  };
  return statusMap[status.toLowerCase()] || 'ℹ️';
}

// Format dates for better readability
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  } catch (e) {
    return String(dateString);
  }
};

// Format amount with currency
const formatAmount = (amount: number | string, currency?: { code?: string, symbol?: string }): string => {
  const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(amountNum)) return 'N/A';
  
  const formattedAmount = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency?.code || 'XOF',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amountNum / 100); // Assuming amount is in minor units (e.g., cents)
  
  return formattedAmount;
};

// Main async function
async function main() {
  try {
    console.log(`\n🔍 Checking status of transaction: ${formatTransactionId(transactionId)}`);
    console.log('⏳ Please wait...\n');
    
    // Make the API request
    const startTime = Date.now();
    // We've already validated apiKey is not null above
    const status = await checkTransactionStatus(transactionId, apiKey!) as unknown as TransactionResponse;
    const responseTime = Date.now() - startTime;
    
    // Log API response time
    console.log(`✅ Received response in ${responseTime}ms`);
    
    // Validate response
    if (!status) {
      throw new Error('No response received from the API');
    }
    
    if (status.errors) {
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
      currency = { code: 'XOF', name: 'West African CFA Franc', symbol: 'FCFA' },
      customer = { first_name: '', last_name: '', email: '' },
      description,
      environment,
      created_at,
      updated_at,
      processed_at,
      return_url,
      checkout_url
    } = status.data;
    
    // Format customer name
    const customerName = [customer.first_name, customer.last_name].filter(Boolean).join(' ').trim() || 'N/A';
    
    // Display transaction summary
    console.log('\n📋 TRANSACTION DETAILS');
    console.log('══════════════════════════════════════════════════════════════');
    console.log(`🆔 Transaction ID:  ${id}`);
    console.log(`🔄 Status:          ${getStatusEmoji(txStatus)} ${txStatus.toUpperCase()}`);
    console.log(`💰 Amount:          ${amount_formatted || formatAmount(amount, currency)}`);
    if (description) console.log(`📝 Description:     ${description}`);
    
    // Customer information
    console.log('\n👤 CUSTOMER INFORMATION');
    console.log('──────────────────────────────────────────────────────────────');
    console.log(`   Name:            ${customerName}`);
    if (customer.email) console.log(`   Email:           ${customer.email}`);
    
    // Payment details
    console.log('\n💳 PAYMENT DETAILS');
    console.log('──────────────────────────────────────────────────────────────');
    console.log(`   Currency:        ${currency.name} (${currency.code})`);
    if (environment) console.log(`   Environment:     ${environment.toUpperCase()}`);
    
    // Timestamps
    console.log('\n📅 TIMESTAMPS');
    console.log('──────────────────────────────────────────────────────────────');
    console.log(`   Created:         ${formatDate(created_at)}`);
    console.log(`   Last updated:    ${formatDate(updated_at || created_at)}`);
    console.log(`   Processed:       ${processed_at ? formatDate(processed_at) : 'Not processed yet'}`);
    
    // Links
    const hasLinks = return_url || checkout_url;
    if (hasLinks) {
      console.log('\n🔗 LINKS');
      console.log('──────────────────────────────────────────────────────────────');
      if (return_url) console.log(`   Return URL:      ${return_url}`);
      if (checkout_url) console.log(`   Checkout URL:    ${checkout_url}`);
    }
    
    console.log('══════════════════════════════════════════════════════════════');
    console.log('✅ Transaction details retrieved successfully\n');
    
  } catch (error) {
    console.error('\n❌ ERROR');
    console.log('──────────────────────────────────────────────────────────────');
    
    if (error instanceof Error) {
      console.error(`   Message: ${error.message}`);
      
      // Add more context for common errors
      if (error.message.includes('ENOTFOUND')) {
        console.error('   Network error: Could not connect to the Moneroo API');
        console.error('   Please check your internet connection and try again');
      } else if (error.message.includes('401')) {
        console.error('   Authentication failed: Invalid API key');
        console.error('   Please check your MONEROO_API_KEY in the .env file');
      } else if (error.message.includes('404')) {
        console.error('   Transaction not found');
        console.error('   Please verify the transaction ID and try again');
      }
      
      // Log stack trace in development
      if (process.env.NODE_ENV === 'development' && error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack.split('\n').slice(0, 3).join('\n'));
      }
    } else {
      console.error('   An unknown error occurred');
      console.error(error);
    }
    
    console.log('──────────────────────────────────────────────────────────────');
    process.exit(1);
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error in main function:', error);
  process.exit(1);
});
