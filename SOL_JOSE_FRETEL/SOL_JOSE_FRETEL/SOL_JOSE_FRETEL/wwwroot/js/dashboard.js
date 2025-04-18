export function initializeDashboard() {
    let ventasChart = null;
    let unidadesChart = null;
    let clientesChart = null;
    let productosChart = null;
    let tendenciasChart = null;
    let metasChart = null;

    const dashboardData = [
        {
            title: "Ventas totales",
            icon: "currency-dollar",
            color: "primary",
            content: '<div class="chart-container" style="height: 300px"><canvas id="ventasChart"></canvas></div>',
            trend: "12% vs mes anterior",
            value: "S/. 152,430"
        },
        {
            title: "Unidades vendidas",
            icon: "box-seam",
            color: "success",
            content: '<div class="chart-container" style="height: 250px"><canvas id="unidadesChart"></canvas></div>',
            trend: "320 unidades/día",
            value: "4,850"
        },
        {
            title: "Clientes activos",
            icon: "people",
            color: "info",
            content: '<div class="chart-container" style="height: 250px"><canvas id="clientesChart"></canvas></div>',
            value: "1,240"
        },
        {
            title: "Productos populares",
            icon: "star",
            color: "warning",
            content: '<div class="chart-container" style="height: 350px"><canvas id="productosChart"></canvas></div>'
        },
        {
            title: "Tendencias de ventas",
            icon: "bar-chart",
            color: "danger",
            content: '<div class="chart-container" style="height: 300px"><canvas id="tendenciasChart"></canvas></div>'
        },
        {
            title: "Metas de Ventas",
            icon: "trophy",
            color: "secondary",
            content: '<div class="chart-container" style="height: 280px"><canvas id="metasChart"></canvas></div>'
        }
    ];

    const chartOptions = (prefix = '') => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#6c757d' }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (context.parsed.y !== undefined) {
                            label += `: ${prefix}${context.parsed.y}`;
                        }
                        return label;
                    }
                }
            }
        }
    });

    function initCharts() {
        [ventasChart, unidadesChart, clientesChart, productosChart, tendenciasChart, metasChart].forEach(chart => {
            if (chart) chart.destroy();
        });

        ventasChart = new Chart(document.getElementById('ventasChart'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Ventas Mensuales',
                    data: [120000, 145000, 132000, 158000, 149000, 162000],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    tension: 0.4
                }]
            },
            options: chartOptions('S/.')
        });

        unidadesChart = new Chart(document.getElementById('unidadesChart'), {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Unidades',
                    data: [4500, 3200, 4800, 5100, 4200, 6000],
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 1
                }]
            },
            options: chartOptions()
        });

        clientesChart = new Chart(document.getElementById('clientesChart'), {
            type: 'doughnut',
            data: {
                labels: ['Nuevos', 'Recurrentes'],
                datasets: [{
                    data: [85, 1155],
                    backgroundColor: ['#0dcaf0', '#ffc107']
                }]
            },
            options: {
                ...chartOptions(),
                plugins: {
                    tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw} clientes` } }
                }
            }
        });

        productosChart = new Chart(document.getElementById('productosChart'), {
            type: 'bar',
            data: {
                labels: ['Smartphone X10', 'Laptop Pro', 'Tablet Lite', 'Smartwatch', 'Auriculares'],
                datasets: [{
                    label: 'Unidades Vendidas',
                    data: [1250, 980, 750, 620, 450],
                    backgroundColor: 'rgba(255, 193, 7, 0.6)'
                }]
            },
            options: {
                ...chartOptions(),
                indexAxis: 'y'
            }
        });

        tendenciasChart = new Chart(document.getElementById('tendenciasChart'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Tendencias',
                    data: [120000, 145000, 132000, 158000, 149000, 162000],
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    fill: true
                }]
            },
            options: chartOptions('S/.')
        });

        metasChart = new Chart(document.getElementById('metasChart'), {
            type: 'doughnut',
            data: {
                labels: ['Completado', 'Restante'],
                datasets: [{
                    data: [85, 15],
                    backgroundColor: ['#198754', '#e9ecef']
                }]
            },
            options: {
                ...chartOptions(),
                circumference: 180,
                rotation: -90,
                plugins: { legend: { display: false } }
            }
        });
    }

    const getUsername = () => {
        try {
            const userData = document.getElementById('userData');
            const email = userData?.dataset?.email || '';
            return email.split('@')[0].trim() || 'Usuario';
        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            return 'Usuario';
        }
    };

    const getCurrentDateString = () => {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const fecha = new Date();
        return `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
    };

    function createCardElement(section) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-header bg-${section.color} text-white">
                    <i class="bi bi-${section.icon}"></i> ${section.title}
                </div>
                <div class="card-body">
                    ${section.value ? `<h2 class="card-title">${section.value}</h2>` : ''}
                    ${section.trend ? `<p class="text-muted">${section.trend}</p>` : ''}
                    ${section.content}
                </div>
            </div>
        `;
        return card;
    }

    function renderDashboard() {
        const container = document.getElementById('dashboardContainer');
        container.innerHTML = '';

        document.getElementById('welcomeHeader').textContent = `Bienvenido, ${getUsername()}!`;
        document.getElementById('fechaResumen').textContent = `Resumen de ventas - ${getCurrentDateString()}`;

        dashboardData.forEach(section => {
            container.appendChild(createCardElement(section));
        });

        initCharts();
    }

    return {
        init: renderDashboard,
        refresh: () => {
            [ventasChart, unidadesChart, clientesChart, productosChart, tendenciasChart, metasChart].forEach(chart => {
                if (chart) chart.destroy();
            });
            renderDashboard();
        }
    };
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const dashboard = initializeDashboard();
        dashboard.init();
    });
}