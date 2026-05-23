<style scoped>
.font {
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif !important;
}

/* HERO */
.hero-banner {
  margin-top: 20px;
  padding: 28px;
  border-radius: 24px;
  background-color: var(--bg-sidebar);
  color: var(--text-primary);
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

.hero-image img {
  width: 260px;
  animation: float 3s ease-in-out infinite;
}

/* FLOAT */
@keyframes float {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

/* ── HEADER BANNER ────────────────────────────────── */
.header-banner {
  background: var(--bg-sidebar);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.header-logo-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 22px;
  color: #fff;
}

.header-logo-img {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: contain;
  flex-shrink: 0;
}

.header-texts { min-width: 0; }

.header-app-name {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.50);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 1px 0;
  white-space: nowrap;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-white);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  margin: 1px 0 0 0;
  white-space: nowrap;
}

.header-badge {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  gap: 9px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius);
  padding: 10px 22px;
  flex-shrink: 0;
  min-width: 90px;
}

.header-badge i { font-size: 20px; color: rgba(255, 255, 255, 0.85); }

.header-badge .badge-number {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-white);
  line-height: 1;
  white-space: nowrap;
}

.header-badge .badge-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
  white-space: nowrap;
  letter-spacing: 0.04em;
}

/* ── SUMMARY CARD ─────────────────────────────────── */
.summary-card {
  padding: 18px 22px;
  border-radius: var(--radius);
  background: var(--bg-card);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  transition: transform var(--transition), box-shadow var(--transition);
}

.summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(26, 98, 212, 0.14);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.card-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  font-weight: 500;
}

.card-value {
  font-size: 30px;
  font-weight: 800;
  margin: 0;
  color: var(--text-primary);
  min-height: 36px;
  line-height: 1;
}

.card-icon {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--color-primary);
  color: #fff;
  font-size: 18px;
  flex-shrink: 0;
}

/* ── FILTER CARD ──────────────────────────────────── */
.filter-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  padding: 14px 18px;
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
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.filter-label i { color: var(--color-primary); font-size: 15px; }

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 180px;
  height: 38px;
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

.search-box i { color: var(--text-secondary); font-size: 13px; flex-shrink: 0; }

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  width: 100%;
  font-family: 'Kantumruy Pro', sans-serif;
  color: var(--text-primary);
}

.search-box input::placeholder { color: var(--border-color); }

.clear-btn {
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  font-size: 15px;
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.15s;
}
.clear-btn:hover { color: var(--text-primary); }

.reset-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1.5px solid var(--border-color);
  border-radius: 30px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 13px;
  padding: 6px 14px;
  cursor: pointer;
  font-family: 'Kantumruy Pro', sans-serif;
  transition: var(--transition);
  white-space: nowrap;
}
.reset-btn:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
  background: var(--color-danger-light);
}

/* ── TABLE ────────────────────────────────────────── */
.table-wrap {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
}

.table { border-collapse: collapse; }

/* Override Bootstrap table colors with CSS variables */
.table > :not(caption) > * > * {
  background-color: var(--bg-card);
  color: var(--text-primary);
  border-bottom-color: var(--border-color);
}

.table thead.table-secondary > tr > th {
  background-color: var(--bg-input);
  color: var(--text-secondary);
  border-bottom: 2px solid var(--border-color);
  font-weight: 600;
}

.table tbody tr:hover > * {
  background-color: var(--bg-input);
}

/* Role badges using CSS variables */
.role-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.role-badge--user {
  background: rgba(26, 98, 212, 0.12);
  color: var(--color-primary);
  border: 1px solid rgba(26, 98, 212, 0.25);
}

.role-badge--admin {
  background: var(--color-danger-light);
  color: var(--color-danger);
  border: 1px solid rgba(220, 38, 38, 0.25);
}

