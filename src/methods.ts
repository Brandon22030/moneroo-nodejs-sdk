/**
 * Enumeration of all available payment methods supported by Moneroo
 */
export enum PaymentMethod {
  // Airtel
  AirtelCD = 'airtel_cd', // Airtel Congo
  AirtelMW = 'airtel_mw', // Airtel Money Malawi
  AirtelNE = 'airtel_ne', // Airtel Niger
  AirtelNG = 'airtel_ng', // Airtel Nigeria
  AirtelRW = 'airtel_rw', // Airtel Rwanda
  AirtelTZ = 'airtel_tz', // Airtel Tanzania
  AirtelUG = 'airtel_ug', // Airtel Uganda
  AirtelZM = 'airtel_zm', // Airtel Zambia
  
  // Bank Transfer
  BankTransferNG = 'bank_transfer_ng', // Bank Transfer NG
  
  // Barter
  Barter = 'barter', // Barter
  
  // Card Payments
  CardGHS = 'card_ghs', // Card GHS
  CardKES = 'card_kes', // Card KES
  CardNGN = 'card_ngn', // Card NGN
  CardTZS = 'card_tzs', // Card TZS
  CardUGX = 'card_ugx', // Card UGX
  CardUSD = 'card_usd', // Card USD
  CardXAF = 'card_xaf', // Card XAF
  CardXOF = 'card_xof', // Card XOF
  CardZAR = 'card_zar', // Card ZAR
  
  // Crypto
  CryptoEUR = 'crypto_eur', // Crypto EUR
  CryptoGHS = 'crypto_ghs', // Crypto GHS
  CryptoNGN = 'crypto_ngn', // Crypto NGN
  CryptoUSD = 'crypto_usd', // Crypto USD
  CryptoXAF = 'crypto_xaf', // Crypto XAF
  CryptoXOF = 'crypto_xof', // Crypto XOF
  
  // E-Money
  EMoneySN = 'e_money_sn', // E-Money SN
  
  // EU Mobile Money
  EUMobileCM = 'eu_mobile_cm', // EU Mobile CM
  
  // Free Money
  FreeMoneySN = 'freemoney_sn', // Free Money SN
  
  // Halopesa
  HalopesaTZ = 'halopesa_tz', // Halopesa TZ
  
  // Mobi Cash
  MobiCashML = 'mobi_cash_ml', // Mobi Cash ML
  
  // Moneroo Demo
  MonerooPaymentDemo = 'moneroo_payment_demo', // Moneroo Demo
  
  // Moov
  MoovBF = 'moov_bf', // Moov BF
  MoovBJ = 'moov_bj', // Moov BJ
  MoovCI = 'moov_ci', // Moov CI
  MoovML = 'moov_ml', // Moov ML
  MoovTG = 'moov_tg', // Moov TG
  
  // M-Pesa
  MpesaKE = 'mpesa_ke', // M-Pesa KE
  MpesaTZ = 'mpesa_tz', // M-Pesa TZ
  
  // MTN
  MtnBJ = 'mtn_bj', // MTN BJ
  MtnCI = 'mtn_ci', // MTN CI
  MtnCM = 'mtn_cm', // MTN CM
  MtnGH = 'mtn_gh', // MTN GH
  MtnGN = 'mtn_gn', // MTN GN
  MtnNG = 'mtn_ng', // MTN NG
  MtnRW = 'mtn_rw', // MTN RW
  MtnUG = 'mtn_ug', // MTN UG
  MtnZM = 'mtn_zm', // MTN ZM
  
  // Orange
  OrangeBF = 'orange_bf', // Orange BF
  OrangeCD = 'orange_cd', // Orange CD
  OrangeCI = 'orange_ci', // Orange CI
  OrangeCM = 'orange_cm', // Orange CM
  OrangeGN = 'orange_gn', // Orange GN
  OrangeML = 'orange_ml', // Orange ML
  OrangeSN = 'orange_sn', // Orange SN
  
  // QR Code
  QRNGN = 'qr_ngn', // QR Code NGN
  
  // Tigo
  TigoGH = 'tigo_gh', // Tigo GH
  TigoTZ = 'tigo_tz', // Tigo TZ
  
  // TNM
  TNMMW = 'tnm_mw', // TNM MW
  
  // Togocel
  Togocel = 'togocel', // Togocel
  
  // USSD
  USSDNGN = 'ussd_ngn', // USSD NGN
  
  // Vodacom
  VodacomCD = 'vodacom_cd', // Vodacom CD
  
  // Vodafone
  VodafoneGH = 'vodafone_gh', // Vodafone GH
  
  // Wave
  WaveCI = 'wave_ci', // Wave CI
  WaveSN = 'wave_sn', // Wave SN
  
  // Wizall
  WizallSN = 'wizall_sn', // Wizall SN
  
