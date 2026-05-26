<template>
  <div class="dashboard">

    <!-- PAGE LOADING SKELETON -->
    <template v-if="isLoading">
      <div class="skeleton skeleton-header mb-4"></div>

      <div class="top-cards">
        <div v-for="n in 2" :key="'card-' + n" class="skeleton skeleton-card"></div>
      </div>

      <div class="charts-grid">
        <div class="skeleton skeleton-chart"></div>
        <div class="skeleton skeleton-chart"></div>
      </div>

      <div class="skeleton skeleton-table mt-4"></div>
    </template>

    <!-- REAL CONTENT -->
    <template v-else>

      <!-- HEADER -->
      <div class="header-card mb-4">
        <div>
          <h1>ផ្ទាំងគ្រប់គ្រង</h1>
          <p class="header-sub">សង្ខេបទិន្នន័យ និងសកម្មភាពប្រព័ន្ធ</p>
        </div>

        <div class="add-btn d-flex justify-content-center align-items-center">
          <i class="bi bi-calendar3 me-2"></i>
          <span>{{ today }}</span>
        </div>
      </div>

      <!-- CARDS -->
      <div class="top-cards">

        <div class="summary-card users-card">
          <div class="card-top">
            <div>
              <p class="card-label">អ្នកប្រើប្រាស់សរុប</p>
              <h2 class="card-value">{{ dashboard.totalUsers }}</h2>
            </div>

            <div class="card-icon users-icon">
              <i class="bi bi-people-fill"></i>
            </div>
          </div>
        </div>

        <div class="summary-card category-card">
          <div class="card-top">
            <div>
              <p class="card-label">ប្រភេទសរុប</p>
              <h2 class="card-value">
                {{ totalAllCategories.totalCategories }}
              </h2>
            </div>

            <div class="card-icon category-icon">
              <i class="bi bi-grid-fill"></i>
            </div>
          </div>
        </div>

      </div>

      <!-- CHARTS -->
      <div class="charts-grid">

        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3>ចំណូល និង ចំណាយ</h3>
              <p>តាមប្រភេទប្រតិបត្តិការ</p>
            </div>
          </div>

          <TrendChart />
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3>សកម្មភាពអ្នកប្រើប្រាស់</h3>
              <p>ស្ថិតិប្រចាំសប្តាហ៍</p>
            </div>
          </div>

          <SpendingChart />
        </div>

      </div>

      <!-- TABLE -->
      <div class="table-wrapper">
        <ListUser />
      </div>

    </template>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useCategoryStore } from "@/stores/categoryStore";

import SpendingChart from "@/components/ui/base/SpendingChart.vue";
import TrendChart from "@/components/ui/base/TrendChart.vue";
import ListUser from "@/components/ui/base/ListUser.vue";

const dashboard = useDashboardStore();
const totalAllCategories = useCategoryStore();

const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      dashboard.fetchDashboard(),
      totalAllCategories.fetchTotalCategories()
    ]);
  } finally {
    isLoading.value = false;
  }
});

const today = computed(() =>
  new Date().toLocaleDateString("km-KH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
);
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  font-family: "Kantumruy Pro", sans-serif;
  background-color: transparent;
}

/* SKELETON */
.skeleton {
  display: block;
  background: linear-gradient(
    90deg,
    var(--bg-input) 25%,
    var(--border-color) 50%,
    var(--bg-input) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: var(--radius);
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.skeleton-header {
  height: 80px;
}

.skeleton-card {
  height: 110px;
}

.skeleton-chart {
  height: 350px;
}

.skeleton-table {
  height: 320px;
}

/* HEADER */

.dashboard-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
}

.dashboard-subtitle {
  font-size: 13px;
  opacity: 0.8;
}

.date-chip {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 14px;
  border-radius: 999px;

  background-color: #2563eb;
}

.header-sub {
  color: var(--text-white) !important;
}

/* FLOAT */
@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}

.header-card {
  background: var(--bg-sidebar);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow);
}

.header-card h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 2px;
  color: var(--text-white);
}

.header-card p {
  font-size: 12px;
  margin: 0;
  color: var(--text-secondary);
}

.add-btn {
  height: 46px;
  padding: 0 20px;
  font-size: 15px;
  white-space: nowrap;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif !important;
  background: rgba(255,255,255,0.15);
  color: var(--text-white);
  border: 1.5px solid rgba(255,255,255,0.4);
  border-radius: 12px;
}

/* CARDS */
.top-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.summary-card {
  padding: 22px;
  border-radius: 20px;

  background-color: var(--bg-card);
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);

  transition: 0.3s;
}

.summary-card:hover {
  transform: translateY(-4px);
}

.card-top {
  display: flex;
  justify-content: space-between;
}

.card-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.card-value {
  font-size: 36px;
  font-weight: 800;
}

.card-icon {
  width: 56px;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;
  color: var(--text-primary);
}

.users-icon {
  background: #2563eb;
}

.category-icon {
  background: #7c3aed;
}

/* CHARTS */
/* CHARTS */
.charts-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px;
  margin-top: 24px;
  align-items: stretch;
}

.chart-card {
  background: var(--bg-card);
  padding: 20px;
  border-radius: 20px;
  width: 100%;
  min-height: 350px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);

  display: flex;
  flex-direction: column;
}

.chart-card :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}

.chart-card :deep(.apexcharts-canvas),
.chart-card :deep(.recharts-responsive-container) {
  width: 100% !important;
  height: 100% !important;
  flex: 1;
}

.chart-header {
  margin-bottom: 14px;
}

.chart-header h3 {
  margin: 0;
}

.chart-header p {
  font-size: 12px;
  color: var(--text-secondary);
}
/* TABLE */
.table-wrapper {
  margin-top: 24px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .top-cards {
    grid-template-columns: 1fr;
  }

  .header-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .hero-image img {
    width: 200px;
  }

  .dashboard-title {
    font-size: 22px;
  }
}
</style>