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
});
