const amountE1 = document.querySelector("#amount");
const yearsE1 = document.querySelector("#years");
const rateE1 = document.querySelector("#rate");
const feeE1 = document.querySelector("#fee");
const repayment1E1 = document.querySelector("#repayment1");
const repayment2E1 = document.querySelector("#repayment2");

const calcE1 = document.querySelector("#calc");

console.log(amountE1, yearsE1, rateE1, feeE1, repayment1E1, repayment2E1);

calcE1.addEventListener("click", calcLoan);

function calcLoan() {
    let amount = amountE1.value * 10000;
    let years = yearsE1.value;
    let rate = rateE1.value / 100;

    let fee = feeE1.checked ? 5000 : 0;
    let rule = repayment1E1.checked ? 1 : 2;

    // 利息
    let totalInterest = amount * rate * years;
    // 總金額
    let totalAmount = amount + totalInterest + fee;

    document.querySelector(".totalAmount").innerText = totalAmount / 10000 + (fee / 10000 == 0 ? "" : "(含手續費)") + "萬元";
    document.querySelector(".totalInterest").innerText = totalInterest;

    const resultE1 = document.querySelector("#result");
    setTimeout(function () { resultE1.style.display = "block"; }, 500);


}

// function reset() {

// }