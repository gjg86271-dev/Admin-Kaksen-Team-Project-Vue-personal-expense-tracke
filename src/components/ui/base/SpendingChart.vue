<template>
  <div class="spend-card">

    <!-- HEADER -->
    <div class="spend-card__header">
    </div>

    <!-- LOADING -->
    <div v-if="categoryStore.loading" class="spend-card__loading">
      <span class="spinner"></span>
      <span>កំពុងផ្ទុក...</span>
    </div>

    <div v-else class="spend-card__body">

      <!-- CHARTS ROW -->
      <div class="charts-row">

        <!-- INCOME CHART -->
        <div class="chart-box">
          <div class="chart-box__header">
            <span class="chart-box__icon chart-box__icon--income">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </span>

            <h5 class="chart-box__title chart-box__title--income">
              ចំណូល
            </h5>
          </div>

          <div v-if="incomeChartData.length === 0" class="chart-empty">
            <p>មិនមានទិន្នន័យ</p>
          </div>

          <div v-else class="chart-content">

            <div class="chart-donut-wrap">
              <canvas ref="incomeRef"></canvas>

              <div class="chart-center">
                <span class="chart-center__count">
                  {{ incomeChartData.length }}
                </span>

                <span class="chart-center__label">
                  ប្រភេទ
                </span>
              </div>
            </div>

            <div class="legend">
              <div
                v-for="(item, index) in incomeChartData"
                :key="'inc-' + item.label"
                class="legend-item"
              >
                <span
                  class="legend-dot"
                  :style="{
                    background:
                      incomeColors[index % incomeColors.length]
                  }"
                ></span>

                <span class="legend-label">
                  {{ item.label }}
                </span>

                <span
                  v-if="item.isSystem"
                  class="legend-badge"
                >
                  System
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- EXPENSE CHART -->
        <div class="chart-box">

          <div class="chart-box__header">
            <span class="chart-box__icon chart-box__icon--expense">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </svg>
            </span>

            <h5 class="chart-box__title chart-box__title--expense">
              ចំណាយ
            </h5>
          </div>

          <div v-if="expenseChartData.length === 0" class="chart-empty">
            <p>មិនមានទិន្នន័យ</p>
          </div>

          <div v-else class="chart-content">

            <div class="chart-donut-wrap">
              <canvas ref="expenseRef"></canvas>

              <div class="chart-center">
                <span class="chart-center__count">
                  {{ expenseChartData.length }}
                </span>

                <span class="chart-center__label">
                  ប្រភេទ
                </span>
              </div>
            </div>

            <div class="legend">
              <div
                v-for="(item, index) in expenseChartData"
                :key="'exp-' + item.label"
                class="legend-item"
              >
                <span
                  class="legend-dot"
                  :style="{
                    background:
                      expenseColors[index % expenseColors.length]
                  }"
                ></span>

                <span class="legend-label">
                  {{ item.label }}
                </span>

                <span
                  v-if="item.isSystem"
                  class="legend-badge"
                >
                  System
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  nextTick,
  watch,
  onBeforeUnmount
} from 'vue'

import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

import { useCategoryStore } from '@/stores/categoryStore'

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
)

const categoryStore = useCategoryStore()

const incomeRef = ref(null)
const expenseRef = ref(null)

let incomeChart = null
let expenseChart = null

// 🎨 Colors
const incomeColors = [
  '#1D9E75',
  '#5DCAA5',
  '#9FE1CB',
  '#0F6E56',
  '#3B6D11',
  '#639922',
  '#97C459',
  '#C0DD97'
]

const expenseColors = [
  '#D85A30',
  '#F0997B',
  '#F5C4B3',
  '#993C1D',
  '#BA7517',
  '#EF9F27',
  '#FAC775',
  '#E24B4A'
]

// 🔥 Map categories → chart data
const incomeChartData = computed(() =>
  categoryStore.incomeCategories.map(c => ({
    label: c.name,
    value: 1,
    isSystem: c.isSystem ?? false,
  }))
)

const expenseChartData = computed(() =>
  categoryStore.expenseCategories.map(c => ({
    label: c.name,
    value: 1,
    isSystem: c.isSystem ?? false,
  }))
)

// 🔥 Destroy safely
function destroyCharts() {
  if (incomeChart) {
    incomeChart.destroy()
    incomeChart = null
  }

  if (expenseChart) {
    expenseChart.destroy()
    expenseChart = null
  }
}

