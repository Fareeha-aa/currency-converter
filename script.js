const apiKey =  "336969657f17eb44e781bfb9"; // Replace with your API key
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Populate currency dropdowns
async function populateCurrencies() {
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
  const data = await res.json();
  const currencies = data.supported_codes;

  currencies.forEach(([code, name]) => {
    const option1 = new Option(`${name} (${code})`, code);
    const option2 = new Option(`${name} (${code})`, code);
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "EUR";
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt)) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`);
  const data = await res.json();

  if (data.result === "success") {
    const converted = (amt * data.conversion_rate).toFixed(2);
    result.textContent = `${amt} ${from} = ${converted} ${to}`;
  } else {
    result.textContent = "Error fetching conversion rate.";
  }
}

populateCurrencies();
