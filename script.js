

document.addEventListener('DOMContentLoaded', () => {

    const initCharts = () => {
        const automationCtx = document.getElementById('automationChart').getContext('2d');
        new Chart(automationCtx, {
            type: 'bar',
            data: {
                labels: ['2020', '2025 (Projection)'],
                datasets: [
                    {
                        label: 'Tâches Humaines',
                        data: [71, 48],
                        backgroundColor: 'rgba(79, 70, 229, 0.7)',
                        borderColor: 'rgba(79, 70, 229, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Tâches Automatisées',
                        data: [29, 52],
                        backgroundColor: 'rgba(199, 210, 254, 0.7)',
                        borderColor: 'rgba(199, 210, 254, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: { stacked: true, ticks: { callback: value => value + '%' } },
                    y: { stacked: true }
                },
                plugins: {
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
