<template>
  <div>
    <div class="font mb-4">

      <!-- HEADER -->
      <div class="header-card mb-4">
        <div>
          <h1>ប្រភេទ</h1>
          <p>គ្រប់គ្រងប្រភេទចំណូល និង ចំណាយរបស់អ្នក</p>
        </div>
        <button class="add-btn" @click="openModal()">
          <i class="bi bi-plus"></i> បន្ថែមប្រភេទ
        </button>
      </div>

      <!-- TOTAL CARDS -->
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-4">
          <TotalCard title="ប្រភេទសរុប" :value="totalCount">
            <template #icon>
              <div class="icon-wrap icon-wrap--neutral">
                <i class="bi bi-grid fs-4"></i>
              </div>
            </template>
          </TotalCard>
        </div>
        <div class="col-12 col-md-4">
          <TotalCard title="ចំណូល" :value="incomeCount">
            <template #icon>
              <div class="icon-wrap icon-wrap--income">
                <i class="bi bi-graph-up-arrow fs-4"></i>
              </div>
            </template>
          </TotalCard>
        </div>
        <div class="col-12 col-md-4">
          <TotalCard title="ចំណាយ" :value="expenseCount">
            <template #icon>
              <div class="icon-wrap icon-wrap--expense">
                <i class="bi bi-graph-down-arrow fs-4"></i>
              </div>
            </template>
          </TotalCard>
        </div>
      </div>

      <!-- FILTER BAR -->
      <div class="filter-card mb-4">
        <div class="filter-bar">
          <div class="filter-label">
            <i class="bi bi-funnel-fill"></i>
            <span>តម្រង</span>
          </div>
          <div class="filter-selects">
            <select class="filter-select" v-model="filterType" @change="onFilterChange">
              <option value="">ប្រភេទទាំងអស់</option>
              <option value="INCOME">ចំណូល</option>
              <option value="EXPENSE">ចំណាយ</option>
            </select>
            <select class="filter-select" v-model="filterSystem" @change="onFilterChange">
              <option value="">ទាំងអស់</option>
              <option value="true">System</option>
              <option value="false">Custom</option>
            </select>
          </div>
          <div class="search-box" :class="{ focused: searchFocused }">
            <i class="bi bi-search"></i>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="ស្វែងរក..."
              @focus="searchFocused = true"
              @blur="searchFocused = false"
              @input="onSearchInput"
            />
            <button v-if="searchQuery" class="clear-btn" @click="clearSearch">
              <i class="bi bi-x"></i>
            </button>
          </div>
          <button v-if="hasFilter" class="reset-btn" @click="resetFilters">
            <i class="bi bi-arrow-counterclockwise"></i>
            <span class="d-none d-sm-inline">លុបតម្រង</span>
          </button>
        </div>

        <div v-if="hasFilter" class="active-filters">
          <span v-if="filterType" class="filter-badge">
            {{ filterType === 'INCOME' ? 'ចំណូល' : 'ចំណាយ' }}
            <i class="bi bi-x" @click="filterType = ''; onFilterChange()"></i>
          </span>
          <span v-if="filterSystem !== ''" class="filter-badge">
            {{ filterSystem === 'true' ? 'System' : 'Custom' }}
            <i class="bi bi-x" @click="filterSystem = ''; onFilterChange()"></i>
          </span>
          <span v-if="searchQuery" class="filter-badge">
            "{{ searchQuery }}"
            <i class="bi bi-x" @click="clearSearch"></i>
          </span>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-muted mt-2">កំពុងទាញទិន្នន័យ...</p>
      </div>

      <!-- EMPTY -->
      <div v-else-if="pagedItems.length === 0" class="empty-state">
        <i class="bi bi-inbox fs-1 d-block mb-2"></i>
        <p class="mb-3">គ្មានប្រភេទ</p>
        <button class="btn btn-primary rounded-5 px-4" @click="openModal()">
          <i class="bi bi-plus"></i> បន្ថែមប្រភេទ
        </button>
      </div>

      <!-- DESKTOP TABLE -->
      <div v-else class="table-wrap d-none d-md-block">
        <table class="table mb-0 font">
          <thead class="table-secondary">
            <tr class="text-center">
              <th>#</th>
              <th>ឈ្មោះប្រភេទ</th>
              <th>លក្ខណៈ</th>
              <th>System</th>
              <th>កាលបរិច្ឆេទ</th>
              <th>សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center align-middle" v-for="(item, index) in pagedItems" :key="item.id">
              <td class="text-muted">{{ (currentPage - 1) * perPage + index + 1 }}</td>
              <td class="fw-semibold">{{ item.name }}</td>
              <td>
                <span :class="item.type === 'INCOME' ? 'type-badge type-badge--income' : 'type-badge type-badge--expense'">
                  <i :class="item.type === 'INCOME' ? 'bi bi-graph-up-arrow' : 'bi bi-graph-down-arrow'"></i>
                  {{ item.type === 'INCOME' ? 'ចំណូល' : 'ចំណាយ' }}
                </span>
              </td>
              <td>
                <span v-if="item.isSystem" class="type-badge type-badge--system">
                  <i class="bi bi-shield-fill"></i> System
                </span>
                <span v-else class="type-badge type-badge--custom">Custom</span>
              </td>
              <td class="text-muted">{{ formatDate(item.createdAt) }}</td>
              <td>
                <button class="btn btn-sm action-btn-view"   @click="openDetailModal(item)"><i class="bi bi-eye"></i></button>
                <button class="btn btn-sm action-btn-edit"   @click="openModal(item)"><i class="bi bi-pencil-square"></i></button>
                <button
                  class="btn btn-sm action-btn-delete"
                  @click="confirmDelete(item)"
                  :disabled="item.isSystem"
                  :title="item.isSystem ? 'មិនអាចលុប System' : 'លុប'"
                ><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- MOBILE CARDS -->
      <div v-if="!loading && pagedItems.length > 0" class="d-md-none">
        <div v-for="item in pagedItems" :key="item.id" class="mobile-card">
          <div class="mobile-card__left">
            <div :class="['mobile-icon', item.type === 'INCOME' ? 'icon--income' : 'icon--expense']">
              <i :class="item.type === 'INCOME' ? 'bi bi-graph-up-arrow' : 'bi bi-graph-down-arrow'"></i>
            </div>
            <div>
              <div class="mobile-card__name">{{ item.name }}</div>
              <div class="mobile-card__meta">
                <span :class="item.type === 'INCOME' ? 'text-success' : 'text-danger'" style="font-size:12px">
                  {{ item.type === 'INCOME' ? 'ចំណូល' : 'ចំណាយ' }}
                </span>
                <span v-if="item.isSystem" class="ms-2 text-primary" style="font-size:11px">
                  <i class="bi bi-shield-fill"></i> System
                </span>
              </div>
              <div class="mobile-card__date">{{ formatDate(item.createdAt) }}</div>
            </div>
          </div>
          <div class="mobile-card__actions">
            <button class="btn btn-sm action-btn-view   p-1" @click="openDetailModal(item)"><i class="bi bi-eye"></i></button>
            <button class="btn btn-sm action-btn-edit   p-1" @click="openModal(item)"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-sm action-btn-delete p-1" @click="confirmDelete(item)" :disabled="item.isSystem"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>

      <!-- PAGINATION — client-side, driven by filteredItems -->
      <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
        <Pagination v-model:currentPage="currentPage" :total-pages="totalPages" :sibling-count="1" />
      </div>

    </div>

    <!-- ══ CREATE / EDIT MODAL ══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showModal" class="swal-overlay" @click.self="closeModal">
          <div class="swal-box">
            <div class="swal-header">
              <div class="swal-header__icon" :class="isEditing ? 'icon-edit' : 'icon-create'">
                <i :class="isEditing ? 'bi bi-pencil-square' : 'bi bi-plus-circle-fill'"></i>
              </div>
              <div>
                <h3 class="swal-title">{{ isEditing ? 'កែប្រែប្រភេទ' : 'បន្ថែមប្រភេទថ្មី' }}</h3>
                <p class="swal-desc">{{ isEditing ? 'កែប្រែឈ្មោះប្រភេទ' : 'បង្កើតប្រភេទចំណូល ឬ ចំណាយ' }}</p>
              </div>
              <button class="swal-close" @click="closeModal"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="swal-body">
              <div v-if="formError" class="form-alert">
                <i class="bi bi-exclamation-circle-fill"></i> {{ formError }}
              </div>
              <!-- Name field — always shown -->
              <div class="field-group">
                <label class="field-label">ឈ្មោះប្រភេទ <span class="required">*</span></label>
                <div class="input-shell" :class="{ 'is-invalid': errors.name }">
                  <i class="bi bi-tag-fill field-icon"></i>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="ឧទាហរណ៍: Bills, អាហារ, ការដឹកជញ្ជូន..."
                    maxlength="50"
                    @input="delete errors.name; formError = ''"
                    @keyup.enter="saveCategory"
                  />
                </div>
                <div v-if="errors.name" class="field-error">
                  <i class="bi bi-exclamation-circle"></i> {{ errors.name }}
                </div>
                <span class="char-count">{{ form.name.length }}/50</span>
              </div>
              <!-- Type toggle — only for CREATE; hidden when editing -->
              <div v-if="!isEditing" class="field-group mb-0">
                <label class="field-label">ប្រភេទ <span class="required">*</span></label>
                <div class="type-toggle">
                  <button
                    :class="['type-btn type-btn--income', { active: form.type === 'INCOME' }]"
                    @click="form.type = 'INCOME'; delete errors.type"
                    type="button"
                  ><i class="bi bi-graph-up-arrow"></i> ចំណូល</button>
                  <button
                    :class="['type-btn type-btn--expense', { active: form.type === 'EXPENSE' }]"
                    @click="form.type = 'EXPENSE'; delete errors.type"
                    type="button"
                  ><i class="bi bi-graph-down-arrow"></i> ចំណាយ</button>
                </div>
                <div v-if="errors.type" class="field-error mt-1">
                  <i class="bi bi-exclamation-circle"></i> {{ errors.type }}
                </div>
              </div>
              <!-- isSystem toggle removed from form per requirements -->
            </div>
            <div class="swal-footer">
              <button class="swal-btn swal-btn--cancel"  @click="closeModal"   :disabled="saveLoading">បោះបង់</button>
              <button class="swal-btn swal-btn--confirm" @click="saveCategory" :disabled="saveLoading">
                <span v-if="saveLoading" class="btn-spinner"></span>
                <i v-else :class="isEditing ? 'bi bi-check-lg' : 'bi bi-plus-lg'"></i>
                {{ saveLoading ? 'កំពុងរក្សាទុក...' : isEditing ? 'រក្សាទុក' : 'បង្កើត' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══ DETAIL MODAL ══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showDetailModal" class="swal-overlay" @click.self="closeDetailModal">
          <div class="swal-box swal-box--detail">
            <div class="swal-header">
              <div class="swal-header__icon icon-detail"><i class="bi bi-eye-fill"></i></div>
              <div>
                <h3 class="swal-title">លម្អិតប្រភេទ</h3>
                <p class="swal-desc">ព័ត៌មានលម្អិតនៃប្រភេទដែលបានជ្រើស</p>
              </div>
              <button class="swal-close" @click="closeDetailModal"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="swal-body" v-if="detailLoading">
              <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="text-muted mt-2 mb-0" style="font-size:13px">កំពុងទាញទិន្នន័យ...</p>
              </div>
            </div>
            <div class="swal-body" v-else-if="detailItem">
              <div class="detail-banner" :class="detailItem.type === 'INCOME' ? 'banner--income' : 'banner--expense'">
                <div class="detail-banner__icon">
                  <i :class="detailItem.type === 'INCOME' ? 'bi bi-graph-up-arrow' : 'bi bi-graph-down-arrow'"></i>
                </div>
                <div>
                  <div class="detail-banner__name">{{ detailItem.name }}</div>
                  <div class="detail-banner__type">{{ detailItem.type === 'INCOME' ? 'ប្រភេទចំណូល' : 'ប្រភេទចំណាយ' }}</div>
                </div>
              </div>
              <div class="detail-rows">
                <div class="detail-row">
                  <span class="detail-row__label"><i class="bi bi-fingerprint"></i> ID</span>
                  <span class="detail-row__value detail-row__value--id">{{ detailItem.id }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-row__label"><i class="bi bi-tag-fill"></i> ឈ្មោះ</span>
                  <span class="detail-row__value fw-semibold">{{ detailItem.name }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-row__label"><i class="bi bi-bar-chart-fill"></i> លក្ខណៈ</span>
                  <span :class="detailItem.type === 'INCOME' ? 'type-badge type-badge--income' : 'type-badge type-badge--expense'">
                    <i :class="detailItem.type === 'INCOME' ? 'bi bi-graph-up-arrow' : 'bi bi-graph-down-arrow'"></i>
                    {{ detailItem.type === 'INCOME' ? 'ចំណូល' : 'ចំណាយ' }}
                  </span>
                </div>
                <div class="detail-row">
                  <span class="detail-row__label"><i class="bi bi-shield-fill"></i> System</span>
                  <span v-if="detailItem.isSystem" class="type-badge type-badge--system">
                    <i class="bi bi-shield-fill"></i> System
                  </span>
                  <span v-else class="type-badge type-badge--custom">Custom</span>
                </div>
                <div class="detail-row">
                  <span class="detail-row__label"><i class="bi bi-calendar3"></i> បង្កើតនៅ</span>
                  <span class="detail-row__value">{{ formatDate(detailItem.createdAt) }}</span>
                </div>
                <div class="detail-row" v-if="detailItem.updatedAt">
                  <span class="detail-row__label"><i class="bi bi-calendar-check"></i> កែប្រែចុងក្រោយ</span>
                  <span class="detail-row__value">{{ formatDate(detailItem.updatedAt) }}</span>
                </div>
              </div>
            </div>
            <div class="swal-footer">
              <button class="swal-btn swal-btn--cancel" @click="closeDetailModal">បិទ</button>
              <!-- Fix: was passing ref object; now passes .value snapshot -->
              <button class="swal-btn swal-btn--confirm" @click="editFromDetail">
                <i class="bi bi-pencil-square"></i> កែប្រែ
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══ DELETE MODAL ══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showDeleteModal" class="swal-overlay" @click.self="closeDeleteModal">
          <div class="swal-box swal-box--delete">
            <div class="swal-header swal-header--center">
              <div class="delete-icon-wrap"><i class="bi bi-trash3-fill"></i></div>
            </div>
            <div class="swal-body swal-body--center">
              <h3 class="swal-title">លុបប្រភេទ?</h3>
              <p class="delete-desc">
                តើអ្នកពិតជាចង់លុប
                <strong class="text-danger">{{ selectedItem?.name }}</strong> មែនទេ?
              </p>
              <div class="delete-warning">
                <i class="bi bi-exclamation-triangle-fill"></i>
                ការលុបនេះ នឹងប៉ះពាល់ដល់ប្រតិបត្តិការដែលភ្ជាប់នឹងប្រភេទនេះ ហើយមិនអាចដកវិញបាន
              </div>
            </div>
            <div class="swal-footer">
              <button class="swal-btn swal-btn--cancel" @click="closeDeleteModal" :disabled="deleteLoading">បោះបង់</button>
              <button class="swal-btn swal-btn--delete" @click="doDelete"         :disabled="deleteLoading">
                <span v-if="deleteLoading" class="btn-spinner btn-spinner--white"></span>
                <i v-else class="bi bi-trash3-fill"></i>
                {{ deleteLoading ? 'កំពុងលុប...' : 'លុប' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══ TOAST ══ -->
    <Teleport to="body">
      <Transition name="toast-slide">
        <div v-if="toast.show" class="toast-wrap" :class="`toast-wrap--${toast.type}`">
          <i :class="toast.type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
          <span>{{ toast.message }}</span>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import TotalCard  from '@/components/ui/base/Totalcard.vue'
import Pagination from '@/components/ui/base/PaginAtion.vue'
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()

const loading       = ref(false)
const saveLoading   = ref(false)
const deleteLoading = ref(false)
const detailLoading = ref(false)

const errors    = reactive({})
const formError = ref('')

// ── TOAST ──────────────────────────────────────────
const toast = reactive({ show: false, type: 'success', message: '' })
let toastTimer = null

function showToast(message, type = 'success') {
  clearTimeout(toastTimer)
  toast.message = message
  toast.type    = type
  toast.show    = true
  toastTimer    = setTimeout(() => { toast.show = false }, 3000)
}

// ── DATA ───────────────────────────────────────────
// allCategories reflects EVERYTHING fetched — used for counts + client-side filter
const allCategories = computed(() =>
  Array.isArray(categoryStore.categories) ? categoryStore.categories : []
)

// Fix 3: counts come from allCategories (all items), not just the current page
const totalCount   = computed(() => categoryStore.meta?.totalItems ?? allCategories.value.length)
const incomeCount  = computed(() => allCategories.value.filter(c => c.type === 'INCOME').length)
const expenseCount = computed(() => allCategories.value.filter(c => c.type === 'EXPENSE').length)

// ── FILTERS ────────────────────────────────────────
const filterType    = ref('')
const filterSystem  = ref('')
const searchQuery   = ref('')
const searchFocused = ref(false)
let   searchTimer   = null

const hasFilter = computed(() =>
  filterType.value || filterSystem.value !== '' || searchQuery.value
)

const filteredItems = computed(() =>
  allCategories.value.filter(item => {
    const matchType   = !filterType.value   || item.type === filterType.value
    const matchSystem = filterSystem.value === '' || String(item.isSystem) === filterSystem.value
    const matchSearch = !searchQuery.value  || item.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchType && matchSystem && matchSearch
  })
)

// ── CLIENT-SIDE PAGINATION ─────────────────────────
// Fix 1 & 2: pagination is purely client-side over filteredItems.
// currentPage was using categoryStore.params?._page which may be undefined.
// watch was calling goToPage but never fetchCategories → pages didn't load.
const perPage     = 10
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / perPage)))

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredItems.value.slice(start, start + perPage)
})

// Reset to page 1 whenever filters change
watch(filteredItems, () => { currentPage.value = 1 })

function onFilterChange() { currentPage.value = 1 }

function onSearchInput() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { currentPage.value = 1 }, 300)
}