// 🔥 Build chart
function buildChart(canvas, data, colors) {
  if (!canvas || !data.length) return null

  return new Chart(canvas, {
    type: 'doughnut',

    data: {
      labels: data.map(i => i.label),

      datasets: [
        {
          data: data.map(() => 1),

          backgroundColor: colors.slice(0, data.length),

          borderWidth: 3,
          borderColor: '#ffffff',

          hoverOffset: 8,
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      cutout: '68%',

      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}`
          }
        }
      }
    }
  })
}

async function renderCharts() {
  await nextTick()

  destroyCharts()

  if (
    incomeRef.value &&
    incomeChartData.value.length
  ) {
    incomeChart = buildChart(
      incomeRef.value,
      incomeChartData.value,
      incomeColors
    )
  }

  if (
    expenseRef.value &&
    expenseChartData.value.length
  ) {
    expenseChart = buildChart(
      expenseRef.value,
      expenseChartData.value,
      expenseColors
    )
  }
}

onMounted(async () => {
  await categoryStore.fetchAllCategories()
  await renderCharts()
})

watch(
  () => [
    categoryStore.incomeCategories,
    categoryStore.expenseCategories
  ],

  () => renderCharts(),

  { deep: true }
)

onBeforeUnmount(() => destroyCharts())
</script>

<style scoped>
/* CARD */
.spend-card {
  background: var(--bg-card);
  border-radius: 16px;

  overflow: hidden;
  width: 100%;
}

/* HEADER */
.spend-card__header {
  padding: 22px 24px 0;
}

.spend-card__title {
  font-size: 18px;
  font-weight: 600;

  color: var(--text-primary);

  margin: 0 0 20px;
}

/* BODY */
.spend-card__body {
  padding: 0 24px 24px;
}

/* LOADING */
.spend-card__loading {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  padding: 60px 24px;

  color: var(--text-secondary);

  font-size: 14px;
}

.spinner {
  width: 20px;
  height: 20px;

  border: 2px solid var(--border-primary);
  border-top-color: var(--color-primary);

  border-radius: 50%;

  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* CHARTS ROW */
.charts-row {
  display: flex;
  gap: 20px;

  align-items: stretch;
}

/* CHART BOX */
.chart-box {
  flex: 1 1 0;

  min-width: 0;

  background: var(--bg-card);

  border: 1px solid var(--border-primary);

  border-radius: 14px;

  padding: 20px;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;

  margin-bottom: 5px;
}

/* CHART HEADER */
.chart-box__header {
  display: flex;
  align-items: center;

  gap: 8px;

  margin-bottom: 18px;
}

.chart-box__icon {
  width: 30px;
  height: 30px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
}

.chart-box__icon--income {
  background: #7cf1d4;
  color: #0F6E56;
}

.chart-box__icon--expense {
  background: #f89a7a;
  color: #993C1D;
}

.chart-box__title {
  font-size: 14px;
  font-weight: 600;

  margin: 0;
}

.chart-box__title--income {
  color: #0F6E56;
}

.chart-box__title--expense {
  color: #993C1D;
}

/* CHART CONTENT */
.chart-content {
  display: flex;
  align-items: center;

  gap: 20px;

  flex: 1;
}

/* DONUT */
.chart-donut-wrap {
  position: relative;

  width: 160px;
  height: 160px;

  flex-shrink: 0;
}

.chart-donut-wrap canvas {
  width: 160px !important;
  height: 160px !important;
}

.chart-center {
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  pointer-events: none;
}

.chart-center__count {
  font-size: 26px;
  font-weight: 700;

  color: var(--text-primary);

  line-height: 1;
}

.chart-center__label {
  font-size: 11px;

  color: var(--text-secondary);

  margin-top: 4px;
}

/* LEGEND */
.legend {
  flex: 1;

  display: flex;
  flex-direction: column;

  gap: 9px;

  overflow-y: auto;
  overflow-x: hidden;

  min-width: 0;

  max-height: 180px;

  padding-right: 4px;
}

/* SCROLLBAR */
.legend::-webkit-scrollbar {
  width: 6px;
}

.legend::-webkit-scrollbar-track {
  background: transparent;
}

.legend::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 20px;
}

.legend::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* LEGEND ITEM */
.legend-item {
  display: flex;
  align-items: center;

  gap: 8px;

  font-size: 13px;

  min-width: 0;
}

.legend-dot {
  width: 10px;
  height: 10px;

  border-radius: 3px;

  flex-shrink: 0;
}

.legend-label {
  flex: 1;

  color: var(--text-primary);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-badge {
  font-size: 10px;

  background: var(--bg-card);

  color: var(--text-secondary);

  border-radius: 4px;

  padding: 2px 6px;

  flex-shrink: 0;
}

/* EMPTY */
.chart-empty {
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 1;

  min-height: 100px;

  color: var(--text-secondary);

  font-size: 13px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .chart-content {
    gap: 16px;
  }

  .chart-donut-wrap {
    width: 140px;
    height: 140px;
  }

  .chart-donut-wrap canvas {
    width: 140px !important;
    height: 140px !important;
  }

  .chart-center__count {
    font-size: 22px;
  }

  .legend {
    max-height: 160px;
  }
}

@media (max-width: 768px) {
  .spend-card__body {
    padding: 0 16px 16px;
  }

  .charts-row {
    flex-direction: column;
    gap: 16px;
  }

  .chart-box {
    width: 100%;
    padding: 16px;
  }

  .chart-content {
    flex-direction: column;
    align-items: center;
    text-align: center;

    gap: 18px;
  }

  .chart-donut-wrap {
    width: 150px;
    height: 150px;
  }

  .chart-donut-wrap canvas {
    width: 150px !important;
    height: 150px !important;
  }

  .legend {
    width: 100%;
    max-height: 170px;
    padding-right: 2px;
  }

  .legend-item {
    font-size: 12px;
  }

  .legend-label {
    text-align: left;
  }

  .chart-box__title {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .spend-card {
    border-radius: 12px;
  }

  .spend-card__header {
    padding: 16px 16px 0;
  }

  .spend-card__body {
    padding: 0 12px 12px;
  }

  .chart-box {
    padding: 14px;
    border-radius: 12px;
  }

  .chart-box__header {
    margin-bottom: 14px;
  }

  .chart-box__icon {
    width: 28px;
    height: 28px;
  }

  .chart-box__title {
    font-size: 12px;
  }

  .chart-donut-wrap {
    width: 130px;
    height: 130px;
  }

  .chart-donut-wrap canvas {
    width: 130px !important;
    height: 130px !important;
  }

  .chart-center__count {
    font-size: 20px;
  }

  .chart-center__label {
    font-size: 10px;
  }

  .legend {
    gap: 7px;
    max-height: 150px;
  }

  .legend-item {
    gap: 6px;
    font-size: 11px;
  }

  .legend-dot {
    width: 8px;
    height: 8px;
  }

  .legend-badge {
    font-size: 9px;
    padding: 2px 5px;
  }

  .chart-empty {
    min-height: 80px;
    font-size: 12px;
  }
}
</style>