  // Zamtel
  ZamtelZM = 'zamtel_zm' // Zamtel ZM
}

/**
 * Interface representing a payment method with its details
 */
interface PaymentMethodDetails {
  /** Display name of the payment method */
  name: string;
  
  /** Unique code of the payment method */
  code: PaymentMethod;
  
  /** Currency code (ISO 4217) */
  currency: string;
  
  /** Array of country codes (ISO 3166-1 alpha-2) where this method is available */
  countries: string[];
}

/**
 * Object containing all available payment methods with their details
 */
const PaymentMethods: Record<PaymentMethod, PaymentMethodDetails> = {
  // Airtel
  [PaymentMethod.AirtelCD]: { name: 'Airtel Congo', code: PaymentMethod.AirtelCD, currency: 'CDF', countries: ['CD'] },
  [PaymentMethod.AirtelMW]: { name: 'Airtel Money Malawi', code: PaymentMethod.AirtelMW, currency: 'MWK', countries: ['MW'] },
  [PaymentMethod.AirtelNE]: { name: 'Airtel Niger', code: PaymentMethod.AirtelNE, currency: 'XOF', countries: ['NE'] },
  [PaymentMethod.AirtelNG]: { name: 'Airtel Nigeria', code: PaymentMethod.AirtelNG, currency: 'NGN', countries: ['NG'] },
  [PaymentMethod.AirtelRW]: { name: 'Airtel Rwanda', code: PaymentMethod.AirtelRW, currency: 'RWF', countries: ['RW'] },
  [PaymentMethod.AirtelTZ]: { name: 'Airtel Tanzania', code: PaymentMethod.AirtelTZ, currency: 'TZS', countries: ['TZ'] },
  [PaymentMethod.AirtelUG]: { name: 'Airtel Uganda', code: PaymentMethod.AirtelUG, currency: 'UGX', countries: ['UG'] },
  [PaymentMethod.AirtelZM]: { name: 'Airtel Zambia', code: PaymentMethod.AirtelZM, currency: 'ZMW', countries: ['ZM'] },
  
  // Bank Transfer
  [PaymentMethod.BankTransferNG]: { name: 'Bank Transfer Nigeria', code: PaymentMethod.BankTransferNG, currency: 'NGN', countries: ['NG'] },
  
  // Barter
  [PaymentMethod.Barter]: { name: 'Barter', code: PaymentMethod.Barter, currency: 'NGN', countries: ['NG'] },
  
  // Card Payments
  [PaymentMethod.CardGHS]: { name: 'Card Ghana', code: PaymentMethod.CardGHS, currency: 'GHS', countries: ['GH'] },
  [PaymentMethod.CardKES]: { name: 'Card Kenya', code: PaymentMethod.CardKES, currency: 'KES', countries: ['KE'] },
  [PaymentMethod.CardNGN]: { name: 'Card Nigeria', code: PaymentMethod.CardNGN, currency: 'NGN', countries: ['NG'] },
  [PaymentMethod.CardTZS]: { name: 'Card Tanzania', code: PaymentMethod.CardTZS, currency: 'TZS', countries: ['TZ'] },
  [PaymentMethod.CardUGX]: { name: 'Card Uganda', code: PaymentMethod.CardUGX, currency: 'UGX', countries: ['UG'] },
  [PaymentMethod.CardUSD]: { name: 'Card USD', code: PaymentMethod.CardUSD, currency: 'USD', countries: ['US'] },
  [PaymentMethod.CardXAF]: { name: 'Card XAF', code: PaymentMethod.CardXAF, currency: 'XAF', countries: ['CM', 'CF', 'CG', 'GA', 'GQ', 'TD'] },
  [PaymentMethod.CardXOF]: { name: 'Card XOF', code: PaymentMethod.CardXOF, currency: 'XOF', countries: ['CI', 'BF', 'TG', 'BJ', 'ML'] },
  [PaymentMethod.CardZAR]: { name: 'Card South Africa', code: PaymentMethod.CardZAR, currency: 'ZAR', countries: ['ZA'] },
  
  // Crypto
  [PaymentMethod.CryptoEUR]: { name: 'Crypto EUR', code: PaymentMethod.CryptoEUR, currency: 'EUR', 
    countries: ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'] },
  [PaymentMethod.CryptoGHS]: { name: 'Crypto Ghana', code: PaymentMethod.CryptoGHS, currency: 'GHS', countries: ['GH'] },
  [PaymentMethod.CryptoNGN]: { name: 'Crypto Nigeria', code: PaymentMethod.CryptoNGN, currency: 'NGN', countries: ['NG'] },
  [PaymentMethod.CryptoUSD]: { name: 'Crypto USD', code: PaymentMethod.CryptoUSD, currency: 'USD', countries: ['US'] },
  [PaymentMethod.CryptoXAF]: { name: 'Crypto XAF', code: PaymentMethod.CryptoXAF, currency: 'XAF', countries: ['CM', 'CF', 'CG', 'GA', 'GQ', 'TD'] },
  [PaymentMethod.CryptoXOF]: { name: 'Crypto XOF', code: PaymentMethod.CryptoXOF, currency: 'XOF', countries: ['BJ', 'BF', 'CI', 'GW', 'ML', 'NE', 'SN', 'TG'] },
  
  // E-Money
  [PaymentMethod.EMoneySN]: { name: 'E-Money Senegal', code: PaymentMethod.EMoneySN, currency: 'XOF', countries: ['SN'] },
  
  // EU Mobile Money
  [PaymentMethod.EUMobileCM]: { name: 'EU Mobile Cameroon', code: PaymentMethod.EUMobileCM, currency: 'XAF', countries: ['CM'] },
  
  // Free Money
  [PaymentMethod.FreeMoneySN]: { name: 'Free Money Senegal', code: PaymentMethod.FreeMoneySN, currency: 'XOF', countries: ['SN'] },
  
  // Halopesa
  [PaymentMethod.HalopesaTZ]: { name: 'Halopesa Tanzania', code: PaymentMethod.HalopesaTZ, currency: 'TZS', countries: ['TZ'] },
  
  // Mobi Cash
  [PaymentMethod.MobiCashML]: { name: 'Mobi Cash Mali', code: PaymentMethod.MobiCashML, currency: 'XOF', countries: ['ML'] },
  
  // Moneroo Demo
  [PaymentMethod.MonerooPaymentDemo]: { name: 'Moneroo Demo', code: PaymentMethod.MonerooPaymentDemo, currency: 'USD', countries: ['US'] },
  
  // Moov
  [PaymentMethod.MoovBF]: { name: 'Moov Burkina Faso', code: PaymentMethod.MoovBF, currency: 'XOF', countries: ['BF'] },
  [PaymentMethod.MoovBJ]: { name: 'Moov Benin', code: PaymentMethod.MoovBJ, currency: 'XOF', countries: ['BJ'] },
  [PaymentMethod.MoovCI]: { name: 'Moov Cote d\'Ivoire', code: PaymentMethod.MoovCI, currency: 'XOF', countries: ['CI'] },
  [PaymentMethod.MoovML]: { name: 'Moov Mali', code: PaymentMethod.MoovML, currency: 'XOF', countries: ['ML'] },
  [PaymentMethod.MoovTG]: { name: 'Moov Togo', code: PaymentMethod.MoovTG, currency: 'XOF', countries: ['TG'] },
  
  // M-Pesa
  [PaymentMethod.MpesaKE]: { name: 'M-Pesa Kenya', code: PaymentMethod.MpesaKE, currency: 'KES', countries: ['KE'] },
  [PaymentMethod.MpesaTZ]: { name: 'M-Pesa Tanzania', code: PaymentMethod.MpesaTZ, currency: 'TZS', countries: ['TZ'] },
  
  // MTN
  [PaymentMethod.MtnBJ]: { name: 'MTN MoMo Benin', code: PaymentMethod.MtnBJ, currency: 'XOF', countries: ['BJ'] },
  [PaymentMethod.MtnCI]: { name: 'MTN MoMo Cote d\'Ivoire', code: PaymentMethod.MtnCI, currency: 'XOF', countries: ['CI'] },
  [PaymentMethod.MtnCM]: { name: 'MTN Mobile Money Cameroon', code: PaymentMethod.MtnCM, currency: 'XAF', countries: ['CM'] },
  [PaymentMethod.MtnGH]: { name: 'MTN Mobile Money Ghana', code: PaymentMethod.MtnGH, currency: 'GHS', countries: ['GH'] },
  [PaymentMethod.MtnGN]: { name: 'MTN Mobile Money Guinea', code: PaymentMethod.MtnGN, currency: 'GNF', countries: ['GN'] },
  [PaymentMethod.MtnNG]: { name: 'MTN Mobile Money Nigeria', code: PaymentMethod.MtnNG, currency: 'NGN', countries: ['NG'] },
  [PaymentMethod.MtnRW]: { name: 'MTN Mobile Money Rwanda', code: PaymentMethod.MtnRW, currency: 'RWF', countries: ['RW'] },
  [PaymentMethod.MtnUG]: { name: 'MTN Mobile Money Uganda', code: PaymentMethod.MtnUG, currency: 'UGX', countries: ['UG'] },
  [PaymentMethod.MtnZM]: { name: 'MTN Mobile Money Zambia', code: PaymentMethod.MtnZM, currency: 'ZMW', countries: ['ZM'] },
  
  // Orange
  [PaymentMethod.OrangeBF]: { name: 'Orange Burkina Faso', code: PaymentMethod.OrangeBF, currency: 'XOF', countries: ['BF'] },
  [PaymentMethod.OrangeCD]: { name: 'Orange Congo', code: PaymentMethod.OrangeCD, currency: 'CDF', countries: ['CD'] },
  [PaymentMethod.OrangeCI]: { name: 'Orange Cote d\'Ivoire', code: PaymentMethod.OrangeCI, currency: 'XOF', countries: ['CI'] },
  [PaymentMethod.OrangeCM]: { name: 'Orange Cameroon', code: PaymentMethod.OrangeCM, currency: 'XAF', countries: ['CM'] },
  [PaymentMethod.OrangeGN]: { name: 'Orange Guinea', code: PaymentMethod.OrangeGN, currency: 'GNF', countries: ['GN'] },
  [PaymentMethod.OrangeML]: { name: 'Orange Mali', code: PaymentMethod.OrangeML, currency: 'XOF', countries: ['ML'] },
  [PaymentMethod.OrangeSN]: { name: 'Orange Senegal', code: PaymentMethod.OrangeSN, currency: 'XOF', countries: ['SN'] },
  
  // QR Code
  [PaymentMethod.QRNGN]: { name: 'QR Code Nigeria', code: PaymentMethod.QRNGN, currency: 'NGN', countries: ['NG'] },
  
  // Tigo
  [PaymentMethod.TigoGH]: { name: 'Tigo Ghana', code: PaymentMethod.TigoGH, currency: 'GHS', countries: ['GH'] },
  [PaymentMethod.TigoTZ]: { name: 'Tigo Tanzania', code: PaymentMethod.TigoTZ, currency: 'TZS', countries: ['TZ'] },
  
  // TNM
  [PaymentMethod.TNMMW]: { name: 'TNM Mpamba Malawi', code: PaymentMethod.TNMMW, currency: 'MWK', countries: ['MW'] },
  
  // Togocel
  [PaymentMethod.Togocel]: { name: 'Togocel', code: PaymentMethod.Togocel, currency: 'XOF', countries: ['TG'] },
  
  // USSD
  [PaymentMethod.USSDNGN]: { name: 'USSD Nigeria', code: PaymentMethod.USSDNGN, currency: 'NGN', countries: ['NG'] },
  
  // Vodacom
  [PaymentMethod.VodacomCD]: { name: 'Vodacom Congo', code: PaymentMethod.VodacomCD, currency: 'CDF', countries: ['CD'] },
  
  // Vodafone
  [PaymentMethod.VodafoneGH]: { name: 'Vodafone Ghana', code: PaymentMethod.VodafoneGH, currency: 'GHS', countries: ['GH'] },
  
  // Wave
  [PaymentMethod.WaveCI]: { name: 'Wave Cote d\'Ivoire', code: PaymentMethod.WaveCI, currency: 'XOF', countries: ['CI'] },
  [PaymentMethod.WaveSN]: { name: 'Wave Senegal', code: PaymentMethod.WaveSN, currency: 'XOF', countries: ['SN'] },
  
  // Wizall
  [PaymentMethod.WizallSN]: { name: 'Wizall Senegal', code: PaymentMethod.WizallSN, currency: 'XOF', countries: ['SN'] },
  
  // Zamtel
  [PaymentMethod.ZamtelZM]: { name: 'Zamtel Zambia', code: PaymentMethod.ZamtelZM, currency: 'ZMW', countries: ['ZM'] }
} as const;

/**
 * Helper functions for working with payment methods
 */
const PaymentMethodUtils = {
  /**
   * Get details for a specific payment method
   * @param method - The payment method code
   * @returns Payment method details or undefined if not found
   */
  getDetails: (method: PaymentMethod): PaymentMethodDetails | undefined => {
    return PaymentMethods[method];
  },
  
  /**
   * Get all available payment methods
   * @returns Array of all payment method details
   */
  getAll: (): PaymentMethodDetails[] => {
    return Object.values(PaymentMethods);
  },
  
  /**
   * Get payment methods available in a specific country
   * @param countryCode - ISO 3166-1 alpha-2 country code
   * @returns Array of payment methods available in the specified country
   */
  getByCountry: (countryCode: string): PaymentMethodDetails[] => {
    return Object.values(PaymentMethods).filter(method => 
      method.countries.includes(countryCode.toUpperCase())
    );
  },
  
  /**
   * Get payment methods that support a specific currency
   * @param currency - ISO 4217 currency code
   * @returns Array of payment methods that support the specified currency
   */
  getByCurrency: (currency: string): PaymentMethodDetails[] => {
    return Object.values(PaymentMethods).filter(method => 
      method.currency === currency.toUpperCase()
    );
  }
};

// Export all types and utilities
export type { PaymentMethodDetails };
export { PaymentMethods, PaymentMethodUtils };
