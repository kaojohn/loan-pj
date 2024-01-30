const amountE1 = document.querySelector("#amount");
const yearsE1 = document.querySelector("#years");
const rateE1 = document.querySelector("#rate");
const feeE1 = document.querySelector("#fee");
const repayment1E1 = document.querySelector("#repayment1");
const repayment2E1 = document.querySelector("#repayment2");

const calcE1 = document.querySelector("#calc");
const resetE1 = document.querySelector("#reset");

calcE1.addEventListener("click", calcLoan);
resetE1.addEventListener("click", reset);

function calcLoan() {
    let amount = amountE1.value * 10000;
    let years = yearsE1.value;
    let rate = rateE1.value;

    let fee = feeE1.checked ? 5000 : 0;
    let rule = repayment1E1.checked ? 1 : 2;
    let result;

    if (rule == 1) {
        result = rule1(amount, years, rate);
        console.log(result);
    } else {

    }
    // 總利息
    let totalInterest = result[1];

    // 總金額
    let totalAmount = amount + totalInterest + fee;

    document.querySelector(".totalAmount").innerText = totalAmount + (fee == 0 ? "" : "(含手續費)") + "元";
    document.querySelector(".totalInterest").innerText = totalInterest + "元";

    const resultE1 = document.querySelector("#result");
    setTimeout(function () { resultE1.style.display = "block"; }, 500);


}

function reset() {
    alert("清除完成!")
    amountE1.value = 0;
    rateE1.value = 0;
    const resultE1 = document.querySelector("#result");
    setTimeout(function () { resultE1.style.display = "none"; }, 0);

}

function rule1(total_amount, years, rate) {
    let amount = total_amount;
    let period = years * 12;
    let month_pay = parseInt(amount / period);
    let month_rate = rate / 100 / 12;
    let totalInterest = 0;
    let datas = [];

    for (let i = 0; i < period; i++) {
        interest = Math.round(amount * month_rate)
        amount -= month_pay

        if (i == period - 1) {
            datas.push([i + 1, month_pay + amount, interest, month_pay + amount + interest, 0]);
        } else {

            datas.push([i + 1, month_pay, interest, month_pay + interest, amount]);
        }
        totalInterest += interest;

    }
    console.log(datas);
    return [datas, totalInterest];
}