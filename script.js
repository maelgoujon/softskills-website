

document.addEventListener('DOMContentLoaded', () => {

    const initCharts = () => {
        const automationCtx = document.getElementById('automationChart').getContext('2d');
        // Données réelles et prévisionnelles
        const years = [2018, 2022, 2025, 2030];
        // Données réelles
        const humanReal = [71, 58, 48];
        const autoReal = [29, 42, 52];
        // Calcul du coefficient directeur (slope) par régression linéaire sur 3 points
        function linearRegressionSlope(xs, ys) {
            const n = xs.length;
            const meanX = xs.reduce((a, b) => a + b, 0) / n;
            const meanY = ys.reduce((a, b) => a + b, 0) / n;
            let num = 0, den = 0;
            for (let i = 0; i < n; i++) {
                num += (xs[i] - meanX) * (ys[i] - meanY);
                den += (xs[i] - meanX) ** 2;
            }
            return num / den;
        }

        const xVals = [2018, 2022, 2025];
        const humanSlope = linearRegressionSlope(xVals, humanReal);
        const autoSlope = linearRegressionSlope(xVals, autoReal);
        // Intercept pour 2025
        const humanIntercept = humanReal[2] - humanSlope * 2025;
        const autoIntercept = autoReal[2] - autoSlope * 2025;
        // Projection 2030
        const human2030 = Math.round(humanSlope * 2030 + humanIntercept);
        const auto2030 = Math.round(autoSlope * 2030 + autoIntercept);
        const humanData = [...humanReal, human2030];
        const autoData = [...autoReal, auto2030];

        // Pour chaque dataset, on sépare la partie réelle (2020-2025) et la projection (2025-2035)
        function buildSegmentStyles(data, color) {
            // 0:2018, 1:2022, 2:2025, 3:2030
            return {
                borderColor: color,
                backgroundColor: color.replace('1)', '0.1)'),
                fill: false,
                tension: 0.3,
                pointRadius: 5,
                pointBackgroundColor: color,
                segment: {
                    borderDash: ctx => {
                        // Plein pour les segments réels (2018-2022, 2022-2025), pointillé pour la projection (2025-2030)
                        return ctx.p0DataIndex < 2 ? [] : [8, 6];
                    }
                }
            };
        }

        new Chart(automationCtx, {
            type: 'line',
            data: {
                labels: years.map(y => y === 2030 ? '2030 (Projection)' : y.toString()),
                datasets: [
                    {
                        label: 'Tâches Humaines',
                        data: humanData,
                        ...buildSegmentStyles(humanData, 'rgba(79, 70, 229, 1)')
                    },
                    {
                        label: 'Tâches Automatisées',
                        data: autoData,
                        ...buildSegmentStyles(autoData, 'rgba(199, 210, 254, 1)')
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        },
                        title: {
                            display: true,
                            text: 'Pourcentage des tâches (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Année'
                        }
                    }
                },
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });

        const recruiterCtx = document.getElementById('recruiterChart').getContext('2d');
        new Chart(recruiterCtx, {
            type: 'doughnut',
            data: {
                labels: ['Soft Skills (Aussi/Plus Importantes)', 'Hard Skills (Seules)'],
                datasets: [{
                    data: [50, 50],
                    backgroundColor: ['rgba(79, 70, 229, 0.7)', 'rgba(199, 210, 254, 0.7)'],
                    borderColor: ['#FFFFFF', '#FFFFFF'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12 } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    };
    
    const initTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.target;
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                tabContents.forEach(content => {
                    if (content.id === targetId) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });
        });
    };

    const initAccordions = () => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            header.parentElement.addEventListener('click', () => {
                content.classList.toggle('hidden');
            });
        });
    };

    const initStepper = () => {
        const stepButtons = document.querySelectorAll('.step-btn');
        const stepContents = document.querySelectorAll('.step-content');

        stepButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetStep = button.dataset.step;

                stepButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                stepContents.forEach(content => {
                    if (content.id === `step-${targetStep}`) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });
        });
    };

    const initMobileMenu = () => {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = mobileMenu.querySelectorAll('a');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    };

    initCharts();
    initTabs();
    initAccordions();
    initStepper();
    initMobileMenu();
});
