import { OffRampConfig } from './types';

export class OffRampIntegration {
  private config: OffRampConfig;

  constructor(config: OffRampConfig) {
    this.config = config;
  }



  
  /**
   * Generate a Moonpay purchase URL to fund a C-address via credit card.
   * Users complete purchase on Moonpay; funds are forwarded to the C-address
   * via the bridge contract.
   */
  getMoonpayUrl(params: {
    targetCAddress: string;
    amount: string;
    currency: string;
    assetCode?: string;
  }): string {
    const baseUrl = this.config.testMode
      ? 'https://buy-staging.moonpay.com'
      : 'https://buy.moonpay.com';

    const url = new URL(baseUrl);
    url.searchParams.set('apiKey', this.config.moonpayApiKey || '');
    url.searchParams.set('currency', params.currency);
    url.searchParams.set('baseCurrencyAmount', params.amount);
    if (params.assetCode) {
      url.searchParams.set('baseCurrencyCode', params.assetCode);
    }

    const walletAddress = params.targetCAddress;
    url.searchParams.set('walletAddress', walletAddress);

    return url.toString();
  }

  /**
   * Generate a Transak purchase URL to fund a C-address via credit card.
   */
  getTransakUrl(params: {
    targetCAddress: string;
    amount: string;
    currency: string;
    fiatCurrency?: string;
  }): string {
    const baseUrl = this.config.testMode
      ? 'https://global-staging.transak.com'
      : 'https://global.transak.com';

    const url = new URL(baseUrl);
    url.searchParams.set('apiKey', this.config.transakApiKey || '');
    url.searchParams.set('defaultCryptoCurrency', 'XLM');
    url.searchParams.set('walletAddress', params.targetCAddress);
    url.searchParams.set('defaultFiatAmount', params.amount);
    if (params.fiatCurrency) {
      url.searchParams.set('fiatCurrency', params.fiatCurrency);
    }
    url.searchParams.set('network', 'stellar');

    return url.toString();
  }

  /**
   * Generate a CEX (Centralized Exchange) deposit memo that encodes
   * the target C-address so the bridge contract can route the funds.
   *
   * The memo format is: "bridge:<target_c_address>"
   */
  generateCEXDepositMemo(targetCAddress: string): string {
    return `bridge:${targetCAddress}`;
  }

  /**
   * Decode a CEX deposit memo to extract the target C-address.
   */
  decodeCEXDepositMemo(memo: string): string | null {
    if (!memo.startsWith('bridge:')) {
      return null;
    }
    return memo.slice('bridge:'.length);
  }
}
