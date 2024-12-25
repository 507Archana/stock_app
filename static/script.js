// Fetch the list of index names
fetch('/api/indices')
    .then(response => response.json())
    .then(indices => {
        const indexListElement = document.getElementById('indexList');
        indices.forEach(index => {
            const button = document.createElement('button');
            button.classList.add('list-group-item', 'list-group-item-action');
            button.textContent = index;
            button.onclick = () => fetchData(index);
            indexListElement.appendChild(button);
        });
    })
    .catch(error => console.error('Error fetching indices:', error));

// Fetch data for the selected index
function fetchData(indexName) {
    fetch(`/api/data/${indexName}`)
        .then(response => response.json())
        .then(data => createChart(data, indexName))
        .catch(error => console.error('Error fetching data:', error));
}

// Create a chart using Chart.js
function createChart(data, indexName) {
    const labels = data.map(item => item.date);
    const values = data.map(item => item.value);

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${indexName} Data`,
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }]
        }
    });
}
