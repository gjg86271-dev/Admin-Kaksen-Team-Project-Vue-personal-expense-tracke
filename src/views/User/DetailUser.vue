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
    <div v-else-if="error" class="state-box">
      <div class="fs-1 mb-3">⚠️</div>
      <h5 class="fw-bold text-danger">{{ error }}</h5>

      <button
        class="btn btn-outline-primary mt-3"
        @click="fetchDetail"
      >
        ព្យាយាមម្ដងទៀត
      </button>
    </div>

    <!-- CONTENT -->
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

    <h3 class="fw-bold">
      {{ user.fullName }}
    </h3>

    <div class="mt-2">
      <span
        :class="
          user.role?.name === 'ADMIN'
            ? 'badge bg-danger'
            : 'badge bg-primary'
        "
      >
        {{ user.role?.name }}
      </span>
    </div>

  </div>

  <!-- RIGHT -->
  <div class="detail-right">

    <div class="detail-header">
      <div>
        <h2 class="detail-title">
          ព័ត៌មានអ្នកប្រើប្រាស់
        </h2>

        <p class="detail-subtitle">
          លម្អិតអ្នកប្រើប្រាស់
        </p>
      </div>
    </div>

    <div class="info-grid">

      <div class="info-row">
        <div class="info-label">
          <i class="bi bi-person"></i>
          ឈ្មោះ
        </div>

        <div class="info-value">
          {{ user.fullName }}
        </div>
      </div>

      <div class="info-row">
        <div class="info-label">
          <i class="bi bi-envelope"></i>
          អ៊ីមែល
        </div>

        <div class="info-value">
          {{ user.email }}
        </div>
      </div>

      <div class="info-row">
        <div class="info-label">
          <i class="bi bi-shield"></i>
          តួនាទី
        </div>

        <div class="info-value">
          {{ user.role?.name }}
        </div>
      </div>

      <div class="info-row">
        <div class="info-label">
          <i class="bi bi-calendar3"></i>
          កាលបរិច្ឆេទ
        </div>

        <div class="info-value">
          {{ formatDate(user.registeredAt) }}
        </div>
      </div>

    </div>

  </div>
</div>

    <!-- EDIT MODAL -->
    <BaseModal
      v-if="showModal"
      title="កែប្រែប្រតិបត្តិការ"
      @close-modal="showModal = false"
    >

      <template #body>

        <!-- CATEGORY -->
        <div class="form-group mb-3">
          <label class="form-label fw-500">
            ប្រភេទ
          </label>

          <select
            class="form-select"
            v-model="form.categoryId"
          >
            <option value="" disabled>
              ជ្រើសរើសប្រភេទ
            </option>

            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- AMOUNT -->
        <div class="form-group mb-3">
          <label class="form-label fw-500">
            ចំនួនទឹកប្រាក់
          </label>

          <div class="input-group">
            <span class="input-group-text">$</span>

            <input
              v-model="form.amount"
              type="number"
              class="form-control"
            />
          </div>
        </div>

        <!-- NOTES -->
        <div class="form-group mb-3">
          <label class="form-label fw-500">
            កំណត់ចំណាំ
          </label>

          <input
            v-model="form.notes"
            type="text"
            class="form-control"
          />
        </div>

        <!-- DATE -->
        <div class="form-group mb-3">
          <label class="form-label fw-500">
            កាលបរិច្ឆេទ
          </label>

          <input
            v-model="form.transactionDate"
            type="date"
            class="form-control"
          />
        </div>

        <!-- FILE -->
        <div class="form-group">

          <label class="form-label fw-500">
            ឯកសារភ្ជាប់
          </label>

          <input
            type="file"
            class="form-control"
            accept="image/*,.pdf"
            @change="onFileChange"
          />

          <!-- PREVIEW -->
          <div class="mt-3">

            <!-- NEW FILE -->
            <template v-if="form.file">

              <img
                v-if="form.file.type.startsWith('image/')"
                :src="URL.createObjectURL(form.file)"
                class="attachment-preview"
                alt="preview"
              />

              <div v-else class="pdf-preview">
                <i class="bi bi-file-earmark-pdf"></i>
                <span>{{ form.file.name }}</span>
              </div>

            </template>

            <!-- OLD FILE -->
            <template v-else-if="transaction?.attachmentUrl">

              <img
                v-if="
                  transaction.attachmentUrl.includes('.jpg') ||
                  transaction.attachmentUrl.includes('.jpeg') ||
                  transaction.attachmentUrl.includes('.png') ||
                  transaction.attachmentUrl.includes('.webp')
                "
                :src="transaction.attachmentUrl"
                class="attachment-preview"
                alt="attachment"
              />

              <a
                v-else
                :href="transaction.attachmentUrl"
                target="_blank"
                class="pdf-preview text-decoration-none"
              >
                <i class="bi bi-file-earmark-pdf"></i>
                <span>មើល PDF</span>
              </a>

            </template>

            <!-- EMPTY -->
            <div v-else class="empty-image">
              <i class="bi bi-image"></i>
              <span>មិនមានឯកសារភ្ជាប់</span>
            </div>

          </div>
        </div>

      </template>

      <template #footer>

        <button
          class="btn btn-secondary"
          @click="showModal = false"
        >
          បោះបង់
        </button>

        <button
          class="btn btn-primary"
          @click="saveEdit"
        >
          កែប្រែ
        </button>

      </template>
    </BaseModal>

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/api'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import { useCategoryStore } from '@/stores/categoryStore'

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()


const loading = ref(true)
const error = ref('')
const showModal = ref(false)

const form = reactive({
  categoryId: '',
  amount: '',
  transactionDate: '',
  notes: '',
  file: null,
})



const user = ref(null)

