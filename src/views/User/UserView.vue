<style scoped>
.font {
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif !important;
}

.fw-500 {
  font-weight: 500;
}

.add-btn {
  height: 46px;
  padding: 0 20px;
  font-size: 15px;
  white-space: nowrap;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif !important;
  background: rgba(255, 255, 255, 0.15);
  color: var(--text-white);
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(4px);
  transition: var(--transition);
}

.add-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* ── HEADER BANNER ────────────────────────────────── */
.header-banner {
  background: var(--bg-sidebar);
  border-radius: var(--radius);
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
}

.header-banner h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-white);
  margin: 0 0 2px 0;
}

.header-banner p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}

/* ── FILTER CARD ──────────────────────────────────── */
.filter-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  padding: 14px 18px;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.filter-label i {
  color: var(--color-primary);
  font-size: 16px;
}

.filter-selects {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-select {
  border: 1.5px solid var(--border-color);
  border-radius: 30px;
  font-size: 13px;
  padding: 7px 16px;
  color: var(--text-primary);
  background: var(--bg-input);
  cursor: pointer;
  outline: none;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  transition: border-color 0.15s, background 0.15s;
  min-width: 130px;
}

.filter-select:focus,
.filter-select:hover {
  border-color: var(--color-primary);
  background: var(--bg-card);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 200px;
  height: 40px;
  border: 1.5px solid var(--border-color);
  border-radius: 50px;
  padding: 0 14px;
  background: var(--bg-input);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-box.focused {
  border-color: var(--color-primary);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px rgba(26, 98, 212, 0.10);
}

.search-box i {
  color: var(--text-secondary);
  font-size: 14px;
  flex-shrink: 0;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  width: 100%;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  color: var(--text-primary);
}

.search-box input::placeholder {
  color: var(--border-color);
}

.clear-btn {
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.15s;
}

.clear-btn:hover {
  color: var(--text-primary);
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1.5px solid var(--border-color);
  border-radius: 30px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 13px;
  padding: 7px 14px;
  cursor: pointer;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  transition: var(--transition);
  white-space: nowrap;
}

.reset-btn:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
  background: var(--color-danger-light);
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border-color);
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--color-success-light);
  color: var(--color-primary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 12px;
  padding: 3px 10px;
}

.filter-badge i {
  cursor: pointer;
  font-size: 13px;
  opacity: 0.6;
  transition: opacity 0.15s;
}

.filter-badge i:hover {
  opacity: 1;
}

/* ── DESKTOP TABLE ────────────────────────────────── */
.table-wrap {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

.table {
  border-collapse: collapse;
}

/* ── MOBILE CARD ──────────────────────────────────── */
.mobile-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 12px 14px;
  margin-bottom: 10px;
  box-shadow: var(--shadow);
}

.mobile-card__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 16px;
  flex-shrink: 0;
}

.icon--income {
  background: var(--color-success-light);
  color: var(--color-success);
}

.icon--expense {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

.mobile-card__category {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.mobile-card__note {
  font-size: 12px;
  color: var(--text-secondary);
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-card__date {
  font-size: 11px;
  color: var(--border-color);
  margin-top: 2px;
}

.mobile-card__right {
  text-align: right;
  flex-shrink: 0;
}

.amount--income {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-success);
}

.amount--expense {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-danger);
}

.mobile-card__actions {
  display: flex;
  justify-content: flex-end;
  gap: 2px;
  margin-top: 4px;
}

/* ── TYPE TOGGLE ──────────────────────────────────── */
.type-toggle {
  display: flex;
  gap: 10px;
}

.type-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid var(--border-color);
  background: var(--bg-input);
  color: var(--text-secondary);
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  transition: var(--transition);
}

.type-btn:hover {
  background: var(--bg-body);
}

.type-btn--income.active {
  border-color: var(--color-success);
  background: var(--color-success-light);
  color: var(--color-success);
}

.type-btn--expense.active {
  border-color: var(--color-danger);
  background: var(--color-danger-light);
  color: var(--color-danger);
}

.form-label {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 6px;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
}

.btn-edit {
  color: white;
}

.bi-trash {
  font-size: 15px;
}

/* ---card---- */

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
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);

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
</style>