function clearSearch() {
  searchQuery.value = ''
  currentPage.value = 1
}

function resetFilters() {
  filterType.value   = ''
  filterSystem.value = ''
  searchQuery.value  = ''
  currentPage.value  = 1
}

// ── MODALS STATE ───────────────────────────────────
const showModal       = ref(false)
const isEditing       = ref(false)
const showDeleteModal = ref(false)
const showDetailModal = ref(false)
const selectedItem    = ref(null)
const detailItem      = ref(null)

// Fix 4: type defaults to '' so user must actively choose; not pre-selected
// Fix 5: isSystem removed from form entirely
const form = reactive({ name: '', type: '', isSystem: false })

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  formError.value = ''
  if (!form.name.trim())                    errors.name = 'សូមបញ្ចូលឈ្មោះប្រភេទ'
  if (!isEditing.value && !form.type)       errors.type = 'សូមជ្រើសប្រភេទ'
  return Object.keys(errors).length === 0
}

function openModal(item = null) {
  Object.keys(errors).forEach(k => delete errors[k])
  formError.value = ''
  showModal.value = true
  if (item) {
    isEditing.value    = true
    selectedItem.value = item
    form.name          = item.name || ''
    form.type          = item.type || ''
    form.isSystem      = item.isSystem || false
  } else {
    isEditing.value    = false
    selectedItem.value = null
    form.name          = ''
    form.type          = ''   // Fix 4: no default — user must choose
    form.isSystem      = false
  }
}

