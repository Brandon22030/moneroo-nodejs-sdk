import type { PaymentMethod } from './methods';

/**
 * Parameters for initiating a payment
 */
export interface PaymentInitParams {
  /** Payment amount (in cents) */
  amount: number;
  /** Payment currency (e.g. 'XOF') */
  currency: string;
  /** Payment description */
  description: string;
  /** Customer email */
  email: string;
  /** Customer first name */
  firstName: string;
  /** Customer last name */
  lastName: string;
  /** Return URL after payment */
  returnUrl: string;
  /** 
   * Specific payment method to use (optional)
   * If not provided, the customer will be able to choose from available methods
   */
  paymentMethod?: PaymentMethod;
  /** 
   * List of accepted payment methods (deprecated, use paymentMethod instead)
   * @deprecated Use paymentMethod instead for better type safety
   */
  methods?: PaymentMethod[];
}

/**
 * Interface for error responses
 */
interface ApiError {
  [key: string]: string | string[] | { [key: string]: string } | undefined;
  message?: string;
  code?: string;
}

/**
 * Response from payment initialization
 */
export interface PaymentResponse {
  /** Response message */
  message: string;
  /** Response data */
  data: {
    /** Transaction ID */
    id: string;
    /** URL to redirect the customer to */
    checkout_url: string;
  };
  /** Errors if any */
  errors?: ApiError;
}

/**
 * Response from transaction status check
 */
export interface TransactionStatus {
  /** Response message */
  message: string;
  /** Response data */
  data: {
    /** Transaction ID */
    id: string;
    /** Transaction status (e.g. 'completed', 'pending', 'failed') */
    status: string;
    /** Payment method used for the transaction */
    payment_method?: string;
    /** Payment method code (enum value) */
    paymentMethod?: PaymentMethod;
    /** Transaction amount */
    amount: string;
    /** Transaction currency */
    currency: string;
    /** Customer information */
    customer: {
      email: string;
      first_name: string;
      last_name: string;
    };
    /** Creation date */
    created_at: string;
    /** Last update date */
    updated_at: string;
  };
  /** Errors if any */
  errors?: ApiError;
}
