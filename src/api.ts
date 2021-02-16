import { QueryObserverOptions } from "react-query";

export interface Time {
  updated: string;
  updatedISO: Date;
}

export interface USD {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface GBP {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface EUR {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Bpi {
  USD: USD;
  GBP: GBP;
  EUR: EUR;
}

export interface BpiData {
  time: Time;
  disclaimer: string;
  bpi: Bpi;
}

/**
 * A free API for demonstration purposes
 */
export const getPrices = async (): Promise<BpiData> =>
  (await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")).json();

/**
 * Return a query object
 * for retrieving Bitcoin Prices
 * from the Coindesk API
 */
export const getPricesQO = (params?: {
  enabled: boolean;
}): QueryObserverOptions<BpiData, Error> => ({
  queryKey: "currentPrices",
  queryFn: getPrices,
  enabled: params?.enabled === true
});