function closeModal() { showModal.value = false }

async function openDetailModal(item) {
  showDetailModal.value = true
  detailItem.value      = null
  detailLoading.value   = true
  try {
    const result     = await categoryStore.getCategoryById(item.id)
    detailItem.value = result ?? item
  } catch {
    detailItem.value = item
  } finally {
    detailLoading.value = false
  }
}

function closeDetailModal() {
  showDetailModal.value = false
  detailItem.value      = null
}

// Fix 7: was `openModal(detailItem)` — passing a ref, not the value
function editFromDetail() {
  const item = detailItem.value
  closeDetailModal()
  openModal(item)
}

async function saveCategory() {
  if (!validate()) return
  saveLoading.value = true
  try {
    const result = isEditing.value && selectedItem.value?.id
      ? await categoryStore.updateCategory(selectedItem.value.id, { name: form.name.trim() })
      : await categoryStore.createCategory({ name: form.name.trim(), type: form.type })
      // Fix 5: isSystem not sent — backend decides, not the form

    if (result?.success !== false) {
      closeModal()
      await categoryStore.fetchCategories()
      showToast(isEditing.value ? 'បានកែប្រែប្រភេទដោយជោគជ័យ!' : 'បានបង្កើតប្រភេទថ្មីដោយជោគជ័យ!')
    } else {
      formError.value = result?.message || 'មានបញ្ហា សូមព្យាយាមម្តងទៀត'
    }
  } catch {
    formError.value = 'មានបញ្ហាក្នុងការរក្សាទុក'
  } finally {
    saveLoading.value = false
  }
}

