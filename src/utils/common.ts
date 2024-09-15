import statusJson from './status.json'

export interface TopLevel {
  user:     { [key: string]: User };
  lock:     { [key: string]: BankKind };
  bankType: { [key: string]: BankKind };
  bankKind: { [key: string]: BankKind };
  identity: { [key: string]: BankKind };
}

export interface BankKind {
  label: string;
  type:  string;
}

export interface User {
  label: string;
  type:  string;
  hint:  string;
}

export const curr = [
  "INR", "NGN", "USD", "BRL", "ZAR", "AED", "AFN", "ALL", "AMD", "ANG", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "ARS", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "AUD", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NIO", "AWG", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "AZN", "XOF", "XPF", "YER", "AOA", "ZMW",
]
export const getDayTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return [`${year}-${month}-${day}`, `${year}-${month}-${day}`]
}
export const getStatus = (type:any, key:any) => {
  if ((statusJson as TopLevel)[type as keyof TopLevel]) {
    return (statusJson as TopLevel)[type as keyof TopLevel][key]
  } else {
    return '--'
  }
}