import type { PaymentMethod } from './methods';
import type { PayoutMethod } from './payout-methods';

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

/**
 * Interface pour les informations du client pour un payout
 */
export interface PayoutCustomer {
  /** Email du client */
  email: string;
  /** Prénom du client */
  first_name: string;
  /** Nom du client */
  last_name: string;
  /** Numéro de téléphone du client (format E164) */
  phone?: string;
  /** Adresse du client */
  address?: string;
  /** Ville du client */
  city?: string;
  /** État/Province du client */
  state?: string;
  /** Pays du client (format ISO 3166-1 alpha-2) */
  country?: string;
  /** Code postal du client */
  zip?: string;
}

/**
 * Paramètres pour initialiser un payout
 */
export interface PayoutInitParams {
  /** Montant du payout (en centimes) */
  amount: number;
  /** Devise du payout (ex: 'XOF') */
  currency: string;
  /** Description du payout */
  description: string;
  /** Informations sur le client */
  customer: PayoutCustomer;
  /** Méthode de payout à utiliser */
  method: PayoutMethod;
  /** Numéro de téléphone pour recevoir le payout (format international) */
  phone?: string;
  /** Numéro de téléphone MTN Mobile Money (pour mtn_bj) */
  msisdn?: string;
  /** Numéro de compte (pour moneroo_payout_demo) */
  account_number?: string;
  /** Métadonnées supplémentaires pour le payout */
  metadata?: Record<string, unknown>;
}

/**
 * Réponse de l'initialisation d'un payout
 */
export interface PayoutResponse {
  /** Indique si la requête a réussi */
  success: boolean;
  /** Message de réponse */
  message: string;
  /** Données de réponse */
  data: {
    /** ID de la transaction de payout */
    id: string;
  };
  /** Erreurs éventuelles */
  errors?: ApiError;
}

/**
 * Statut d'une transaction de payout
 */
export interface PayoutStatus {
  /** Indique si la requête a réussi */
  success: boolean;
  /** Message de réponse */
  message: string;
  /** Données de la transaction */
  data: {
    /** ID de la transaction */
    id: string;
    /** Statut de la transaction (initiated, pending, failed, success) */
    status: 'initiated' | 'pending' | 'failed' | 'success';
    /** Indique si la transaction a été traitée */
    is_processed: boolean;
    /** Date de traitement */
    processed_at?: string;
    /** Montant du payout */
    amount: number;
    /** Devise du payout */
    currency: string;
    /** Montant formaté avec symbole de devise */
    amount_formatted: string;
    /** Description du payout */
    description: string;
    /** URL de retour */
    return_url?: string;
    /** Environnement (production, sandbox) */
    environment: string;
    /** Date d'initialisation */
    initiated_at: string;
    /** Numéro de téléphone utilisé pour le payout */
    payout_phone_number?: string;
    /** Informations sur l'application */
    app?: {
      id: string;
      name: string;
      icon_url: string;
    };
    /** Informations sur le client */
    customer: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      country_code?: string;
      country?: string;
      zip_code?: string;
      environment: string;
      created_at: string;
      updated_at: string;
    };
    /** Informations sur la méthode de payout */
    method: {
      name: string;
      code: string;
      icon_url: string;
      environment: string;
    };
    /** Informations sur la passerelle de paiement */
    gateway: {
      name: string;
      account_name: string;
      code: string;
      icon_url: string;
      environment: string;
    };
    /** Métadonnées associées à la transaction */
    metadata?: Record<string, unknown>;
    /** Contexte de la transaction */
    context?: {
      ip: string;
      user_agent: string;
      country: string;
      local: string;
    };
  };
  /** Erreurs éventuelles */
  errors?: ApiError;
}