function confirmDelete(item) {
  if (item.isSystem) return
  selectedItem.value    = item
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  selectedItem.value    = null
}

// Fix 6: toast now only fires after fetch succeeds; error path is separate
async function doDelete() {
  if (!selectedItem.value?.id) return
  deleteLoading.value = true
  try {
    const result = await categoryStore.deleteCategory(selectedItem.value.id)
    if (result?.success === false) {
      showToast(result?.message || 'លុបបានបរាជ័យ', 'error')
      return
    }
    closeDeleteModal()
    await categoryStore.fetchCategories()
    showToast('បានលុបប្រភេទដោយជោគជ័យ!')
  } catch {
    showToast('មានបញ្ហាក្នុងការលុប', 'error')
  } finally {
    deleteLoading.value = false
  }
}

// ── HELPERS ────────────────────────────────────────
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB') : ''

// ── INIT ───────────────────────────────────────────
onMounted(async () => {
  loading.value = true
  await categoryStore.fetchCategories()
  loading.value = false
})
</script>

<style scoped>
.font { font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif !important; }
.fw-500 { font-weight: 500; }

/* ── HEADER ───────────────────────────────────────── */
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

.header-card h1 { font-size: 20px; font-weight: 700; margin: 0 0 2px; color: var(--text-white); }
.header-card p  { font-size: 12px; margin: 0; color: rgba(255,255,255,0.65); }

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
  cursor: pointer;
  transition: var(--transition);
}