/* ── SKELETON ─────────────────────────────────────── */
.skeleton {
  display: inline-block;
  background: linear-gradient(90deg, var(--border-color) 25%, var(--bg-input) 50%, var(--border-color) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
  vertical-align: middle;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>

<template>
  <div>
    <!-- HEADER BANNER -->
    <div class="header-banner">
      <div class="header-left">
        <div class="header-texts">
          <h1 class="header-title">អ្នកប្រើប្រាស់</h1>
          <p class="header-sub">គ្រប់គ្រងអ្នកប្រើប្រាស់ទាំងអស់</p>
        </div>
      </div>
      <div class="header-badge">
        <i class="bi bi-people-fill"></i>
        <span class="badge-number">
          <span v-if="loading && totalUsers === 0">—</span>
          <span v-else>{{ totalUsers }}</span>
        </span>
        <span class="badge-label">នាក់</span>
      </div>
    </div>


    <!-- FILTER BAR -->
    <div class="filter-card mb-4">
      <div class="filter-bar">
        <div class="filter-label">
          <i class="bi bi-funnel-fill"></i>
          <span>តម្រង</span>
        </div>
        <div class="search-box" :class="{ focused: searchFocused }">
          <i class="bi bi-search"></i>
          <input
            v-model="search"
            @input="onSearchInput"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
            type="search"
            placeholder="ស្វែងរក..."
          />
          <button v-if="search" class="clear-btn" @click="clearSearch">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <button class="reset-btn" @click="resetFilters">
          <i class="bi bi-arrow-counterclockwise"></i>
          <span class="d-none d-sm-inline">លុបតម្រង</span>
        </button>
      </div>
    </div>

    <!-- DESKTOP TABLE -->
    <div class="table-wrap d-none d-md-block">
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
                <img :src="user.avatar" alt="Avatar" class="rounded-circle" width="40" height="40" style="object-fit:cover;" />
              </td>
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="user.role?.name === 'ADMIN' ? 'role-badge role-badge--admin' : 'role-badge role-badge--user'">
                  {{ user.role?.name }}
                </span>
              </td>
              <td>{{ formatDate(user.registeredAt) }}</td>
              <td>
                <RouterLink class="btn text-primary btn-sm" :to="{ name: 'detailuser', params: { id: user.id } }">
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

    <!-- MOBILE CARDS -->
    <div class="d-md-none mt-3">
      <div v-if="loading" class="text-center py-5 text-muted">
        <div class="spinner-border spinner-border-sm me-2" role="status"></div>
        កំពុងទាញយកទិន្នន័យ...
      </div>
      <template v-else-if="users.length > 0">
        <div
          v-for="user in users" :key="user.id"
          class="d-flex align-items-center justify-content-between p-3 mb-2 rounded-3 shadow-sm"
          style="background:var(--bg-card);border:1px solid var(--border-color);"
        >
          <div class="d-flex align-items-center gap-3">
            <img :src="user.avatar" class="rounded-circle" width="42" height="42" style="object-fit:cover;" />
            <div>
              <div class="fw-semibold" style="color:var(--text-primary);">{{ user.fullName }}</div>
              <div style="font-size:12px;color:var(--text-secondary);">{{ user.email }}</div>
              <div class="mt-1">
                <span :class="user.role?.name === 'ADMIN' ? 'role-badge role-badge--admin' : 'role-badge role-badge--user'">
                  {{ user.role?.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex gap-1">
            <RouterLink class="btn text-primary btn-sm" :to="{ name: 'detailuser', params: { id: user.id } }">
              <i class="bi bi-eye-fill"></i>
            </RouterLink>
            <button class="btn text-danger btn-sm" @click="openDeleteModal(user)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </template>
      <div v-else class="text-center py-5" style="color:var(--text-secondary);">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        គ្មានទិន្នន័យ
      </div>
    </div>

    <!-- PAGINATION -->
    <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
      <Pagination v-model:currentPage="currentPage" :total-pages="totalPages" :sibling-count="1" />
    </div>

    <!-- DELETE MODAL -->
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
        <button class="btn btn-secondary" @click="closeDeleteModal" :disabled="deleteLoading">បោះបង់</button>
        <button class="btn btn-danger" @click="deleteUser" :disabled="deleteLoading">
          <span v-if="deleteLoading" class="spinner-border spinner-border-sm me-1"></span>
          លុប
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/api/api'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import Pagination from '@/components/ui/base/PaginAtion.vue'

const users           = ref([])
const loading         = ref(true)
const search          = ref('')
const searchFocused   = ref(false)
const showDeleteModal = ref(false)
const selectedUser    = ref(null)
const deleteLoading   = ref(false)

const totalUsers  = ref(0)
const perPage     = 10
const currentPage = ref(1)
const totalPages  = ref(1)

let searchTimer = null

// Fix 3: flag to suppress watch re-fetch when page is clamped internally
let skipWatch = false

const fetchUsers = async () => {
  try {
    loading.value = true
    const res = await api.get('users', {
      params: {
        _page:     currentPage.value,
        _per_page: perPage,
        search:    search.value,
        sortBy:    'id',
        sortDir:   'asc'
      }
    })

    const data = res.data?.data
    const meta = data?.meta

    users.value      = data?.items      ?? []
    totalUsers.value = meta?.totalItems ?? 0
    totalPages.value = meta?.totalPages ?? 1

    // Clamp without triggering the watch
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      skipWatch = true
      currentPage.value = totalPages.value
    }
  } catch (err) {
    console.error('fetchUsers error:', err)
  } finally {
    loading.value = false
  }
}

// Fix 4: watch drives pagination; skipWatch prevents double-fetch on internal clamp
watch(currentPage, () => {
  if (skipWatch) { skipWatch = false; return }
  fetchUsers()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const onSearchInput = () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    skipWatch = true          // resetting to page 1 shouldn't fire the watch
    currentPage.value = 1
    fetchUsers()
  }, 400)
}

const clearSearch = () => {
  search.value = ''
  skipWatch = true
  currentPage.value = 1
  fetchUsers()
}

const resetFilters = () => {
  search.value = ''
  skipWatch = true
  currentPage.value = 1
  fetchUsers()
}

const openDeleteModal  = (user) => { selectedUser.value = user; showDeleteModal.value = true }
const closeDeleteModal = ()     => { showDeleteModal.value = false; selectedUser.value = null }

// Fix 5: deleteUser had a double-fetch (explicit fetchUsers + watch on currentPage--).
// Now: if last item on page > 1 → decrement (watch handles fetch), otherwise fetch directly.
const deleteUser = async () => {
  try {
    deleteLoading.value = true
    await api.delete(`users/${selectedUser.value.id}`)
    closeDeleteModal()

    if (users.value.length === 1 && currentPage.value > 1) {
      currentPage.value--   // watch fires → fetchUsers()
    } else {
      await fetchUsers()    // same page, no page change, fetch manually
    }
  } catch (err) {
    console.error('deleteUser error:', err)
  } finally {
    deleteLoading.value = false
  }
}

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB') : ''

onMounted(fetchUsers)
</script>