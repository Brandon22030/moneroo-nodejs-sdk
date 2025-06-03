import { initiatePayment, checkTransactionStatus } from '../src';
import type { PaymentInitParams } from '../src';

// Mock global fetch
global.fetch = jest.fn();

describe('Moneroo SDK', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('initiatePayment should throw an error if API key is not provided', async () => {
    await expect(initiatePayment({} as PaymentInitParams, '')).rejects.toThrow('A Moneroo API key is required');
  });

  test('initiatePayment should throw an error if payment method is invalid', async () => {
    const params: PaymentInitParams = {
      amount: 1000,
      currency: 'XOF',
      description: 'Test payment',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      returnUrl: 'https://example.com/return',
      paymentMethod: 'invalid_method' as unknown as import('../src').PaymentMethod
    };

    await expect(initiatePayment(params, 'test_api_key'))
      .rejects
      .toThrow('Invalid payment method: invalid_method');
  });

  test('initiatePayment should make a POST request to the correct endpoint', async () => {
    // Mock successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Transaction initialized successfully',
        data: {
          id: 'tx_123456789',
          checkout_url: 'https://checkout.moneroo.io/tx_123456789'
        }
      })
    });

    const params: PaymentInitParams = {
      amount: 1000,
      currency: 'XOF',
      description: 'Test payment',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      returnUrl: 'https://example.com/return'
    };

    await initiatePayment(params, 'test_api_key');

    // Verify fetch was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.moneroo.io/v1/payments/initialize',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test_api_key'
        }),
        body: expect.any(String)
      })
    );

    // Verify the body was correctly serialized
    const callArgs = (global.fetch as jest.Mock).mock.calls[0][1];
    const body = JSON.parse(callArgs.body);
    expect(body).toEqual({
      amount: 1000,
      currency: 'XOF',
      description: 'Test payment',
      customer: {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe'
      },
      return_url: 'https://example.com/return',
      methods: ['mtn_bj']
    });
  });

  test('initiatePayment should allow specifying a custom base URL', async () => {
    // Mock successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Transaction initialized successfully',
        data: {
          id: 'tx_123456789',
          checkout_url: 'https://checkout.moneroo.io/tx_123456789'
        }
      })
    });

    const params: PaymentInitParams = {
      amount: 1000,
      currency: 'XOF',
      description: 'Test payment',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      returnUrl: 'https://example.com/return'
    };

    await initiatePayment(params, 'test_api_key', 'https://custom-api.moneroo.io/v1');

    // Verify fetch was called with the custom base URL
    expect(global.fetch).toHaveBeenCalledWith(
      'https://custom-api.moneroo.io/v1/payments/initialize',
      expect.anything()
    );
  });

  test('initiatePayment should throw an error if checkout_url is missing', async () => {
    // Mock response with missing checkout_url
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Transaction initialized successfully',
        data: {
          id: 'tx_123456789'
          // checkout_url is missing
        }
      })
    });

    const params: PaymentInitParams = {
      amount: 1000,
      currency: 'XOF',
      description: 'Test payment',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      returnUrl: 'https://example.com/return'
    };

    await expect(initiatePayment(params, 'test_api_key')).rejects.toThrow('checkout_url is missing!');
  });

  test('initiatePayment should handle HTTP errors', async () => {
    // Mock HTTP error response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        message: 'Bad request: Invalid amount',
        errors: ['Amount must be greater than zero']
      })
    });

    const params: PaymentInitParams = {
      amount: 0, // Montant invalide
      currency: 'XOF',
      description: 'Test payment',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      returnUrl: 'https://example.com/return'
    };

    await expect(initiatePayment(params, 'test_api_key'))
      .rejects
      .toThrow('Bad request: Invalid amount');
  });

  test('initiatePayment should handle HTTP errors with no JSON response', async () => {
    // Mock HTTP error response with no JSON
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => { throw new Error('Invalid JSON'); }
    });

    const params: PaymentInitParams = {
      amount: 1000,
      currency: 'XOF',
      description: 'Test payment',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      returnUrl: 'https://example.com/return'
    };

    await expect(initiatePayment(params, 'test_api_key'))
      .rejects
      .toThrow('HTTP Error: 500');
  });

  test('initiatePayment should handle non-Error exceptions', async () => {
    // Mock a non-Error exception
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      throw 'Network failure'; // Non-Error exception
    });

    const params: PaymentInitParams = {
      amount: 1000,
      currency: 'XOF',
      description: 'Test payment',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      returnUrl: 'https://example.com/return'
    };

    await expect(initiatePayment(params, 'test_api_key'))
      .rejects
      .toThrow('Unknown error occurred');
  });

  test('checkTransactionStatus should throw an error if API key is not provided', async () => {
    await expect(checkTransactionStatus('tx_123456789', '')).rejects.toThrow('A Moneroo API key is required');
  });

  test('checkTransactionStatus should make a GET request to the correct endpoint', async () => {
    // Mock successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Transaction status retrieved successfully',
        data: {
          id: 'tx_123456789',
          status: 'completed',
          amount: '1000',
          currency: 'XOF',
          customer: {
            email: 'test@example.com',
            first_name: 'John',
            last_name: 'Doe'
          },
          created_at: '2023-01-01T00:00:00.000Z',
          updated_at: '2023-01-01T00:00:00.000Z'
        }
      })
    });

    await checkTransactionStatus('tx_123456789', 'test_api_key');

    // Verify fetch was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.moneroo.io/v1/payments/tx_123456789',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Authorization': 'Bearer test_api_key'
        })
      })
    );
  });

  test('checkTransactionStatus should handle HTTP errors', async () => {
    // Mock HTTP error response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({
        message: 'Transaction not found',
        errors: ['Invalid transaction ID']
      })
    });

    await expect(checkTransactionStatus('invalid_tx_id', 'test_api_key'))
      .rejects
      .toThrow('Transaction not found');
  });

  test('checkTransactionStatus should handle network errors', async () => {
    // Mock network error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(checkTransactionStatus('tx_123456789', 'test_api_key'))
      .rejects
      .toThrow('Network error');
  });

  test('checkTransactionStatus should handle invalid JSON response', async () => {
    // Mock invalid JSON response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => { throw new Error('Invalid JSON'); }
    });

    await expect(checkTransactionStatus('tx_123456789', 'test_api_key'))
      .rejects
      .toThrow('HTTP Error: 500');
  });

  test('checkTransactionStatus should convert payment method code to enum', async () => {
    // Mock response with payment_method
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Transaction status retrieved successfully',
        data: {
          id: 'tx_123456789',
          status: 'completed',
          payment_method: 'mtn_bj',
          amount: '1000',
          currency: 'XOF'
        }
      })
    });

    const result = await checkTransactionStatus('tx_123456789', 'test_api_key');
    
    // Verify payment_method was converted to enum
    // Le code dans transaction.ts assigne PaymentMethod[methodCode] à paymentMethod
    expect(result.data?.paymentMethod).toBeDefined();
    expect(typeof result.data?.paymentMethod).toBe('string');
  });
});