.add-btn:hover { background: rgba(255,255,255,0.25); }

/* ── ICONS ────────────────────────────────────────── */
.icon-wrap { padding: 8px 14px; border-radius: 10px; color: var(--text-white); }
.icon-wrap--neutral { background: var(--text-secondary); }
.icon-wrap--income  { background: var(--color-success);  }
.icon-wrap--expense { background: var(--color-danger);   }

/* ── ACTION BUTTONS ───────────────────────────────── */
.action-btn-view   { color: #0891b2; }
.action-btn-edit   { color: var(--text-primary); }
.action-btn-delete { color: var(--color-danger); }
.btn:disabled { opacity: 0.35; cursor: not-allowed; pointer-events: auto; }

/* ── FILTER CARD ──────────────────────────────────── */
.filter-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  padding: 14px 18px;
}

.filter-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }

.filter-label { display: flex; align-items: center; gap: 6px; font-size: 15px; font-weight: 600; color: var(--text-primary); white-space: nowrap; }
.filter-label i { color: var(--color-primary); font-size: 16px; }

.filter-selects { display: flex; gap: 8px; flex-wrap: wrap; }

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
  transition: border-color 0.15s;
  min-width: 130px;
}

.filter-select:focus,
.filter-select:hover { border-color: var(--color-primary); background: var(--bg-card); }

