<template>
  <div class="dashboard">

    <!-- HEADER -->
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">ផ្ទាំងគ្រប់គ្រង</h1>
        <p class="dashboard-subtitle">
          សង្ខេបទិន្នន័យ និងសកម្មភាពប្រព័ន្ធ
        </p>
      </div>

      <div class="dashboard-date">
        <i class="bi bi-calendar3"></i>
        <span>{{ today }}</span>
      </div>
    </div>

    <!-- TOP CARDS -->
    <div class="top-cards">

      <!-- USERS -->
      <div class="summary-card users-card">
        <div class="card-top">
          <div>
            <p class="card-label">អ្នកប្រើប្រាស់សរុប</p>
            <h2 class="card-value">
              {{ dashboard.totalUsers }}
            </h2>
          </div>

          <div class="card-icon users-icon">
            <i class="bi bi-people-fill"></i>
          </div>
        </div>

        <div class="card-bottom">
          <span class="growth positive">
            <i class="bi bi-arrow-up-short"></i>
            +12%
          </span>

          <span class="card-desc">
            កើនឡើងពីសប្តាហ៍មុន
          </span>
        </div>
      </div>

      <!-- INCOME -->
      <div class="summary-card income-card">
        <div class="card-top">
          <div>
            <p class="card-label">ចំណូលសរុបតាមប្រភេទ</p>
            <h2 class="card-value">
              {{ dashboard.incomeCount }}
            </h2>
          </div>

          <div class="card-icon income-icon">
            <i class="bi bi-cash-stack"></i>
          </div>
        </div>

        <div class="card-bottom">
          <span class="growth positive">
            <i class="bi bi-arrow-up-short"></i>
            +8%
          </span>

          <span class="card-desc">
            ចំណូលកំពុងកើនឡើង
          </span>
        </div>
      </div>

      <!-- EXPENSE -->
      <div class="summary-card expense-card">
        <div class="card-top">
          <div>
            <p class="card-label">ចំណាយសរុបតាមប្រភេទ</p>
            <h2 class="card-value">
              {{ dashboard.expenseCount }}
            </h2>
          </div>

          <div class="card-icon expense-icon">
            <i class="bi bi-wallet2"></i>
          </div>
        </div>

        <div class="card-bottom">
          <span class="growth negative">
            <i class="bi bi-arrow-down-short"></i>
            -3%
          </span>

          <span class="card-desc">
            កាត់បន្ថយការចំណាយ
          </span>
        </div>
      </div>

    </div>

    <!-- CHARTS -->
    <div class="charts-grid">

      <!-- LEFT -->
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3>ចំណូល និង ចំណាយ</h3>
            <p>តាមប្រភេទប្រតិបត្តិការ</p>
          </div>

          <div class="chart-badge green-badge">
            Overview
          </div>
        </div>

        <SpendingChart />
      </div>

      <!-- RIGHT -->
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3>សកម្មភាពអ្នកប្រើប្រាស់</h3>
            <p>ស្ថិតិប្រចាំសប្តាហ៍</p>
          </div>

          <div class="chart-badge blue-badge">
            Weekly
          </div>
        </div>

        <TrendChart />
      </div>

     

    </div>
     <div class="ListUser">
        <ListUser />
      </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue"
import { useDashboardStore } from "@/stores/dashboardStore"

import SpendingChart from "@/components/ui/base/SpendingChart.vue"
import TrendChart from "@/components/ui/base/TrendChart.vue"
import ListUser from "@/components/ui/base/ListUser.vue"

const dashboard = useDashboardStore()

onMounted(() => {
  dashboard.fetchDashboard()
})

const today = computed(() => {
  return new Date().toLocaleDateString("km-KH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
})
</script>

<style scoped>
.dashboard {
  padding: 24px;
  border-radius: 28px;

  background:
    linear-gradient(
      135deg,
      #f7faf7 0%,
      #eef7f0 50%,
      #f8fbff 100%
    );

  min-height: 100vh;

  font-family:
    "Kantumruy Pro",
    "Khmer OS",
    sans-serif;
}

/* HEADER */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 28px;
}

.dashboard-title {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  color: #111827;
}

.dashboard-subtitle {
  margin-top: 6px;
  color: #6b7280;
  font-size: 14px;
}

.dashboard-date {
  display: flex;
  align-items: center;
  gap: 10px;

  background: white;

  padding: 12px 18px;

  border-radius: 14px;

  box-shadow: 0 4px 12px rgba(0,0,0,0.06);

  font-size: 14px;
  color: #374151;
}

/* TOP CARDS */
.top-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;

  margin-bottom: 28px;
}

.summary-card {
  position: relative;

  overflow: hidden;

  border-radius: 24px;

  padding: 24px;

  background: rgba(255,255,255,0.92);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(255,255,255,0.7);

  box-shadow:
    0 8px 24px rgba(0,0,0,0.06);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.summary-card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 14px 32px rgba(0,0,0,0.08);
}

.summary-card::before {
  content: "";

  position: absolute;

  top: -40px;
  right: -40px;

  width: 120px;
  height: 120px;

  border-radius: 50%;

  opacity: 0.08;
}

.users-card::before {
  background: #2563eb;
}

.income-card::before {
  background: #16a34a;
}

.expense-card::before {
  background: #dc2626;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-label {
  margin: 0;

  font-size: 14px;
  color: #6b7280;
}

.card-value {
  margin: 14px 0 0;

  font-size: 38px;
  font-weight: 700;

  color: #111827;
}

.card-icon {
  width: 58px;
  height: 58px;

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  font-size: 24px;

  flex-shrink: 0;
}

.users-icon {
  background:
    linear-gradient(
      135deg,
      #3b82f6,
      #2563eb
    );
}

.income-icon {
  background:
    linear-gradient(
      135deg,
      #22c55e,
      #16a34a
    );
}

.expense-icon {
  background:
    linear-gradient(
      135deg,
      #ef4444,
      #dc2626
    );
}

.card-bottom {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-top: 20px;
}

.growth {
  display: flex;
  align-items: center;

  padding: 4px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;
}

.positive {
  background: #dcfce7;
  color: #15803d;
}

.negative {
  background: #fee2e2;
  color: #b91c1c;
}

.card-desc {
  color: #6b7280;
  font-size: 13px;
}

/* CHARTS */
.charts-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 24px;
}

.chart-card {
  background: rgba(255,255,255,0.95);

  border-radius: 26px;

  padding: 24px;

  border: 1px solid rgba(255,255,255,0.7);

  box-shadow:
    0 8px 24px rgba(0,0,0,0.06);

  backdrop-filter: blur(12px);

  overflow: hidden;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 22px;
}

.chart-header h3 {
  margin: 0;

  font-size: 18px;
  font-weight: 700;

  color: #111827;
}

.chart-header p {
  margin-top: 6px;

  color: #6b7280;
  font-size: 13px;
}

.chart-badge {
  padding: 8px 14px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;
}

.green-badge {
  background: #dcfce7;
  color: #15803d;
}

.blue-badge {
  background: #dbeafe;
  color: #1d4ed8;
}

/* MOBILE */
@media (max-width: 1100px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .top-cards {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

@media (max-width: 640px) {
  .dashboard {
    padding: 16px;
  }

  .summary-card {
    padding: 20px;
  }

  .card-value {
    font-size: 30px;
  }

  .chart-card {
    padding: 18px;
  }

  .dashboard-title {
    font-size: 24px;
  }
}
</style>