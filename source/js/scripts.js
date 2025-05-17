// Chart Line
async function renderLineChart() {
    try {
        let response = await fetch('api/history.php');
        let data = await response.json();

        let timestamps = data.map(item => moment.utc(item.timestamp).tz('Asia/Jakarta').format('HH:mm:ss'));
        let suhu = data.map(item => parseFloat(item.suhu));
        let kelembaban = data.map(item => parseFloat(item.kelembaban));

        let ctxSuhu = document.getElementById('suhuChart').getContext('2d');
        let ctxKelembaban = document.getElementById('kelembabanChart').getContext('2d');

        let chartConfig = (ctx, label, data, color) => new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [{
                    label,
                    data,
                    borderColor: color,
                    backgroundColor: color + '40',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'category',
                        ticks: {
                            font: {
                                size: 12
                            },
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });

        chartConfig(ctxSuhu, 'Suhu (°C)', suhu, '#e76f51');
        chartConfig(ctxKelembaban, 'Kelembaban (%)', kelembaban, '#2a9d8f');

    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}
renderLineChart(); 

async function updateLineChart() {
    try {
        let response = await fetch('api/history.php');
        let data = await response.json();

        let timestamps = data.map(item => moment(item.timestamp).format('HH:mm:ss'));
        let suhu = data.map(item => parseFloat(item.suhu));
        let kelembaban = data.map(item => parseFloat(item.kelembaban));

        const chartSuhu = Chart.getChart('suhuChart');
        const chartKelembaban = Chart.getChart('kelembabanChart');

        if (chartSuhu) {
            chartSuhu.data.labels = timestamps;
            chartSuhu.data.datasets[0].data = suhu;
            chartSuhu.update();
        }

        if (chartKelembaban) {
            chartKelembaban.data.labels = timestamps;
            chartKelembaban.data.datasets[0].data = kelembaban;
            chartKelembaban.update();
        }

    } catch (error) {
        console.error('Gagal memperbarui grafik:', error);
    }
}

setInterval(updateLineChart, 5000); // Update every 5 seconds

// Chart Pie 
function renderPieChart(suhu, kelembaban) {
    let ctxPieSuhu = document.getElementById('pieSuhu').getContext('2d');
    let ctxPieKelembaban = document.getElementById('pieKelembaban').getContext('2d');

    new Chart(ctxPieSuhu, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [suhu, 100 - suhu],
                backgroundColor: ['#e76f51', '#ddd'],
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    new Chart(ctxPieKelembaban, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [kelembaban, 100 - kelembaban],
                backgroundColor: ['#2a9d8f', '#ddd'],
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
renderPieChart(0, 0); 

function updatePieChart(suhu, kelembaban) {
    const pieChartSuhu = Chart.getChart('pieSuhu');
    const pieChartKelembaban = Chart.getChart('pieKelembaban');

    if (pieChartSuhu) {
        pieChartSuhu.data.datasets[0].data = [suhu, 100 - suhu];
        pieChartSuhu.update();
    }

    if (pieChartKelembaban) {
        pieChartKelembaban.data.datasets[0].data = [kelembaban, 100 - kelembaban];
        pieChartKelembaban.update();
    }
}

//Update the sensor data every 5000 milliseconds
function updateSensorData() {
    fetch('api/read.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('suhu').innerHTML = `${data.suhu}`;
            document.getElementById('kelembaban').innerHTML = `${data.kelembaban}`;
            document.getElementById('timestamp').textContent = data.waktu;

            // Update Pie Chart with new data
            updatePieChart(data.suhu, data.kelembaban);

        })
        .catch(error => console.error('Error fetching data:', error));
}

updateSensorData();
setInterval(updateSensorData, 5000);