.search-box {
  display: flex; align-items: center; gap: 8px;
  flex: 1; min-width: 200px; height: 40px;
  border: 1.5px solid var(--border-color);
  border-radius: 50px;
  padding: 0 14px;
  background: var(--bg-input);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-box.focused {
  border-color: var(--color-primary);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent);
}

.search-box i { color: var(--text-secondary); font-size: 14px; flex-shrink: 0; }

.search-box input {
  border: none; outline: none; background: transparent;
  font-size: 14px; width: 100%;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  color: var(--text-primary);
}

.search-box input::placeholder { color: var(--border-color); }

.clear-btn { border: none; background: none; color: var(--text-secondary); cursor: pointer; padding: 0; font-size: 16px; line-height: 1; flex-shrink: 0; }
.clear-btn:hover { color: var(--text-primary); }

.reset-btn {
  display: flex; align-items: center; gap: 6px;
  border: 1.5px solid var(--border-color);
  border-radius: 30px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 13px; padding: 7px 14px;
  cursor: pointer;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  transition: var(--transition);
  white-space: nowrap;
}

.reset-btn:hover { border-color: var(--color-danger); color: var(--color-danger); background: var(--color-danger-light); }

.active-filters { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-color); }

.filter-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--bg-input);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 20px; font-size: 12px; padding: 3px 10px;
}

.filter-badge i { cursor: pointer; font-size: 13px; opacity: 0.6; }
.filter-badge i:hover { opacity: 1; }

/* ── EMPTY ────────────────────────────────────────── */
.empty-state { text-align: center; padding: 60px 20px; color: var(--text-secondary); }

/* ── TABLE ────────────────────────────────────────── */
.table-wrap {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
}

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

.table tbody tr:hover > * { background-color: var(--bg-input); }

/* ── TYPE / SYSTEM BADGES (CSS-variable based) ─────── */
.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 12px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
}

