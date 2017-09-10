$(document).ready(() => {

  $.getJSON("http://localhost:8081/v1/contracts", function (data) {
    var items = [];
    $.each(data, function (key, val) {
      var html = `
      <tr>


        <td>` + val.contractAddress + `</td>
        <td>` + val.id + `</td>
        <td>` + val.performer.performerName + `</td>
        <td><span class="label label-success">Active</span></td>
        <td><a href="/contract.html">show contract</a></td>
      </tr>
      `;
      $('tbody').append(html);
    });
  });
});