<template>
  <router-view />
  <div>
    <div class="header-banner">
      <div>
        <h1>ប្រតិបត្តិការ</h1>
        <p>គ្រប់គ្រងប្រតិបត្តិការហិរញ្ញវត្ថុរបស់អ្នកទាំងអស់</p>
      </div>
    </div>
    <!-- ---card--- -->
    <div class="top-cards mb-4">

      <div class="summary-card users-card">
        <div class="card-top">
          <div>
            <p class="card-label">អ្នកប្រើប្រាស់សរុប</p>
            <h2 class="card-value">99</h2>
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
              99
            </h2>
          </div>

          <div class="card-icon category-icon">
            <i class="bi bi-grid-fill"></i>
          </div>
        </div>
      </div>

    </div>
    <!-- FILTER BAR -->
    <div class="filter-card mb-4">
      <div class="filter-bar">
        <div class="filter-label">
          <i class="bi bi-funnel-fill"></i>
          <span>តម្រង</span>
        </div>
        <div class="search-box">
          <i class="bi bi-search"></i>

          <input v-model="search" @input="fetchUsers" type="search" placeholder="ស្វែងរក..." />

          <button v-if="search" class="clear-btn" @click="clearSearch">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <button class="reset-btn">
          <i class="bi bi-arrow-counterclockwise"></i>
          <span class="d-none d-sm-inline">លុបតម្រង</span>
        </button>
      </div>
      <!-- ACTIVE BADGES -->
    </div>

  </div>
  <!-- DESKTOP TABLE -->
  <div class="table-wrap d-none d-md-block border-0">
    <table class="table mb-0 font align-middle">
      <thead class="table-secondary">
        <tr class="text-center">
          <th>រូបថត</th>
          <th>ឈ្មោះពេញ</th>
          <th>អ៊ីមែល</th>
          <th>តួនាទី</th>
          <th>កាលបរិច្ឆេទចុះឈ្មោះ</th>
          <th>សកម្មភាព</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="6" class="text-center py-5 text-muted">
            <div class="spinner-border spinner-border-sm me-2" role="status"></div>
            កំពុងទាញយកទិន្នន័យ...
          </td>
        </tr>

        <template v-else-if="users.length > 0">
          <tr v-for="user in users" :key="user.id" class="text-center">
            <td>
              <img :src="user.avatar" alt="Avatar" class="rounded-circle" width="40" height="40"
                style="object-fit: cover;">
            </td>
            <td>{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="user.role.name === 'ADMIN' ? 'badge bg-danger' : 'badge bg-primary'">
                {{ user.role.name }}
              </span>
            </td>
            <td>{{ formatDate(user.registeredAt) }}</td>
            <td>
              <RouterLink class="btn text-primary btn-sm" :to="{
                name: 'detailuser',
                params: { id: user.id }
              }">
                <i class="bi bi-eye-fill"></i>
              </RouterLink>
              <button class="btn text-danger btn-sm" @click="openDeleteModal(user)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td colspan="6" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2"></i>
            គ្មានទិន្នន័យ
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <BaseModal v-if="showDeleteModal" title="លុបអ្នកប្រើប្រាស់" @close-modal="closeDeleteModal">
    <template #body>
      <div class="text-center">
        <div class="fs-1 mb-3">🗑️</div>

        <h4 class="fw-bold">លុបអ្នកប្រើប្រាស់?</h4>

        <p>
          តើអ្នកពិតជាចង់លុប
          <strong>{{ selectedUser?.fullName }}</strong>
          មែនទេ?
        </p>
      </div>
    </template>

    <template #footer>
      <button class="btn btn-secondary" @click="closeDeleteModal" :disabled="deleteLoading">
        បោះបង់
      </button>

      <button class="btn btn-danger" @click="deleteUser" :disabled="deleteLoading">
        <span v-if="deleteLoading" class="spinner-border spinner-border-sm me-1"></span>

        លុប
      </button>
    </template>
  </BaseModal>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'
import BaseModal from '@/components/ui/base/BaseModal.vue'

const selectedUser = ref(null)
const deleteLoading = ref(false)
const users = ref([])
const loading = ref(true)
const search = ref('')
const showDeleteModal = ref(false)

const TOKEN = 'YOUR_TOKEN'

const fetchUsers = async () => {
  try {
    loading.value = true

    const response = await api.get(
      `users?_page=1&_per_page=10&search=${search.value}&sortBy=id&sortDir=asc`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: '*/*'
        }
      }
    )

    if (response.data?.data?.items) {
      users.value = response.data.data.items
    }

  } catch (error) {
    console.error('មានបញ្ហាក្នុងការទាញទិន្នន័យ៖', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})

// ---for search---
const clearSearch = () => {
  search.value = ''
  fetchUsers()
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB')
}

// ---delete----
// open modal
const openDeleteModal = (user) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

// close modal
const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedUser.value = null
}
const deleteUser = async () => {
  try {
    deleteLoading.value = true

    await api.delete(`users/${selectedUser.value.id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })

    users.value = users.value.filter(
      user => user.id !== selectedUser.value.id
    )

    closeDeleteModal()

  } catch (error) {
    console.error('Delete error:', error)
  } finally {
    deleteLoading.value = false
  }
}
</script>