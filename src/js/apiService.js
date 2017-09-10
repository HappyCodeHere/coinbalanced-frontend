
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
