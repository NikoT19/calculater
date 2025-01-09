function calculateStakes() {
    const deposit = parseFloat(document.getElementById('deposit').value);
    const initialBet = parseFloat(document.getElementById('initialBet').value);
    const targetAmount = parseFloat(document.getElementById('targetAmount').value);
    const averageWins = parseInt(document.getElementById('averageWins').value);

    if (isNaN(deposit) || isNaN(initialBet) || isNaN(targetAmount) || isNaN(averageWins)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = ''; // Clear previous results
    let totalRisk = 0;
    let currentBet = initialBet;
    let totalRounds = 0;

    for (let i = 1; i <= 8; i++) {
        totalRisk += currentBet;
        if (totalRisk > deposit) {
            document.getElementById('maxRounds').textContent = 
                `You can only afford ${i - 1} rounds with your current deposit.`;
            break;
        }

        const row = document.createElement('tr');
        row.innerHTML = `<td>${i}</td><td>${currentBet.toFixed(2)}</td><td>${((totalRisk / deposit) * 100).toFixed(2)}%</td>`;
        tableBody.appendChild(row);

        currentBet *= 2; // Double the bet for the next round
        totalRounds = i;
    }

    document.getElementById('resultsTable').style.display = 'table';

    if (totalRisk <= deposit) {
        document.getElementById('maxRounds').textContent = 
            `You can afford all 8 rounds with your current deposit.`;
    }

    const requiredWins = Math.ceil((targetAmount - deposit) / initialBet);
    const daysRequired = Math.ceil(requiredWins / averageWins);
    document.getElementById('targetInfo').textContent = 
        `To reach your target, you need ${requiredWins} wins, which may take approximately ${daysRequired} days.`;

    document.getElementById('maxRounds').style.display = 'block';
    document.getElementById('targetInfo').style.display = 'block';
}
