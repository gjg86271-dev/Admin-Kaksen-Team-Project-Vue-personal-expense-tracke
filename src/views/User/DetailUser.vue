<template>
  <div class="font detail-page">

    <!-- BACK BUTTON -->
    <button class="back-btn" @click="router.back()">
      <i class="bi bi-arrow-left"></i>
      <span>ត្រឡប់ក្រោយ</span>
    </button>

    <!-- LOADING -->
    <div v-if="loading" class="state-box">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3 text-secondary">កំពុងផ្ទុក...</p>
    </div>

    <!-- ERROR -->
    <div v-else-if="errorMsg" class="state-box">
      <div class="fs-1 mb-3">⚠️</div>
      <h5 class="fw-bold text-danger">{{ errorMsg }}</h5>
      <button class="btn btn-outline-primary mt-3" @click="fetchDetail">
        ព្យាយាមម្ដងទៀត
      </button>
    </div>

    <!-- CONTENT -->
    <div v-else-if="user" class="detail-layout">

      <!-- LEFT -->
      <div class="hero-card">
        <img
          :src="user.avatar"
          class="rounded-circle mb-3"
          width="120"
          height="120"
          style="object-fit: cover;"
        />
        <h3 class="fw-bold">{{ user.fullName }}</h3>
        <div class="mt-2">
          <span :class="user.role?.name === 'ADMIN' ? 'badge bg-danger' : 'badge bg-primary'">
            {{ user.role?.name }}
          </span>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="detail-right">
        <div class="detail-header">
          <div>
            <h2 class="detail-title">ព័ត៌មានអ្នកប្រើប្រាស់</h2>
            <p class="detail-subtitle">លម្អិតអ្នកប្រើប្រាស់</p>
          </div>
        </div>

        <div class="info-grid">

          <div class="info-row">
            <div class="info-label"><i class="bi bi-person"></i>ឈ្មោះ</div>
            <div class="info-value">{{ user.fullName }}</div>
          </div>

          <div class="info-row">
            <div class="info-label"><i class="bi bi-envelope"></i>អ៊ីមែល</div>
            <div class="info-value">{{ user.email }}</div>
          </div>

          <div class="info-row">
            <div class="info-label"><i class="bi bi-shield"></i>តួនាទី</div>
            <div class="info-value">{{ user.role?.name }}</div>
          </div>

          <div class="info-row">
            <div class="info-label"><i class="bi bi-calendar3"></i>កាលបរិច្ឆេទ</div>
            <div class="info-value">{{ formatDate(user.registeredAt) }}</div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/api'

const route  = useRoute()
const router = useRouter()

const loading  = ref(true)
const errorMsg = ref('')
const user     = ref(null)

const fetchDetail = async () => {
  try {
    loading.value  = true
    errorMsg.value = ''
    user.value     = null

    const res  = await api.get(`users/${route.params.id}`)
    user.value = res.data.data
  } catch (err) {
    console.error(err)
    errorMsg.value = 'Load failed'
  } finally {
    loading.value = false
  }
}

// ── refetch whenever the id changes (navigating between users from navbar) ──
watch(() => route.params.id, (newId) => {
  if (newId) fetchDetail()
})

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
}

onMounted(() => {
  fetchDetail()
})
</script>

<style>
/* ───────────────── PAGE ───────────────── */
.detail-page {
  padding: 24px;
  background: var(--bg-body);
  min-height: 100vh;
}

.font {
  font-family: var(--font-khmer);
}

/* ───────────────── BACK BUTTON ───────────────── */
.back-btn {
  border: none;
  background: var(--bg-card);
  color: var(--text-primary);
  padding: 10px 18px;
  border-radius: var(--radius);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.back-btn:hover {
  transform: translateY(-2px);
  background: var(--bg-input);
  color: var(--color-primary);
}

/* ───────────────── LAYOUT ───────────────── */
.detail-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 24px;
  margin-top: 20px;
}

@media (max-width: 900px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
}

/* ───────────────── HERO CARD ───────────────── */
.hero-card {
  background: var(--bg-card);
  border-radius: 24px;
  padding: 28px;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: var(--text-primary);
}

.hero-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 5px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
}

/* ───────────────── RIGHT CARD ───────────────── */
.detail-right {
  background: var(--bg-card);
  border-radius: 24px;
  padding: 28px;
  box-shadow: var(--shadow);
  color: var(--text-primary);
}

/* ───────────────── HEADER ───────────────── */
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.detail-title {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
  color: var(--text-primary);
}

.detail-subtitle {
  color: var(--text-secondary);
  margin-top: 4px;
}

/* ───────────────── INFO GRID ───────────────── */
.info-grid {
  border-top: 1px solid var(--border-color);
}

.info-row {
  display: flex;
  gap: 24px;
  padding: 18px 0;
  border-bottom: 1px solid var(--border-color);
}

.info-label {
  width: 180px;
  flex-shrink: 0;
  font-weight: 700;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-label i { color: var(--color-primary); }

.info-value {
  flex: 1;
  color: var(--text-primary);
}

/* ───────────────── STATE BOX ───────────────── */
.state-box {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--text-primary);
}
</style>