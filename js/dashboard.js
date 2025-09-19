/**
 * MyCareGorithm Sprint Analytics Dashboard
 * Optimized JavaScript for GitHub Pages
 */

// Chart.js Configuration
const CHART_CONFIG = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: { color: 'rgba(255, 255, 255, 0.8)' }
        }
    }
};

// Color Schemes
const COLOR_SCHEMES = {
    status: ['#00b894', '#f39c12', '#4834d4', '#95a5a6', '#27ae60', '#e74c3c', '#a29bfe'],
    risk: {
        High: '#e74c3c',
        Medium: '#f39c12',
        Low: '#27ae60'
    },
    team: ['#00d4ff', '#5b86e5', '#fd79a8', '#00cec9', '#fdcb6e', '#a29bfe', '#e17055', '#74b9ff']
};

// Utility Functions
const Utils = {
    showLoading() {
        document.getElementById('loadingState').classList.add('active');
        document.getElementById('placeholderContent').style.display = 'none';
        document.getElementById('sprintContent').style.display = 'none';
    },

    hideLoading() {
        document.getElementById('loadingState').classList.remove('active');
    },

    showPlaceholder() {
        document.getElementById('placeholderContent').style.display = 'block';
        document.getElementById('sprintContent').style.display = 'none';
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    formatLabel(label, maxLength = 18) {
        if (label.length > maxLength) {
            const words = label.split(' ');
            if (words.length > 2) {
                return words[0] + ' ' + words[1] + '...';
            }
            return label.substring(0, 15) + '...';
        }
        return label;
    }
};

// Chart Renderers
const ChartRenderer = {
    createStatusChart(ctx, data) {
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Done', 'In Progress', 'UAT', 'To Do', 'Quality Assurance', 'Blocked', 'Ready for Prod'],
                datasets: [{
                    data: data.statusDistribution,
                    backgroundColor: COLOR_SCHEMES.status,
                    borderWidth: 0,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                ...CHART_CONFIG,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: 'rgba(255, 255, 255, 0.8)', padding: 15, font: { size: 11 } }
                    }
                }
            }
        });
    },

    createStoryPointsChart(ctx, data) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Done', 'UAT', 'In Progress', 'To Do', 'Blocked', 'QA'],
                datasets: [{
                    label: 'Story Points',
                    data: data.storyPointsByStatus,
                    backgroundColor: COLOR_SCHEMES.status,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                ...CHART_CONFIG,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: 'rgba(255, 255, 255, 0.8)', stepSize: 5 },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: 'rgba(255, 255, 255, 0.8)' },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y} story points`;
                            }
                        }
                    }
                }
            }
        });
    },

    createDeveloperChart(ctx, teamData) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(teamData),
                datasets: [{
                    label: 'Story Points Completed',
                    data: Object.values(teamData).map(dev => dev.points),
                    backgroundColor: COLOR_SCHEMES.team,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                ...CHART_CONFIG,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Story Points', color: 'rgba(255, 255, 255, 0.8)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.8)', stepSize: 2 },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: 'rgba(255, 255, 255, 0.8)', maxRotation: 45 },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const dev = teamData[context.label];
                                return [`${dev.items} items`, `Themes: ${dev.themes.join(', ')}`];
                            }
                        }
                    }
                }
            }
        });
    },

    createEpicChart(ctx, data) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Roles & Security', 'Mobile Platform', 'DevOps', 'Architecture', 'Database', 'Admin', 'Bugs'],
                datasets: [{
                    label: 'Story Points',
                    data: data.epicProgress,
                    backgroundColor: ['#e74c3c', '#3498db', '#f39c12', '#9b59b6', '#27ae60', '#f39c12', '#e74c3c'],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                ...CHART_CONFIG,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Story Points', color: 'rgba(255, 255, 255, 0.8)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.8)', stepSize: 5 },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: 'rgba(255, 255, 255, 0.8)', maxRotation: 45 },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const completionRates = data.epicCompletionRates;
                                return `${completionRates[context.dataIndex]}% complete`;
                            }
                        }
                    }
                }
            }
        });
    },

    createForecastChart(ctx, data, config) {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Current', '+2 Days', '+4 Days', '+6 Days', 'Sprint End'],
                datasets: [{
                    label: 'Projected Completion',
                    data: data.forecastData,
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointBackgroundColor: '#00d4ff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                }, {
                    label: `Sprint Target (${config.totalStoryPoints} pts)`,
                    data: Array(5).fill(config.totalStoryPoints),
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false
                }]
            },
            options: {
                ...CHART_CONFIG,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: Math.max(config.totalStoryPoints * 1.2, 50),
                        title: { display: true, text: 'Story Points', color: 'rgba(255, 255, 255, 0.8)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.8)', stepSize: Math.ceil(config.totalStoryPoints / 10) },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: 'rgba(255, 255, 255, 0.8)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }
};

// Data Loader
const DataLoader = {
    async loadSprintData(sprintId) {
        try {
            // Try to load from JSON file first
            const response = await fetch(`./data/sprint-${sprintId}.json`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log('JSON file not found, using embedded data');
        }
        
        // Fallback to embedded data
        return window.EMBEDDED_SPRINT_DATA?.[sprintId] || null;
    }
};

// Dashboard Renderer
const DashboardRenderer = {
    renderValueCard(valueData, type) {
        const colors = {
            primary: '#e74c3c',
            strategic: '#3498db', 
            stability: '#f39c12',
            innovation: '#9b59b6'
        };

        let keyMetric = '';
        if (valueData.timeSavings) {
            keyMetric = `⏱️ ${valueData.timeSavings}`;
        } else if (valueData.marketExpansion) {
            keyMetric = `🌍 ${valueData.marketExpansion}`;
        } else if (valueData.efficiencyGain) {
            keyMetric = `📈 ${valueData.efficiencyGain}`;
        } else if (valueData.competitiveAdvantage) {
            keyMetric = `🏆 ${valueData.competitiveAdvantage}`;
        }

        return `
            <div style="background: rgba(255, 255, 255, 0.08); border-top: 4px solid ${colors[type]}; border-radius: 8px; padding: 20px;">
                <h4 style="margin-bottom: 8px; color: #ffffff;">${valueData.title}</h4>
                <div style="color: #00d4ff; font-weight: 600; margin-bottom: 10px;">${keyMetric} • ${valueData.storyPoints} Story Points</div>
                <div style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; margin-bottom: 10px;"><strong>Impact:</strong> ${valueData.impact}</div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
                    ${valueData.achievements.map(achievement => 
                        `<span style="background: rgba(255, 255, 255, 0.1); padding: 3px 8px; border-radius: 10px; font-size: 0.75rem;">${achievement}</span>`
                    ).join('')}
                </div>
                ${valueData.valuePlaceholder ? 
                    `<div style="background: rgba(255, 255, 255, 0.05); border: 1px dashed rgba(255, 255, 255, 0.3); border-radius: 6px; padding: 10px; font-size: 0.8rem; color: rgba(255, 255, 255, 0.6);">
                        💡 <strong>Value Tracking Opportunity:</strong> ${valueData.valuePlaceholder}
                    </div>` : ''
                }
            </div>
        `;
    },

    renderTeamPerformance(teamData) {
        return Object.entries(teamData).map(([name, data]) => `
            <div style="background: rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <strong style="color: #ffffff;">${name}</strong>
                    <span style="color: #00d4ff; font-weight: 600;">${data.points} pts</span>
                </div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.85rem; margin-bottom: 5px;">${data.items} items completed</div>
                <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">${data.themes.join(', ')}</div>
            </div>
        `).join('');
    },

    async renderSprintDashboard(sprintId) {
        Utils.showLoading();
        
        const sprintData = await DataLoader.loadSprintData(sprintId);
        if (!sprintData) {
            Utils.showNotification(`Sprint ${sprintId} data not found`, 'warning');
            Utils.showPlaceholder();
            Utils.hideLoading();
            return;
        }

        const content = document.getElementById('sprintContent');
        
        content.innerHTML = `
            <!-- Sprint Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 2rem; margin-bottom: 10px; color: #00d4ff;">${sprintData.config.name} Analytics</h2>
                <div style="color: rgba(255, 255, 255, 0.8);">${sprintData.config.startDate} to ${sprintData.config.endDate}</div>
            </div>

            <!-- Key Metrics Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div class="metric-card">
                    <div style="font-size: 2.2rem; font-weight: 200; color: #00d4ff; margin-bottom: 5px;">${sprintData.metrics.totalStoryPoints}</div>
                    <div style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">Total Story Points</div>
                </div>
                <div class="metric-card">
                    <div style="font-size: 2.2rem; font-weight: 200; color: #00b894; margin-bottom: 5px;">${sprintData.metrics.velocity}</div>
                    <div style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">Velocity (Completed)</div>
                </div>
                <div class="metric-card">
                    <div style="font-size: 2.2rem; font-weight: 200; color: #f39c12; margin-bottom: 5px;">${sprintData.metrics.completionRate}%</div>
                    <div style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">Completion Rate</div>
                </div>
                <div class="metric-card">
                    <div style="font-size: 2.2rem; font-weight: 200; color: #a29bfe; margin-bottom: 5px;">${sprintData.metrics.successProbability}%</div>
                    <div style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">Success Probability</div>
                </div>
            </div>

            <!-- Executive Value Summary -->
            <div style="margin-bottom: 30px;">
                <h3 style="text-align: center; margin-bottom: 25px; color: #ffffff; font-size: 1.5rem;">Executive Value Summary</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    ${this.renderValueCard(sprintData.executiveSummary.securityCompliance || sprintData.executiveSummary.clinicalWorkflow, 'primary')}
                    ${this.renderValueCard(sprintData.executiveSummary.marketExpansion || sprintData.executiveSummary.mobilePlatform, 'strategic')}
                    ${this.renderValueCard(sprintData.executiveSummary.operationalExcellence || sprintData.executiveSummary.platformStability, 'stability')}
                    ${this.renderValueCard(sprintData.executiveSummary.technicalModernization || sprintData.executiveSummary.innovation, 'innovation')}
                </div>
            </div>

            <!-- Charts Section -->
            <div style="margin-bottom: 30px;">
                <h3 style="text-align: center; margin-bottom: 25px; color: #ffffff; font-size: 1.5rem;">Analytics & Performance Charts</h3>
                
                <!-- Main Charts Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-bottom: 25px;">
                    <div class="chart-container">
                        <div class="chart-title">Sprint Status Distribution</div>
                        <canvas id="statusChart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-title">Story Points by Status</div>
                        <canvas id="storyPointsChart"></canvas>
                    </div>
                </div>

                <!-- Secondary Charts Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-bottom: 25px;">
                    <div class="chart-container">
                        <div class="chart-title">Developer Velocity Distribution</div>
                        <canvas id="developerChart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-title">Epic Progress & Impact</div>
                        <canvas id="epicChart"></canvas>
                    </div>
                </div>

                <!-- Velocity Analytics -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-bottom: 25px;">
                    <div class="chart-container">
                        <div class="chart-title">Sprint Completion Forecast</div>
                        <canvas id="forecastChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Team Performance Summary -->
            <div style="margin-bottom: 30px;">
                <h3 style="text-align: center; margin-bottom: 25px; color: #ffffff; font-size: 1.5rem;">Team Performance</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                    ${this.renderTeamPerformance(sprintData.teamPerformance)}
                </div>
            </div>

            <!-- Action Items -->
            <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px;">
                <h4 style="margin-bottom: 15px; color: #00d4ff;">Key Insights & Recommendations</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                    <div style="background: rgba(231, 76, 60, 0.1); border-left: 3px solid #e74c3c; padding: 15px; border-radius: 0 6px 6px 0;">
                        <strong>[P1] Critical Blockers:</strong> ${sprintData.insights.criticalBlockers}
                    </div>
                    <div style="background: rgba(243, 156, 18, 0.1); border-left: 3px solid #f39c12; padding: 15px; border-radius: 0 6px 6px 0;">
                        <strong>[P2] Velocity Gap:</strong> ${sprintData.insights.velocityGap}
                    </div>
                    <div style="background: rgba(0, 212, 255, 0.1); border-left: 3px solid #00d4ff; padding: 15px; border-radius: 0 6px 6px 0;">
                        <strong>[P1] Success Probability:</strong> ${sprintData.insights.successProbability}
                    </div>
                    <div style="background: rgba(0, 184, 148, 0.1); border-left: 3px solid #00b894; padding: 15px; border-radius: 0 6px 6px 0;">
                        <strong>Value Tracking:</strong> ${sprintData.insights.valueTracking}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('placeholderContent').style.display = 'none';
        content.style.display = 'block';
        
        // Render charts after DOM is updated
        setTimeout(() => {
            this.renderSprintCharts(sprintData);
        }, 100);

        Utils.hideLoading();
    },

    renderSprintCharts(sprintData) {
        // Status Distribution Chart
        const statusCtx = document.getElementById('statusChart');
        if (statusCtx) {
            ChartRenderer.createStatusChart(statusCtx, sprintData.chartData);
        }

        // Story Points by Status Chart
        const storyPointsCtx = document.getElementById('storyPointsChart');
        if (storyPointsCtx) {
            ChartRenderer.createStoryPointsChart(storyPointsCtx, sprintData.chartData);
        }

        // Developer Velocity Chart
        const developerCtx = document.getElementById('developerChart');
        if (developerCtx) {
            ChartRenderer.createDeveloperChart(developerCtx, sprintData.teamPerformance);
        }

        // Epic Progress Chart
        const epicCtx = document.getElementById('epicChart');
        if (epicCtx) {
            ChartRenderer.createEpicChart(epicCtx, sprintData.chartData);
        }

        // Sprint Completion Forecast Chart
        const forecastCtx = document.getElementById('forecastChart');
        if (forecastCtx) {
            ChartRenderer.createForecastChart(forecastCtx, sprintData.chartData, sprintData.config);
        }
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Auto-load Sprint 25Q309-S2 on page load
    document.getElementById('sprintSelector').value = '25Q309-S2';
    DashboardRenderer.renderSprintDashboard('25Q309-S2');

    document.getElementById('loadSprintBtn').addEventListener('click', function() {
        const selectedSprint = document.getElementById('sprintSelector').value;
        if (selectedSprint !== 'current') {
            DashboardRenderer.renderSprintDashboard(selectedSprint);
        }
    });

    document.getElementById('refreshDataBtn').addEventListener('click', function() {
        location.reload();
    });

    // Auto-load when dropdown changes
    document.getElementById('sprintSelector').addEventListener('change', function() {
        if (this.value !== 'current') {
            DashboardRenderer.renderSprintDashboard(this.value);
        }
    });
});