const fetchDetail = async () => {
  try {
    loading.value = true

    const res = await api.get(`users/${route.params.id}`)

    user.value = res.data.data

  } catch (error) {
    console.log(error)
    error.value = 'Load failed'

  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDetail()
})



const categories = computed(() =>
  Array.isArray(categoryStore.categories)
    ? categoryStore.categories
    : []
)



function onFileChange(e) {
  form.file = e.target.files[0] || null
}



function formatDate(dateStr) {
  if (!dateStr) return '—'

  return new Date(dateStr).toLocaleDateString(
    'en-GB',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }
  )
}

function openEditModal() {
  const t = transaction.value

  form.categoryId = t.category?.id || ''
  form.amount = t.amount || ''
  form.notes = t.notes || ''
  form.transactionDate =
    t.transactionDate?.split('T')[0] || ''

  form.file = null

  showModal.value = true
}

async function saveEdit() {
  try {
    const payload = new FormData()

    payload.append('categoryId', form.categoryId)
    payload.append('amount', Number(form.amount))
    payload.append('notes', form.notes)
    payload.append('transactionDate', form.transactionDate)

    if (form.file) {
      payload.append('file', form.file)
    }

    const res = await api.put(
      `transactions/${route.params.id}`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    transaction.value =
      res.data?.data ?? res.data

    showModal.value = false

  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await categoryStore.fetchAllCategories()
  await fetchDetail()
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
  top: 0;
  left: 0;

  width: 100%;
  height: 5px;

  background: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-primary-hover)
  );
}

/* ───────────────── HERO VARIANT ───────────────── */
.hero--income::before {
  background: linear-gradient(
    90deg,
    var(--color-success),
    #65d6a6
  );
}

.hero--expense::before {
  background: linear-gradient(
    90deg,
    var(--color-danger),
    #ff758f
  );
}

/* ───────────────── ICON ───────────────── */
.hero-icon {
  width: 80px;
  height: 80px;
  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  margin-bottom: 18px;
}

.hero--income .hero-icon {
  background: var(--color-success-light);
  color: var(--color-success);
}

.hero--expense .hero-icon {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

/* ───────────────── BADGE ───────────────── */
.hero-badge {
  padding: 6px 16px;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 700;

  margin-bottom: 14px;
}

.badge--income {
  background: var(--color-success-light);
  color: var(--color-success);
}

.badge--expense {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

/* ───────────────── AMOUNT ───────────────── */
.hero-amount {
  font-size: 38px;
  font-weight: 800;
  margin-bottom: 10px;
}

.amount--income {
  color: var(--color-success);
}

.amount--expense {
  color: var(--color-danger);
}

.hero-category {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;

  color: var(--text-primary);
}

.hero-date {
  color: var(--text-secondary);
  font-size: 14px;

  display: flex;
  align-items: center;
  gap: 6px;
}

/* ───────────────── HERO IMAGE ───────────────── */
.hero-preview {
  width: 100%;
  height: 220px;

  object-fit: cover;

  border-radius: 18px;
  margin-top: 18px;

  border: 1px solid var(--border-color);
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

/* ───────────────── ACTION BUTTON ───────────────── */
.detail-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 42px;
  height: 42px;

  border: none;
  border-radius: 14px;

  background: var(--bg-input);
  color: var(--text-primary);

  display: flex;
  align-items: center;
  justify-content: center;

  transition: var(--transition);
}

.action-btn i {
  font-size: 18px;
}

.action-btn--edit:hover {
  background: rgba(13, 110, 253, 0.12);
  color: var(--color-primary);
}

.action-btn--delete:hover {
  background: rgba(220, 38, 38, 0.12);
  color: var(--color-danger);
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

.info-label i {
  color: var(--color-primary);
}

.info-value {
  flex: 1;
  color: var(--text-primary);
}

.notes-value {
  white-space: pre-wrap;
  line-height: 1.7;
}

/* ───────────────── TYPE CHIP ───────────────── */
.type-chip {
  padding: 6px 14px;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 700;

  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.chip--income {
  background: var(--color-success-light);
  color: var(--color-success);
}

.chip--expense {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

/* ───────────────── ATTACHMENT PREVIEW ───────────────── */
.attachment-preview {
  width: 240px;
  height: 170px;

  object-fit: cover;

  border-radius: 18px;
  border: 1px solid var(--border-color);

  background: var(--bg-card);

  display: block;
  margin-top: 10px;

  transition: var(--transition);
}

.attachment-preview:hover {
  transform: scale(1.02);
}

/* ───────────────── EMPTY IMAGE ───────────────── */
.empty-image {
  width: 240px;
  height: 170px;

  border: 2px dashed var(--border-color);
  border-radius: 18px;

  background: var(--bg-input);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 10px;

  color: var(--text-secondary);

  margin-top: 10px;
}

.empty-image i {
  font-size: 42px;
}

/* ───────────────── PDF ───────────────── */
.pdf-preview {
  width: 240px;
  height: 170px;

  border-radius: 18px;
  border: 1px solid var(--border-color);

  background: var(--bg-card);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 12px;

  margin-top: 10px;

  color: var(--color-danger);
  font-weight: 700;

  transition: var(--transition);
}

.pdf-preview:hover {
  background: var(--bg-input);
}

.pdf-preview i {
  font-size: 52px;
}

/* ───────────────── FORM ───────────────── */
.form-label {
  font-weight: 700;
  margin-bottom: 8px;

  color: var(--text-primary);
}

.form-control,
.form-select {
  border-radius: 14px;
  min-height: 48px;

  border: 1px solid var(--border-color);

  background: var(--bg-card);
  color: var(--text-primary);
}

.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.12);
  border-color: var(--color-primary);
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