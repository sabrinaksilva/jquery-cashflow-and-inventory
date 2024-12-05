$(document).ready(function() {
    // Carrega um arquivo HTML externo (transactions-table.html)
    // dentro do elemento com o ID transactions-placeholder (index.html)
    $('#transactions-placeholder').load('transactions-table.html', function() {
        $.getScript('js/api-adapter/get_transactions.js', function() {
            const transactions = window.get_transactions();
            const transactionsOut = transactions.filter(transaction => transaction.type === 'OUT');
            
            const tableBody = $('.table-transactions-to-pay tbody');
            
            tableBody.empty();
            let totalToPay = 0;
            transactionsOut.forEach(transaction => {
                const row = `<tr>
                    <th scope="row">${transaction.date}</th>
                    <td>${transaction.source}</td>
                    <td>$${transaction.value.toFixed(2)}</td>
                </tr>`;
                tableBody.append(row);
                totalToPay += transaction.value;
            });
            
            $('.table-transactions-to-pay-footer td h2').text(`$ ${totalToPay.toFixed(2)}`);
        });
    });
});
