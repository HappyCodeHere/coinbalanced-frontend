$(document).ready(() => {

  $.getJSON("http://localhost:8081/v1/contracts", function (data) {
    var items = [];
    $.each(data, function (key, val) {
      var html = `
      <tr>
        <td>` + val.contractAddress + `</td>
        <td>` + val.id + `</td>
        <td>` + val.performer.performerName + `</td>
        <td>Отправлен</td>
        <td><a href="/contract.html">Редактировать</a></td>
      </tr>
      `;
      $('tbody').append(html);
    });
  });
});
