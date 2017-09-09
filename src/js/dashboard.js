$(document).ready(() => {

    const html = `
      <tr>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
        <td><a href="/id">open</a></td>
      </tr>
    `;

    for (var i = 0; i < 6; i++) {
        $('tbody').append(html);
    }
});
