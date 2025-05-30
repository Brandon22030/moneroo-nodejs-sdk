'use strict';

const { initiatePayment, checkTransactionStatus } = require('../src/index');

// Mock for fetch
global.fetch = jest.fn();

describe('Moneroo SDK', () => {
  // Reset mocks before each test
  beforeEach(() => {
    global.fetch.mockClear();
    // Mock console methods to avoid cluttering test output
    console.log = jest.fn();
    console.error = jest.fn();
  });

  test('initiatePayment should throw an error if API key is not provided', async () => {
    await expect(initiatePayment({}, null))
      .rejects
      .toThrow('A Moneroo API key is required');
  });

  test('initiatePayment should allow specifying a custom base URL', async () => {
    // Setup mock response
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        message: 'Transaction initialized successfully',
        data: {
          id: 'pay_123',
          checkout_url: 'https://checkout.moneroo.io/pay_123'
        },
        errors: null
      })
    };
    global.fetch.mockResolvedValue(mockResponse);

    // Call the function with a custom base URL
    const params = {
      amount: 1000,
      currency: 'XOF',
      description: 'Test payment',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      returnUrl: 'https://example.com/return'
    };
    const customBaseUrl = 'https://api.test.moneroo.io/v1';
    
    await initiatePayment(params, 'test_api_key', customBaseUrl);
    
    // Verify the custom URL was used
    expect(global.fetch).toHaveBeenCalledWith(
      `${customBaseUrl}/payments/initialize`,
      expect.any(Object)
    );
  });

  // Tests for payment methods
  describe('Payment Methods', () => {
    test('initiatePayment should call the API correctly', async () => {
      // Setup mock response
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          message: 'Transaction initialized successfully',
          data: {
            id: 'pay_123',
            checkout_url: 'https://checkout.moneroo.io/pay_123'
          },
          errors: null
        })
      };
      global.fetch.mockResolvedValue(mockResponse);

      // Call the function
      const params = {
        amount: 1000,
        currency: 'XOF',
        description: 'Test payment',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        returnUrl: 'https://example.com/return'
      };
      
      const result = await initiatePayment(params, 'test_api_key');
      
      // Verify the API was called correctly
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.moneroo.io/v1/payments/initialize',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test_api_key'
          }),
          body: expect.any(String)
        })
      );

      // Verify the response was processed correctly
      expect(result).toEqual({
        message: 'Transaction initialized successfully',
        data: {
          id: 'pay_123',
          checkout_url: 'https://checkout.moneroo.io/pay_123'
        },
        errors: null
      });
    });

    test('initiatePayment should handle API errors', async () => {
      // Setup mock error response
      const mockErrorResponse = {
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValue({
          message: 'Invalid request',
          errors: ['Amount is required']
        })
      };
      global.fetch.mockResolvedValue(mockErrorResponse);

      // Call the function with invalid data
      const params = {
        currency: 'XOF',
        description: 'Test payment'
        // Missing required fields
      };
      
      await expect(initiatePayment(params, 'test_api_key'))
        .rejects
        .toThrow('Invalid request');
    });
  });

  // Tests for transaction status
  describe('Transaction Status', () => {
    test('checkTransactionStatus should call the API correctly', async () => {
      // Setup mock response
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          message: 'Transaction fetched successfully',
          data: {
            id: 'pay_123',
            amount: 1000,
            currency: 'XOF',
            status: 'success'
          },
          errors: null
        })
      };
      global.fetch.mockResolvedValue(mockResponse);

      // Call the function
      const result = await checkTransactionStatus('pay_123', 'test_api_key');
      
      // Verify the API was called correctly
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.moneroo.io/v1/payments/pay_123',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test_api_key'
          })
        })
      );

      // Verify the response was processed correctly
      expect(result).toEqual({
        message: 'Transaction fetched successfully',
        data: {
          id: 'pay_123',
          amount: 1000,
          currency: 'XOF',
          status: 'success'
        },
        errors: null
      });
    });

    test('checkTransactionStatus should throw an error if API key is not provided', async () => {
      await expect(checkTransactionStatus('pay_123', null))
        .rejects
        .toThrow('A Moneroo API key is required');
    });
  });
});
