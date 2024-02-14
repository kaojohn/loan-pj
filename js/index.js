const amountE1 = document.querySelector("#amount");
const yearsE1 = document.querySelector("#years");
const rateE1 = document.querySelector("#rate");
const feeE1 = document.querySelector("#fee");
const repayment1E1 = document.querySelector("#repayment1");
const repayment2E1 = document.querySelector("#repayment2");
const tableE1 = document.querySelector("#table tbody");
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
    } else if (rule == 2) {
        result = rule2(amount, years, rate);
    } else {
        alert(敬請期待)
        return;
    }
    // 總利息
    let totalInterest = result[1];

    // 總金額
    let totalAmount = amount + totalInterest + fee;

    document.querySelector(".totalAmount").innerText = totalAmount + (fee == 0 ? "" : "(含手續費)") + "元";
    document.querySelector(".totalInterest").innerText = totalInterest + "元";

    const resultE1 = document.querySelector("#result");
    setTimeout(function () { resultE1.style.display = "block"; }, 500);

    drawTable(result[0]);
}

function reset() {
    alert("清除完成!")
    amountE1.value = 0;
    rateE1.value = 0;
    const resultE1 = document.querySelector("#result");
    setTimeout(function () { resultE1.style.display = "none"; }, 0);
    drawTable("");


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

function rule2(total_amount, years, rate) {
    let amount = total_amount;
    let period = years * 12;
    //let month_pay = parseInt(amount / period);
    let month_rate = rate / 100 / 12;
    let totalInterest = 0;
    let da = (1 + month_rate) ** period;
    let month_payrate = (da * month_rate) / (da - 1);
    let month_paytoto = Math.round(amount * month_payrate);
    let datas = [];

    for (let i = 0; i < period; i++) {
        interest = Math.round(amount * month_rate)
        month_pay = month_paytoto - interest
        amount -= month_pay

        if (i == period - 1) {
            datas.push([i + 1, month_pay + amount, interest, month_paytoto + amount, 0]);
        } else {

            datas.push([i + 1, month_pay, interest, month_paytoto, amount]);
        }
        totalInterest += interest;

    }
    console.log(datas);
    return [datas, totalInterest]

}



function drawTable(datas) {
    let tableStr = "";
    for (let i = 0; i < datas.length; i++) {
        tableStr += "<tr>";
        for (let j = 0; j < datas[i].length; j++) {
            tableStr += `<td>${datas[i][j]}</td>`;

        }
        tableStr += "</tr>";
    }
    tableE1.innerHTML = tableStr;
    // let tableStr = "<ul>";
    // for (let i = 0; i < datas.length; i++) {
    //     console.log(datas[i].join(","));
    //     tableStr += `<li>${datas[i].join(",")}</li>`;
    // }

    // tableStr += "</ul>";
    // tableE1.innerHTML = tableStr;
}