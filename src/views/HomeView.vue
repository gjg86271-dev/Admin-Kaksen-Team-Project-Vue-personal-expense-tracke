<template>
  <div class="dashboard">

    <!-- HEADER -->
    <div class="header-card">
      <div>
        <h1 class="dashboard-title">ផ្ទាំងគ្រប់គ្រង</h1>
        <p class="dashboard-subtitle">
          សង្ខេបទិន្នន័យ និងសកម្មភាពប្រព័ន្ធ
        </p>
      </div>

      <div class="date-chip">
        <i class="bi bi-calendar3"></i>
        <span>{{ today }}</span>
      </div>
    </div>

    <!-- HERO -->
    <div class="hero-banner">
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">
            <i class="bi bi-stars"></i>
            Smart Dashboard
          </span>

          <h1>សូមស្វាគមន៍ការត្រឡប់មកវិញ 👋</h1>

          <p>
            តាមដានចំណូល ចំណាយ និងសកម្មភាពប្រព័ន្ធ
            របស់អ្នកបានយ៉ាងងាយស្រួល និងទាន់សម័យ
          </p>
        </div>

        <div class="hero-image">
          <img src="/src/assets/img/image.png" />
        </div>
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

  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useCategoryStore } from "@/stores/categoryStore";

import SpendingChart from "@/components/ui/base/SpendingChart.vue";
import TrendChart from "@/components/ui/base/TrendChart.vue";
import ListUser from "@/components/ui/base/ListUser.vue";

const dashboard = useDashboardStore();
const totalAllCategories = useCategoryStore();

onMounted(async () => {
  await dashboard.fetchDashboard();
  await totalAllCategories.fetchTotalCategories();
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
  padding: 24px;
  font-family: "Kantumruy Pro", sans-serif;

  background:
    radial-gradient(circle at 10% 10%, #dbeafe 0%, transparent 35%),
    radial-gradient(circle at 90% 20%, #c7d2fe 0%, transparent 40%),
    radial-gradient(circle at 50% 100%, #e0e7ff 0%, transparent 40%),
    #f8fafc;
}

/* HEADER */
.header-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 22px;
  border-radius: 20px;

  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;

  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.25);
}

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

  background: rgba(255,255,255,0.15);
}

/* HERO */
.hero-banner {
  margin-top: 20px;
  padding: 28px;

  border-radius: 24px;

  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.hero-text h1 {
  font-size: 32px;
  margin: 12px 0;
}

.hero-text p {
  opacity: 0.8;
  line-height: 1.6;
  max-width: 500px;
}

.hero-image img {
  width: 260px;
  animation: float 3s ease-in-out infinite;
}

/* FLOAT */
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
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

  background: white;
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
  color: #64748b;
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
  color: white;
}

.users-icon {
  background: #2563eb;
}

.category-icon {
  background: #7c3aed;
}

/* CHARTS */
.charts-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px;

  margin-top: 24px;
}

.chart-card {
  background: white;
  padding: 20px;
  border-radius: 20px;

  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

.chart-header h3 {
  margin: 0;
}

.chart-header p {
  font-size: 12px;
  color: #64748b;
}

/* TABLE */
.table-wrapper {
  margin-top: 24px;
  background: white;
  padding: 18px;
  border-radius: 20px;
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