<template>
  <div class="card border-0">
    <!-- HEADER -->
    <div class="card-header border-0">
      <h3 class="card-title">
        សកម្មភាពអ្នកប្រើប្រាស់ប្រចាំសប្តាហ៍
      </h3>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <span>កំពុងផ្ទុក...</span>
    </div>

    <!-- CHART -->
    <div v-else class="card-body">
      <div class="chart-wrapper">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

import api from '@/api/api'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
)

const chartRef = ref(null)
const loading  = ref(true)

let chartInstance = null

async function fetchAndBuild() {
  try {
    loading.value = true

    const res = await api.get(
      '/users?_page=1&_per_page=10&search&sortBy=id&sortDir=asc'
    )

    const users = res.data.data.items || []

    // Group users by day
    const grouped = {}

    users.forEach(user => {
      const rawDate = user.registeredAt
      if (!rawDate) return

      const date = new Date(rawDate)
      if (isNaN(date.getTime())) return

      const key = date.toISOString().split('T')[0]
      grouped[key] = (grouped[key] || 0) + 1
    })

    const labels = Object.keys(grouped).map(date =>
      new Date(date).toLocaleDateString('km-KH', { weekday: 'short' })
    )

    const activeUsers = Object.values(grouped)

    loading.value = false

    await new Promise(resolve => setTimeout(resolve, 100))

    if (!chartRef.value) return

    if (chartInstance) {
      chartInstance.destroy()
    }

    chartInstance = new Chart(chartRef.value, {
      type: 'line',

      data: {
        labels,
        datasets: [
          {
            label: 'អ្នកប្រើសកម្ម',
            data: activeUsers,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.12)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#2563eb',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
          intersect: false,
          mode: 'index'
        },

        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                family: "'Kantumruy Pro', 'Khmer OS', sans-serif"
              }
            }
          },

          tooltip: {
            backgroundColor: '#111827',
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}`
            }
          }
        },

        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#6b7280' }
          },

          y: {
            beginAtZero: true,
            grid: { color: '#f3f4f6' },
            ticks: { color: '#6b7280', precision: 0 }
          }
        }
      }
    })
  } catch (err) {
    console.error('User chart error:', err)
    loading.value = false
  }
}

onMounted(() => {
  fetchAndBuild()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border-radius: 18px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

/* ── HEADER ── */
.card-header {
  padding: 0 0 1rem 0;
  flex-shrink: 0;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif !important;
}

/* ── BODY ── */
.card-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* ── CHART ── */
.chart-wrapper {
  position: relative;
  width: 100%;
  height: clamp(200px, 35vw, 320px);
}

/* ── LOADING ── */
.loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 14px;
  min-height: 200px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-primary);
  border-top-color: #2563eb;
  border-radius: 999px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .card {
    padding: 1rem 1.25rem;
  }

  .card-title {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 1rem;
    border-radius: 14px;
  }

  .card-title {
    font-size: 15px;
  }
}
</style>