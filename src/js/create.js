$(document).ready(() => {
  const $button = $('.togle-contract');
  const $contract = $('article');

  $button.on('click', () => {
    if ($contract.css('display') === 'block') {
      $button.text('Show contract');
      $contract.css('display', 'none');
    } else {
      $button.text('Hide contract');
      $contract.css('display', 'block');
    }
  });



  const updateContract = () => {
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
  }

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

});
