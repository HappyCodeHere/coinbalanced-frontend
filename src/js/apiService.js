function createContract() {
    var deposit = createDepositObject(true, 100);
    var payment = createPaymentObject('onSum', 'equal');
    var customer = createCustomerObject(true, "Toroh, LTD.", "931289089080984", "6565989843", "0x66227f9e73211e5d9d7cc28163044865bef49eb0", 10000);
    var performer = createPerformerObject(true, "Lotos, LTD.", "482093809234928", "423423423442", "0x7b05f3eef4c863ba0657f402aa96c166d0b0876f", "fixed", 100, null)
    sendCreateContract(1, deposit, payment, customer, performer);
}

function createDepositObject(needDepositValue, depositSumValue){
    var deposit = {
        needDeposit: needDepositValue,
        depositSum: depositSumValue
    }
    return deposit;
}

function createPaymentObject(paymentTypeValue, paymentClauseValue){
    var payment = {
        paymentType: paymentTypeValue,
        paymentClause: paymentClauseValue
    }
    return payment;
}

function createCustomerObject(customerIsCompanyValue, 
    customerNameValue, customerRegisterNumberValue, customerTaxNumberValue, 
    customerAddressValue, customerShareValue) {
        var customer = {
            customerIsCompany: customerIsCompanyValue,
            customerName: customerNameValue,
            customerRegisterNumber: customerRegisterNumberValue,
            customerTaxNumber: customerTaxNumberValue,
            customerAddress: customerAddressValue,
            customerShare: customerShareValue
        }
        return customer;
    }

function createPerformerObject(performerIsCompanyValue, performerNameValue,
    performerRegisterNumberValue, performerTaxNumberValue, performerAddressValue, 
    performerPayTypeValue, performerShareValue, performerFixedSumValue){
    var performer = {
        performerIsCompany: performerIsCompanyValue,
        performerName: performerNameValue,
        performerRegisterNumber: performerRegisterNumberValue,
        performerTaxNumber: performerTaxNumberValue,
        performerAddress: performerAddressValue,
        performerPayType: performerPayTypeValue,
        performerShare: performerShareValue,
        performerFixedSum: performerFixedSumValue
    }
    return performer;
}

function sendCreateContract(caseTemplateIdValue, 
    depositValue, paymentValue,
    customerValue, performerValue) {
    var xhr = new XMLHttpRequest();
    var baseUrl = 'http://localhost:8081/v1/create'
    var contract = {
        caseTemplateId: caseTemplateIdValue,
        deposit: depositValue,
        payment: paymentValue,
        customer: customerValue,
        performer: performerValue
    }
    console.log(contract);
    sendRequest(contract, baseUrl);
}

function sendRequest(value, endpoint) {
    console.log("in sendRequest");
    $.ajax({
        url: endpoint,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(value),
        contentType: "application/json",
        async: true,
        crossDomain: true,
        success: function (response) {
            console.log(response);
            console.log("contract sended");
        }
    })
}

$(document).ready(() => {
    createContract();
});