.type-badge--income {
  background: var(--color-success-light);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.type-badge--expense {
  background: var(--color-danger-light);
  color: var(--color-danger);
  border: 1px solid var(--color-danger);
}

.type-badge--system {
  background: rgba(26, 98, 212, 0.10);
  color: var(--color-primary);
  border: 1px solid rgba(26, 98, 212, 0.25);
}

.type-badge--custom {
  background: var(--bg-input);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

/* ── MOBILE CARD ──────────────────────────────────── */
.mobile-card {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 12px 14px; margin-bottom: 10px;
  box-shadow: var(--shadow);
}

.mobile-card__left { display: flex; align-items: center; gap: 12px; }

.mobile-icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; font-size: 16px; flex-shrink: 0; }
.icon--income  { background: var(--color-success-light); color: var(--color-success); }
.icon--expense { background: var(--color-danger-light);  color: var(--color-danger);  }

.mobile-card__name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.mobile-card__meta { font-size: 12px; margin-top: 2px; }
.mobile-card__date { font-size: 11px; color: var(--text-secondary); opacity: 0.6; margin-top: 2px; }
.mobile-card__actions { display: flex; gap: 2px; }

/* ══ MODAL OVERLAY ═══════════════════════════════════ */
.swal-overlay {
  position: fixed; inset: 0;
  background: rgba(4, 44, 131, 0.22);
  backdrop-filter: blur(5px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1050; padding: 16px;
}

.swal-box {
  background: var(--bg-card);
  border-radius: 24px;
  width: 100%; max-width: 460px;
  box-shadow: var(--shadow);
  overflow: hidden;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  border: 1px solid var(--border-color);
}

.swal-box--delete { max-width: 400px; }
.swal-box--detail { max-width: 480px; }

.swal-header {
  display: flex; align-items: center; gap: 14px;
  padding: 22px 24px 16px;
  border-bottom: 1px solid var(--border-color);
  position: relative;
}

.swal-header--center { flex-direction: column; align-items: center; border-bottom: none; padding-bottom: 0; }

.swal-header__icon {
  width: 48px; height: 48px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}

.icon-create { background: var(--bg-input); color: var(--color-primary); }
.icon-edit   { background: var(--color-danger-light); color: var(--color-danger); }
.icon-detail { background: var(--color-success-light); color: var(--color-success); }

.swal-title { margin: 0 0 2px; font-size: 17px; font-weight: 800; color: var(--text-primary); }
.swal-desc  { margin: 0; font-size: 12px; color: var(--text-secondary); }

.swal-close {
  position: absolute; top: 18px; right: 18px;
  width: 32px; height: 32px; border-radius: 8px;
  border: none; background: var(--bg-input); color: var(--text-secondary);
  font-size: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition);
}

.swal-close:hover { background: var(--color-danger); color: var(--text-white); }

.delete-icon-wrap {
  width: 72px; height: 72px; border-radius: 50%;
  background: var(--color-danger-light);
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; color: var(--color-danger);
  margin-bottom: 8px;
}

.swal-body         { padding: 20px 24px; }
.swal-body--center { text-align: center; }

.delete-desc { font-size: 15px; color: var(--text-primary); margin: 8px 0 14px; line-height: 1.6; }

.delete-warning {
  display: flex; align-items: flex-start; gap: 8px;
  background: var(--color-danger-light);
  border: 1px solid var(--color-danger);
  border-radius: 10px;
  color: var(--color-danger);
  font-size: 12px; padding: 10px 12px;
  text-align: left; line-height: 1.5;
  opacity: 0.85;
}

.delete-warning i { flex-shrink: 0; margin-top: 1px; }

/* ── DETAIL ───────────────────────────────────────── */
.detail-banner {
  display: flex; align-items: center; gap: 14px;
  border-radius: 14px; padding: 16px 18px; margin-bottom: 18px;
}

.banner--income  { background: var(--color-success-light); border: 1px solid var(--color-success); }
.banner--expense { background: var(--color-danger-light);  border: 1px solid var(--color-danger);  }

.detail-banner__icon {
  width: 50px; height: 50px; border-radius: 14px;
  background: rgba(255,255,255,0.5);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}

.banner--income .detail-banner__icon  { color: var(--color-success); }
.banner--expense .detail-banner__icon { color: var(--color-danger);  }

.detail-banner__name { font-size: 18px; font-weight: 800; color: var(--text-primary); line-height: 1.3; }
.detail-banner__type { font-size: 12px; color: var(--text-secondary); margin-top: 2px; }

.detail-rows { display: flex; flex-direction: column; border: 1px solid var(--border-color); border-radius: 14px; overflow: hidden; }

.detail-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 13.5px;
}

.detail-row:last-child { border-bottom: none; }
.detail-row:nth-child(even) { background: var(--bg-body); }

