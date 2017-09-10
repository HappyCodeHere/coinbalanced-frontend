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


    // новые поля
    const deposit = $('.if-deposit input').val();
    const persent = $('.reward-persent input').val();
    const rDeposit = $('.reward-deposit input').val();



    // console.log('deposit', deposit);
    // console.log('persent', persent);
    // console.log('rDeposit', rDeposit);
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




    $('.i-name-o').text(iName);
    $('.i-reg-o').text(iReg);
    $('.i-unn-o').text(iUnn);
    $('.i-eth-o').text(iEth);

    $('.z-name-o').text(zName);
    $('.z-reg-o').text(zReg);
    $('.z-unn-o').text(zUnn);
    $('.z-eth-o').text(zEth);

    const rewardsPay = $('[name="rewards-pay"]').val();
    const amountRewards = $('[name="amount-rewards"]').val();

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
    console.log('deposit', deposit);

    const persent = $('.reward-persent input').val();
    console.log(persent);

    const rDeposit = $('.reward-deposit input').val();
    console.log(rDeposit);

    $('.rewards-pay').text(amountRewards);
    // const iEth = ;
    $('.amount-rewards').text(rewardsPay);

    $('.contract-action').text($('[name="contract-action"]').val());

    if ($('[name="contract-action"]').val() === 'после внесения Депозита') {
      console.log('debug');

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

});
