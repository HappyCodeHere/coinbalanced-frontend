
$(document).ready(() => {
  const $button = $('.togle-contract');
  const $contract = $('article');

  let prevState = 'как % от значения “Оплата на сумму”';
  renderPesentFields();

  updateContract();

  $('.btn-send').on('click', () => {
    // заказчик
    const zName = $('[name="z-name"]').val();
    const zReg = $('[name="z-reg"]').val();
    const zUnn = $('[name="z-unn"]').val();
    const zEth = $('[name="z-eth"]').val();

    // испольнитель
    const iName = $('[name="i-name"]').val();
    const iReg = $('[name="i-reg"]').val();
    const iUnn = $('[name="i-unn"]').val();
    const iEth = $('[name="i-eth"]').val();

    // селекты
    const rewardsPay = $('[name="rewards-pay"]').val();
    const amountRewards = $('[name="amount-rewards"]').val();

    const depositSum = $('.if-deposit input').val();
    const performerPersent = $('.reward-persent input').val();
    const performerFixed = $('.reward-deposit input').val();

    var payment = createPaymentObject(rewardsPay, null);
    var deposit = createDepositObject(false, null);
    var customer = createCustomerObject(false, zName, zReg, zUnn, zEth, null);
    var performer = createPerformerObject(true, iName, iReg, iUnn, iEth, amountRewards, performerPersent, performerFixed);
    sendCreateContract(1, deposit, payment, customer, performer);

    window.location.href = '/dashboard.html';
  });

  $button.on('click', () => {
    if ($contract.css('display') === 'block') {
      $button.text('Show contract');
      $contract.css('display', 'none');
    } else {
      $button.text('Hide contract');
      $contract.css('display', 'block');
    }
  });



  window.addEventListener('input', (event) => {
    if(event.target.tagName === 'INPUT') {
      updateContract();
    }
  })

  window.addEventListener('change', (event) => {
    if(event.target.tagName === 'SELECT') {
      updateContract();
    }
  })


  function updateContract() {
    const zName = $('[name="z-name"]').val();
    const zReg = $('[name="z-reg"]').val();
    const zUnn = $('[name="z-unn"]').val();
    const zEth = $('[name="z-eth"]').val();

    const iName = $('[name="i-name"]').val();
    const iReg = $('[name="i-reg"]').val();
    const iUnn = $('[name="i-unn"]').val();
    const iEth = $('[name="i-eth"]').val();



    iName ? $('.i-name-o').text(''+ iName + ',') : $('.i-name-o').text(iName);
    iReg ? $('.i-reg-o').text('регистрационнный номер: ' + iReg + ',') : $('.i-reg-o').text(iReg);
    iUnn ? $('.i-unn-o').text('УНН: '+ iUnn + ',') : $('.i-unn-o').text(iUnn);
    iEth ? $('.i-eth-o').text('Ethereum-адрес: '+ iEth) : $('.i-eth-o').text(iEth);

    zName ? $('.z-name-o').text(''+ zName + ',') : $('.z-name-o').text(zName);
    zReg ? $('.z-reg-o').text('регистрационнный номер: ' + zReg + ',') : $('.z-reg-o').text(zReg);
    zUnn ? $('.z-unn-o').text('УНН: '+ zUnn + ',') : $('.z-unn-o').text(zUnn);
    zEth ? $('.z-eth-o').text('Ethereum-адрес: '+ zEth) : $('.z-eth-o').text(zEth);

    // $('.z-name-o').text(zName);
    // $('.z-reg-o').text(zReg);
    // $('.z-unn-o').text(zUnn);
    // $('.z-eth-o').text(zEth);

    const rewardsPay = $('[name="rewards-pay"] option:selected').text();
    const amountRewards = $('[name="amount-rewards"] option:selected').text();

    // console.log(amountRewards)

    if (amountRewards === 'как % от значения “Оплата на сумму”')  {
      if (prevState !== amountRewards) {
        renderPesentFields();
      }

      handleIfPersent();
      prevState = amountRewards;
    } else {
      // renderPesentFields();
      // handleIfPersent();
      if (prevState !== amountRewards) {
        renderDepositField();
      }
      handleIfDeposit();
      prevState = amountRewards;
    }

    const deposit = $('.if-deposit input').val();

    const persent = $('.reward-persent input').val();

    const rDeposit = $('.reward-deposit input').val();

    $('.rewards-pay').text(amountRewards);
    // const iEth = ;
    $('.amount-rewards').text(rewardsPay);

    $('.contract-action').text($('[name="contract-action"]').val());

    if ($('[name="contract-action"]').val() === 'после внесения Депозита') {

      // дичь
      if (!$('.add-deposit').html() || $('.add-deposit').html() && $('.add-deposit').html() .length < 1) {
        renderAddDeposit();
      }
    } else {
      $('.add-deposit').html('');
    }

    function renderAddDeposit() {
      const text = `
      <div class="add-deposit">
        <div class="form-group">
          <label>Сумма депозита, ETH</label>
          <input type="text" class="form-control">
        </div>
      </div>
      `;

      $('.if-deposit').html(text);
    }






    function renderDepositField() {
      const text = `
      <div class="reward-deposit">
        <div class="form-group">
          <label>Вознаграждение исполнителю, ETH</label>
          <input type="text" class="form-control">
        </div>
      </div>
      `

      $('.pay-type').html(text);
    }




    function handleIfPersent() {
      let rewardPersent = $('.reward-persent input').val();
      if (+rewardPersent > 99) {
        $('.reward-persent input').val('99')
        rewardPersent = 99;
      }

      // if (+rewardPersent > 1) {
      //   $('.reward-persent .z-share').text(rewardPersent - 1);
      // }

      if (!rewardPersent) {
        $('.reward-persent .z-share').text('');
      }
    }

    function handleIfDeposit() {
      console.log($('.reward-deposit input').val());
    }



  }

  function renderPesentFields() {
    const text = `
    <div class="reward-persent">
      <div class="form-group">
        <label>Вознаграждение исполнителю, %</label>
        <input type="text" class="form-control">
      </div>
    </div>
    `

    // <p>Заказчик: <span class="z-share"></span></p>
    //  <p>Платформа: <span>1%</span></p>

    $('.pay-type').html(text);
  }

  $("html, body").animate({
            scrollTop: 0
        }, 600);

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
});