.detail-row__label { display: flex; align-items: center; gap: 7px; color: var(--text-secondary); font-size: 13px; white-space: nowrap; flex-shrink: 0; }
.detail-row__label i { color: var(--text-secondary); font-size: 13px; }
.detail-row__value { color: var(--text-primary); text-align: right; }

.detail-row__value--id {
  font-family: 'Courier New', monospace;
  font-size: 11px; color: var(--text-secondary);
  background: var(--bg-input);
  padding: 2px 8px; border-radius: 6px;
  word-break: break-all;
}

/* ── FORM FIELDS ──────────────────────────────────── */
.form-alert {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; border-radius: 10px;
  background: var(--color-danger-light);
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  font-size: 13px; margin-bottom: 16px;
}

.field-group    { margin-bottom: 18px; }
.field-group.mb-0 { margin-bottom: 0; }

.field-label { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: var(--text-primary); }
.required { color: var(--color-danger); }

.input-shell {
  display: flex; align-items: center; height: 46px;
  border: 1.5px solid var(--border-color);
  border-radius: 50px;
  padding: 0 16px;
  background: var(--bg-input);
  transition: var(--transition);
}

.input-shell:focus-within {
  border-color: var(--color-primary);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.input-shell.is-invalid { border-color: var(--color-danger); background: var(--color-danger-light); }

.field-icon { color: var(--text-secondary); font-size: 14px; flex-shrink: 0; margin-right: 8px; }

.input-shell input {
  flex: 1; height: 100%; border: 0; outline: 0;
  background: transparent; font-size: 14px;
  color: var(--text-primary);
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
}

.input-shell input::placeholder { color: var(--border-color); }
.field-error { font-size: 12px; color: var(--color-danger); margin-top: 4px; }
.char-count  { display: block; text-align: right; font-size: 11px; color: var(--text-secondary); opacity: 0.6; margin-top: 3px; }

.type-toggle { display: flex; gap: 10px; }

.type-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  height: 46px; border-radius: 12px;
  border: 2px solid var(--border-color);
  background: var(--bg-input); color: var(--text-secondary);
  font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  transition: var(--transition);
}

.type-btn:hover { background: var(--bg-body); }
.type-btn--income.active  { border-color: var(--color-success); background: var(--color-success-light); color: var(--color-success); }
.type-btn--expense.active { border-color: var(--color-danger);  background: var(--color-danger-light);  color: var(--color-danger);  }

/* ── FOOTER ───────────────────────────────────────── */
.swal-footer {
  display: flex; gap: 10px;
  padding: 16px 24px 22px;
  border-top: 1px solid var(--border-color);
}

.swal-btn {
  flex: 1; height: 46px; border-radius: 50px; border: none;
  font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  transition: var(--transition);
}

.swal-btn:disabled { opacity: 0.6; cursor: wait; }

.swal-btn--cancel { background: var(--bg-input); color: var(--text-secondary); }
.swal-btn--cancel:hover:not(:disabled) { background: var(--bg-body); color: var(--text-primary); }

.swal-btn--confirm {
  flex: 2;
  background: var(--color-primary);
  color: var(--text-white);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

.swal-btn--confirm:hover:not(:disabled) { background: var(--color-primary-hover); transform: translateY(-1px); }

.swal-btn--delete {
  flex: 2;
  background: var(--color-danger);
  color: var(--text-white);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--color-danger) 30%, transparent);
}

.swal-btn--delete:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }

/* ── SPINNER ──────────────────────────────────────── */
.btn-spinner {
  width: 16px; height: 16px;
  border: 2px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

.btn-spinner--white {
  border-color: rgba(255,255,255,0.35);
  border-top-color: var(--text-white);
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── TRANSITIONS ──────────────────────────────────── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to       { opacity: 0; }
.modal-fade-enter-from .swal-box,
.modal-fade-leave-to .swal-box                     { transform: scale(0.94) translateY(12px); }
.modal-fade-enter-active .swal-box,
.modal-fade-leave-active .swal-box                 { transition: transform 0.25s ease; }

/* ── TOAST ────────────────────────────────────────── */
.toast-wrap {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 10px;
  padding: 12px 22px; border-radius: 50px;
  font-size: 14px; font-weight: 600;
  font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif;
  box-shadow: var(--shadow);
  z-index: 2000; white-space: nowrap;
}

.toast-wrap--success { background: var(--text-primary); color: var(--bg-card); }
.toast-wrap--error   { background: var(--color-danger);  color: var(--text-white); }

.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.3s ease; }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }
</style>