const ctx = document.getElementById('Bandwidth').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Download',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'Upload',
            data: [55, 100, 200, 69, 10, 0, 40],
            fill: false,
            borderColor: 'rgb(75, 100, 192)',
            tension: 0.1
        },
        {
            label: 'Max',
            data: [500, 500, 500, 500, 500, 500, 500],
            fill: false,
            borderColor: 'rgb(70, 100, 150)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
