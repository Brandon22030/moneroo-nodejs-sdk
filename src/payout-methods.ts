/**
 * List of all available payout methods supported by Moneroo
 */
export enum PayoutMethod {
  // MTN
  MtnBJ = 'mtn_bj', // MTN Mobile Money Benin
  
  // Moov
  MoovBJ = 'moov_bj', // Moov Money Benin
  
  // Orange
  OrangeSN = 'orange_sn', // Orange Money Senegal
  OrangeCI = 'orange_ci', // Orange Money Ivory Coast
  OrangeML = 'orange_ml', // Orange Money Mali
  
  // E-Money
  EMoneySN = 'e_money_sn', // E-Money Senegal
  
  // Wave
  WaveSN = 'wave_sn', // Wave Senegal
  WaveCI = 'wave_ci', // Wave Ivory Coast
  
  // Free Money
  FreeMoneySN = 'freemoney_sn', // Free Money Senegal
  
  // MTN MoMo
  MtnCI = 'mtn_ci', // MTN MoMo Ivory Coast
  
  // Moov Money
  MoovCI = 'moov_ci', // Moov Money Ivory Coast
  
  // T-Money
  Togocel = 'togocel', // T-Money Togo
  
  // Djamo
  DjamoCI = 'djamo_ci', // Djamo Ivory Coast
  DjamoSN = 'djamo_sn', // Djamo Senegal
  
  // Demo
  MonerooPayoutDemo = 'moneroo_payout_demo' // Moneroo Demo Transfer
}

/**
 * Interface representing a payout method with its details
 */
export interface PayoutMethodDetails {
  /** Display name of the payout method */
  name: string;
  
  /** Unique code of the payout method */
  code: PayoutMethod;
  
  /** Currency code (ISO 4217) */
  currency: string;
  
  /** Array of country codes (ISO 3166-1 alpha-2) where this method is available */
  countries: string[];
  
  /** Required fields for this payout method */
  requiredFields: string[];
}

/**
 * Object containing all available payout methods with their details
 */
export const PayoutMethods: Record<PayoutMethod, PayoutMethodDetails> = {
  // MTN
  [PayoutMethod.MtnBJ]: { 
    name: 'MTN Mobile Money Benin', 
    code: PayoutMethod.MtnBJ, 
    currency: 'XOF', 
    countries: ['BJ'],
    requiredFields: ['msisdn']
  },
  
  // Moov
  [PayoutMethod.MoovBJ]: { 
    name: 'Moov Money Benin', 
    code: PayoutMethod.MoovBJ, 
    currency: 'XOF', 
    countries: ['BJ'],
    requiredFields: ['msisdn']
  },
  
  // Orange
  [PayoutMethod.OrangeSN]: { 
    name: 'Orange Money Senegal', 
    code: PayoutMethod.OrangeSN, 
    currency: 'XOF', 
    countries: ['SN'],
    requiredFields: ['msisdn']
  },
  [PayoutMethod.OrangeCI]: { 
    name: 'Orange Money Ivory Coast', 
    code: PayoutMethod.OrangeCI, 
    currency: 'XOF', 
    countries: ['CI'],
    requiredFields: ['msisdn']
  },
  [PayoutMethod.OrangeML]: { 
    name: 'Orange Money Mali', 
    code: PayoutMethod.OrangeML, 
    currency: 'XOF', 
    countries: ['ML'],
    requiredFields: ['msisdn']
  },
  
  // E-Money
  [PayoutMethod.EMoneySN]: { 
    name: 'E-money Senegal', 
    code: PayoutMethod.EMoneySN, 
    currency: 'XOF', 
    countries: ['SN'],
    requiredFields: ['msisdn']
  },
  
  // Wave
  [PayoutMethod.WaveSN]: { 
    name: 'Wave Senegal', 
    code: PayoutMethod.WaveSN, 
    currency: 'XOF', 
    countries: ['SN'],
    requiredFields: ['msisdn']
  },
  [PayoutMethod.WaveCI]: { 
    name: 'Wave Ivory Coast', 
    code: PayoutMethod.WaveCI, 
    currency: 'XOF', 
    countries: ['CI'],
    requiredFields: ['msisdn']
  },
  
  // Free Money
  [PayoutMethod.FreeMoneySN]: { 
    name: 'Free Money Senegal', 
    code: PayoutMethod.FreeMoneySN, 
    currency: 'XOF', 
    countries: ['SN'],
    requiredFields: ['msisdn']
  },
  
  // MTN MoMo
  [PayoutMethod.MtnCI]: { 
    name: 'MTN MoMo Ivory Coast', 
    code: PayoutMethod.MtnCI, 
    currency: 'XOF', 
    countries: ['CI'],
    requiredFields: ['msisdn']
  },
  
  // Moov Money
  [PayoutMethod.MoovCI]: { 
    name: 'Moov Money Ivory Coast', 
    code: PayoutMethod.MoovCI, 
    currency: 'XOF', 
    countries: ['CI'],
    requiredFields: ['msisdn']
  },
  
  // T-Money
  [PayoutMethod.Togocel]: { 
    name: 'T-Money', 
    code: PayoutMethod.Togocel, 
    currency: 'XOF', 
    countries: ['TG'],
    requiredFields: ['msisdn']
  },
  
  // Djamo
  [PayoutMethod.DjamoCI]: { 
    name: 'Djamo Ivory Coast', 
    code: PayoutMethod.DjamoCI, 
    currency: 'XOF', 
    countries: ['CI'],
    requiredFields: ['msisdn']
  },
  [PayoutMethod.DjamoSN]: { 
    name: 'Djamo Senegal', 
    code: PayoutMethod.DjamoSN, 
    currency: 'XOF', 
    countries: ['SN'],
    requiredFields: ['msisdn']
  },
  
  // Demo
  [PayoutMethod.MonerooPayoutDemo]: { 
    name: 'Moneroo Demo Transfer', 
    code: PayoutMethod.MonerooPayoutDemo, 
    currency: 'XOF', 
    countries: ['US'],
    requiredFields: ['account_number']
  }
};

/**
 * Utilities for payout methods
 */
export const PayoutMethodUtils = {
  /**
   * Gets the details of a specific payout method
   * @param method - Payout method code
   * @returns Details of the payout method or undefined if not found
   */
  getDetails: (method: PayoutMethod): PayoutMethodDetails | undefined => {
    return PayoutMethods[method];
  },
  
  /**
   * Gets all available payout methods
   * @returns Array of all payout methods with their details
   */
  getAll: (): PayoutMethodDetails[] => {
    return Object.values(PayoutMethods);
  },
  
  /**
   * Gets the available payout methods for a specific country
   * @param countryCode - ISO 3166-1 alpha-2 country code
   * @returns Array of payout methods available for the specified country
   */
  getByCountry: (countryCode: string): PayoutMethodDetails[] => {
    return Object.values(PayoutMethods).filter(method => 
      method.countries.includes(countryCode.toUpperCase())
    );
  },
  
  /**
   * Gets the available payout methods for a specific currency
   * @param currencyCode - ISO 4217 currency code
   * @returns Array of payout methods available for the specified currency
   */
  getByCurrency: (currencyCode: string): PayoutMethodDetails[] => {
    return Object.values(PayoutMethods).filter(method => 
      method.currency === currencyCode.toUpperCase()
    );
  }
};
