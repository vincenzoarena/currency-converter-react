import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

var myHeaders = new Headers();
myHeaders.append("apikey", "2AvLGmn9YmUEbyVP4l36yxCbwBFgpeUQ");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const BASE_URL = 'https://api.apilayer.com/exchangerates_data/live'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState(["Select Currency", "🇦🇫 AFA", "🇦🇱 ALL", "🇩🇿 DZD", "🇦🇴 AOA", "🇦🇷 ARS", "🇦🇲 AMD", "🇦🇼 AWG", "🇦🇺 AUD", "🇦🇿 AZN", "🇧🇸 BSD", "🇧🇭 BHD", "🇧🇩 BDT", "🇧🇧 BBD", "🇧🇾 BYR", "🇧🇿 BZD", "🇧🇲 BMD", "🇧🇹 BTN", "🤑 BTC", "🇧🇴 BOB", "🇧🇦 BAM", "🇧🇼 BWP", "🇧🇷 BRL", "🇬🇧 GBP", "🇧🇳 BND", "🇧🇬 BGN", "🇧🇮 BIF", "🇰🇭 KHR", "🇨🇦 CAD", "🇨🇻 CVE", "🇰🇾 KYD", "🤑 XOF", "🤑 XAF", "🤑 XPF", "🇨🇱 CLP", "🇨🇳 CNY", "🇨🇴 COP", "🇰🇲 KMF", "🇨🇩 CDF", "🇨🇷 CRC", "🇭🇷 HRK", "🇨🇺 CUC", "🇨🇿 CZK", "🇩🇰 DKK", "🇩🇯 DJF", "🇩🇴 DOP", "🤑 XCD", "🇪🇬 EGP", "🇪🇷 ERN", "🇪🇹 ETB", "🇪🇺 EUR", "🇫🇰 FKP", "🇫🇯 FJD", "🇬🇲 GMD", "🇬🇪 GEL", "🇬🇭 GHS", "🇬🇮 GIP", "🇬🇹 GTQ", "🇬🇳 GNF", "🇬🇾 GYD", "🇭🇹 HTG", "🇭🇳 HNL", "🇭🇰 HKD", "🇭🇺 HUF", "🇮🇸 ISK", "🇮🇳 INR", "🇮🇩 IDR", "🇮🇷 IRR", "🇮🇶 IQD", "🇮🇱 ILS", "🇯🇲 JMD", "🇯🇵 JPY", "🇯🇴 JOD", "🇰🇿 KZT", "🇰🇪 KES", "🇰🇼 KWD", "🇰🇬 KGS", "🇱🇦 LAK", "🇱🇧 LBP", "🇱🇸 LSL", "🇱🇷 LRD", "🇱🇾 LYD", "🇱🇹 LTL", "🇲🇴 MOP", "🇲🇰 MKD", "🇲🇬 MGA", "🇲🇼 MWK", "🇲🇾 MYR", "🇲🇻 MVR", "🇲🇷 MRO", "🇲🇺 MUR", "🇲🇽 MXN", "🇲🇩 MDL", "🇲🇳 MNT", "🇲🇦 MAD", "🇲🇿 MZM", "🇲🇲 MMK", "🇳🇦 NAD", "🇳🇵 NPR", "🇹🇼 TWD", "🇳🇿 NZD", "🇳🇮 NIO", "🇳🇬 NGN", "🇰🇵 KPW", "🇳🇴 NOK", "🇴🇲 OMR", "🇵🇰 PKR", "🇵🇦 PAB", "🇵🇬 PGK", "🇵🇾 PYG", "🇵🇪 PEN", "🇵🇭 PHP", "🇵🇱 PLN", "🇶🇦 QAR", "🇷🇴 RON", "🇷🇺 RUB", "🇷🇼 RWF", "🇸🇻 SVC", "🇼🇸 WST", "🇸🇦 SAR", "🇷🇸 RSD", "🇸🇨 SCR", "🇸🇱 SLL", "🇸🇬 SGD", "🇸🇰 SKK", "🇸🇧 SBD", "🇸🇴 SOS", "🇿🇦 ZAR", "🇰🇷 KRW", "🤑 XDR", "🇱🇰 LKR", "🇸🇭 SHP", "🇸🇩 SDG", "🇸🇷 SRD", "🇸🇿 SZL", "🇸🇪 SEK", "🇨🇭 CHF", "🇸🇾 SYP", "🇸🇹 STD", "🇹🇯 TJS", "🇹🇿 TZS", "🇹🇭 THB", "🇹🇴 TOP", "🇹🇹 TTD", "🇹🇳 TND", "🇹🇷 TRY", "🇹🇲 TMT", "🇺🇬 UGX", "🇺🇦 UAH", "🇦🇪 AED", "🇺🇾 UYU", "🇺🇸 USD", "🇺🇿 UZS", "🇻🇺 VUV", "🇻🇪 VEF", "🇻🇳 VND", "🇾🇪 YER", "🇿🇲 ZMK"])
  const [fromCurrency, setFromCurrency] = useState("Select Currency")
  const [toCurrency, setToCurrency] = useState("Select Currency")
  const [exchangeRate, setExchangeRate] = useState(0)
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [result, setResult] = useState(0)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  /* useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, []) */

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      /* fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`, requestOptions)
        .then(res => res.json())
        .then(data => {console.log(data); setExchangeRate(data.rates[toCurrency])}) */
      fetch(`https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result); setResult(result.result)})
        .catch(error => console.log('error', error));
    }
  }, [fromCurrency, toCurrency, amount])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className='money-box'>
      <h1>Currency<br></br>Converter</h1>
      <CurrencyRow
        read={false}
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        read={true}
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={result}
      />
    </div>
  );
}

export default App;