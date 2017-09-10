$(document).ready(() => {

    const html = `
      <tr>
        <td>test</td>
        <td>test</td>
        <td>test</td>
        <td><span class="label label-success">test</span></td>
        <td><a href="/contract.html">show contract</a></td>
      </tr>
    `;

    for (var i = 0; i < 6; i++) {
        $('tbody').append(html);
    }
});
