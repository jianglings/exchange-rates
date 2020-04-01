// 获取节点
const currencyEl_one = document.getElementById('currency-one'),
    amountEl_one = document.getElementById('amount-one'),
    currencyEl_two = document.getElementById('currency-two'),
    amountEl_two = document.getElementById('amount-two'),
    swap = document.getElementById('swap'),
    rateEl = document.getElementById('rate');



// 通过fetch获取汇率并实现dom 更新
function caculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate}${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);

        })
}



// 事件监听
currencyEl_one.addEventListener('change', caculate)
amountEl_one.addEventListener('input', caculate)
currencyEl_two.addEventListener('change', caculate)
amountEl_two.addEventListener('input', caculate)


swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    caculate();
})


caculate()