<template>
  <header class="navbar mx-2">
    <div class="navbar-left">
      <button class="icon-button me-2" @click="emit('toggle-sidebar')" type="button" aria-label="Toggle Sidebar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <div class="brand-wrap">
        <img src="/src/assets/img/image.png" alt="ExpenseTracker" class="brand-icon" />
      </div>
    </div>

    <div class="navbar-right">

      <!-- Theme toggle -->
      <button class="icon-button" type="button"
        :aria-label="isDark ? 'ប្តូរទៅរបៀបភ្លឺ' : 'ប្តូរទៅរបៀបងងឹត'"
        @click="toggleTheme">
        <Transition name="theme-icon" mode="out-in">
          <svg v-if="!isDark" key="moon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-else key="sun" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" />
            <path
              d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </Transition>
      </button>

      <!-- Notification bell -->
      <div ref="notifTriggerRef" style="position:relative">
        <button class="icon-button" type="button" aria-label="Notifications" @click.stop="toggleNotif">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span v-if="unreadUserCount > 0" class="notif-badge">{{ unreadUserCount > 9 ? '9+' : unreadUserCount }}</span>
        </button>
      </div>

      <!-- Profile dropdown trigger -->
      <div v-if="!isMobile" ref="profileTriggerRef" style="position:relative">
        <button class="profile-btn" type="button" @click.stop="toggleProfile" aria-label="Profile menu">
          <div class="avatar">
            <img v-if="userStore.avatarUrl" :src="userStore.avatarUrl" :alt="userStore.displayName" class="avatar-img" />
            <span v-else>{{ avatarInitials }}</span>
          </div>
          <span class="profile-name">{{ userStore.displayName || 'គណនី' }}</span>
          <svg class="chevron" :class="{ open: profileOpen }" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  </header>

  <!-- ── New-user toast popup ── -->
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-stack">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="toast-card"
        @click="dismissToast(t.id)"
      >
        <div class="toast-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="toast-body">
          <p class="toast-title">អ្នកប្រើប្រាស់ថ្មី!</p>
          <p class="toast-msg">{{ t.name }} បានចូលរួម</p>
        </div>
        <button class="toast-close" @click.stop="dismissToast(t.id)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="toast-progress" :style="{ animationDuration: t.duration + 'ms' }"></div>
      </div>
    </TransitionGroup>
  </Teleport>

  <!-- Notification panel -->
  <Teleport to="body">
    <Transition name="panel">
      <div v-if="notifOpen" ref="notifMenuRef" class="notif-panel" :style="notifStyle" @click.stop>

        <div class="notif-head">
          <div class="notif-head-left">
            <span class="notif-title">ការជូនដំណឹង</span>
            <span v-if="unreadUserCount > 0" class="notif-count-badge">{{ unreadUserCount }}</span>
          </div>
          <div v-if="userAlerts.length > 0" class="notif-head-actions">
            <button class="btn-mark-all" @click="markAllRead">សម្គាល់ទាំងអស់</button>
            <button class="btn-clear-all" @click="clearAllNotifs" title="លុបទាំងអស់">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Users list -->
        <div v-if="userAlerts.length === 0" class="notif-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style="opacity:.25">
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>មិនមានអ្នកប្រើប្រាស់ថ្មី</span>
        </div>

        <div v-else class="notif-list">
          <div
            v-for="u in userAlerts"
            :key="u.id"
            class="notif-item"
            :class="{ unread: !u.read }"
            @click.stop="goToUser(u)"
            
          >
            <div class="notif-icon notif-icon--user">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="notif-body">
              <p class="notif-msg">{{ u.name }} បានចូលរួម</p>
              <p class="notif-time">{{ u.timeAgo }}</p>
            </div>
            <span v-if="!u.read" class="unread-dot"></span>
          </div>
        </div>

      </div>
    </Transition>
  </Teleport>

  <!-- Profile dropdown panel -->
  <Teleport to="body">
    <Transition name="panel">
      <div v-if="profileOpen && !isMobile" ref="profileMenuRef"
        class="profile-panel" :style="profileStyle" @click.stop>

        <div class="profile-head">
          <div class="avatar avatar--lg">
            <img v-if="userStore.avatarUrl" :src="userStore.avatarUrl" :alt="userStore.displayName" class="avatar-img" />
            <span v-else>{{ avatarInitials }}</span>
          </div>
          <div class="profile-head-info">
            <p class="profile-head-name">{{ userStore.displayName || '—' }}</p>
            <p class="profile-head-email">{{ userStore.email || '—' }}</p>
          </div>
        </div>

        <div class="profile-list">
          <router-link to="/dashboard/profile" class="profile-item" @click="profileOpen = false">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            គណនីរបស់ខ្ញុំ
          </router-link>
          <div class="profile-sep"></div>
          <button class="profile-item profile-item--danger" type="button" @click="handleLogout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            ចាកចេញ
          </button>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import api from '@/api/api'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/Userstore'

defineProps({
  isMobile: { type: Boolean, default: false }
})

const emit      = defineEmits(['toggle-sidebar'])
const router    = useRouter()
const userStore = useUserStore()

// ── Mobile ─────────────────────────────────────────────────────────────────
const MOBILE_BREAKPOINT = 768
const isMobile = ref(window.innerWidth < MOBILE_BREAKPOINT)

// ── Theme ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'app-theme'
const isDark = ref(
  localStorage.getItem(STORAGE_KEY) !== null
    ? localStorage.getItem(STORAGE_KEY) === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches
)

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
}
applyTheme(isDark.value)

function toggleTheme(event) {
  isDark.value = !isDark.value

  const x    = event?.clientX ?? window.innerWidth - 32
  const y    = event?.clientY ?? 32
  const root = document.documentElement

  root.style.setProperty('--ripple-x', x + 'px')
  root.style.setProperty('--ripple-y', y + 'px')
  root.setAttribute('data-theme-to', isDark.value ? 'dark' : 'light')
  root.classList.add('theme-transitioning')

  const toggle = () => {
    applyTheme(isDark.value)
    root.removeAttribute('data-theme-to')
  }

  if (!document.startViewTransition) {
    toggle()
    setTimeout(() => root.classList.remove('theme-transitioning'), 600)
    return
  }

  const t = document.startViewTransition(toggle)
  t.finished.finally(() => root.classList.remove('theme-transitioning'))
}

// ── Avatar ─────────────────────────────────────────────────────────────────
const avatarInitials = computed(() =>
  userStore.displayName.trim().charAt(0).toUpperCase() || 'U'
)

// ── Toasts (new user popup) ────────────────────────────────────────────────
const TOAST_DURATION = 5000
const toasts = ref([])

function showToast(name) {
  const id = Date.now() + Math.random()
  toasts.value.push({ id, name, duration: TOAST_DURATION })
  setTimeout(() => dismissToast(id), TOAST_DURATION)
}

function dismissToast(id) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

// ── User registration alerts ───────────────────────────────────────────────
const USER_NOTIF_KEY  = 'notif-users-read'
const userAlerts      = ref([])
const userReadSet     = ref(new Set(JSON.parse(localStorage.getItem(USER_NOTIF_KEY) || '[]')))
const unreadUserCount = computed(() => userAlerts.value.filter(u => !u.read).length)

function persistUserRead() {
  localStorage.setItem(USER_NOTIF_KEY, JSON.stringify([...userReadSet.value]))
}

function markUserRead(id) {
  userReadSet.value.add(id)
  persistUserRead()
  const u = userAlerts.value.find(u => u.id === id)
  if (u) u.read = true
}

function markAllRead() {
  userAlerts.value.forEach(u => { userReadSet.value.add(u.id); u.read = true })
  persistUserRead()
}

function clearAllNotifs() {
  userAlerts.value = []
  userReadSet.value.clear()
  persistUserRead()
}

async function goToUser(u) {
  markUserRead(u.id)
  notifOpen.value = false
  await nextTick()
  const current = router.currentRoute.value
  if (current.name === 'detailuser' && current.params.id === u.id) return
  try {
    await router.push({ name: 'detailuser', params: { id: u.id } })
  } catch (_) {}
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 1)   return 'ទើបតែឥឡូវ'
  if (mins  < 60)  return `${mins} នាទីមុន`
  if (hours < 24)  return `${hours} ម៉ោងមុន`
  return `${days} ថ្ងៃមុន`
}

let knownUserIds = new Set()
let userPollTimer = null

async function fetchUsers(isInitial = false) {
  try {
    const res = await api.get('users')

    const users = (res.data?.data?.items ?? res.data?.data ?? [])
      .filter(u =>
        u.role !== 'ADMIN' &&
        (u.fullName || u.name || '').toLowerCase() !== 'system admin'
      )

    if (isInitial) {
      knownUserIds = new Set(users.map(u => u.id))

      userAlerts.value = users
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 20)
        .map(u => ({
          id: u.id,
          name: u.fullName || u.name || u.email || 'អ្នកប្រើប្រាស់ថ្មី',
          timeAgo: timeAgo(u.createdAt),
          read: userReadSet.value.has(u.id),
        }))

      return
    }

    for (const u of users) {
      if (!knownUserIds.has(u.id)) {
        knownUserIds.add(u.id)

        const name = u.fullName || u.name || u.email || 'អ្នកប្រើប្រាស់ថ្មី'

        userAlerts.value.unshift({
          id: u.id,
          name,
          timeAgo: timeAgo(u.createdAt),
          read: false,
        })

        showToast(name)
      }
    }

  } catch (e) {
    console.error('users fetch failed:', e)
  }
}

function startUserPolling() {
  fetchUsers(true)
  userPollTimer = setInterval(() => fetchUsers(false), 30_000)
}

// ── Profile dropdown ───────────────────────────────────────────────────────
const profileOpen       = ref(false)
const profileTriggerRef = ref(null)
const profileMenuRef    = ref(null)
const profileStyle      = ref({})

function positionProfile() {
  const el = profileTriggerRef.value
  if (!el) return
  const r          = el.getBoundingClientRect()
  const panelWidth = 240
  const viewportW  = window.innerWidth
  let left = r.right - panelWidth
  if (left < 8) left = 8
  if (left + panelWidth > viewportW - 8) left = viewportW - panelWidth - 8
  profileStyle.value = { position: 'fixed', top: `${r.bottom + 8}px`, left: `${left}px`, width: `${panelWidth}px`, zIndex: 999999 }
}

function toggleProfile() {
  notifOpen.value   = false
  profileOpen.value = !profileOpen.value
  if (profileOpen.value) nextTick(positionProfile)
}

async function handleLogout() {
  profileOpen.value = false
  try { await api.post('auth/logout') } catch (_) {}
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  userStore.clearProfile()
  router.push({ name: 'login' })
}

defineExpose({ handleLogout, avatarInitials })

// ── Notification panel ─────────────────────────────────────────────────────
const notifOpen       = ref(false)
const notifTriggerRef = ref(null)
const notifMenuRef    = ref(null)
const notifStyle      = ref({})

function positionNotif() {
  const el = notifTriggerRef.value
  if (!el) return
  const r          = el.getBoundingClientRect()
  const panelWidth = 320
  const viewportW  = window.innerWidth
  const viewportH  = window.innerHeight
  let left = r.left
  if (left + panelWidth > viewportW - 8) left = viewportW - panelWidth - 8
  if (left < 8) left = 8
  let top = r.bottom + 8
  if (top + 480 > viewportH) top = r.top - 480 - 8
  notifStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px`, width: `${Math.min(panelWidth, viewportW - 16)}px`, zIndex: 999999 }
}

function toggleNotif() {
  profileOpen.value = false
  notifOpen.value   = !notifOpen.value
  if (notifOpen.value) nextTick(positionNotif)
}

function handleOutside(e) {
  if (!notifTriggerRef.value?.contains(e.target) && !notifMenuRef.value?.contains(e.target))
    notifOpen.value = false
  if (!profileTriggerRef.value?.contains(e.target) && !profileMenuRef.value?.contains(e.target))
    profileOpen.value = false
}

function handleResize() {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  if (isMobile.value) profileOpen.value = false
  if (notifOpen.value)   positionNotif()
  if (profileOpen.value) positionProfile()
}

onMounted(() => {
  userStore.fetchProfile()
  startUserPolling()
  document.addEventListener('click', handleOutside)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleResize, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutside)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleResize, true)
  if (userPollTimer) clearInterval(userPollTimer)
})
</script>

<style scoped>
/* ── Navbar shell ── */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  background: var(--bg-sidebar);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-button {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: rgba(255, 255, 255, .75);
  transition: var(--transition);
  flex-shrink: 0;
}
.icon-button:hover {
  background: rgba(255, 255, 255, .12);
  border-color: rgba(255, 255, 255, .18);
  color: #fff;
}

.theme-icon-enter-active,
.theme-icon-leave-active { transition: opacity .15s ease, transform .15s ease; }
.theme-icon-enter-from   { opacity: 0; transform: rotate(-30deg) scale(.75); }
.theme-icon-leave-to     { opacity: 0; transform: rotate(30deg) scale(.75); }

.brand-wrap { display: flex; align-items: center; }
.brand-icon  { width: 150px; height: 48px; object-fit: contain; }

/* ── Badge ── */
.notif-badge {
  position: absolute; top: 2px; right: 2px;
  min-width: 16px; height: 16px; padding: 0 3px;
  background: var(--color-danger); color: var(--text-white);
  font-size: 9px; font-weight: 700; border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid var(--bg-sidebar); pointer-events: none; line-height: 1;
}

/* ── Toast stack ── */
.toast-stack {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.toast-card {
  pointer-events: all;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 300px;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--color-success);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg, 0 8px 32px rgba(0,0,0,.15));
  cursor: pointer;
  overflow: hidden;
}

.toast-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-success-light);
  color: var(--color-success);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.toast-body { flex: 1; min-width: 0; }
.toast-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-success);
  margin: 0 0 2px;
}
.toast-msg {
  font-size: 13px;
  color: var(--text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toast-close {
  width: 20px; height: 20px;
  display: grid; place-items: center;
  border: none; background: none;
  color: var(--text-secondary);
  cursor: pointer; padding: 0; flex-shrink: 0;
  border-radius: 4px;
}
.toast-close:hover { background: var(--bg-input); }

.toast-progress {
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  width: 100%;
  background: var(--color-success);
  transform-origin: left;
  animation: toast-shrink linear forwards;
}
@keyframes toast-shrink {
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
}

.toast-enter-active { transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .25s ease; }
.toast-leave-active { transition: transform .2s ease, opacity .2s ease; }
.toast-enter-from   { transform: translateX(110%); opacity: 0; }
.toast-leave-to     { transform: translateX(110%); opacity: 0; }

/* ── Notification panel ── */
.notif-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex; flex-direction: column;
  max-height: 480px;
}

.notif-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 16px 11px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}
.notif-head-left { display: flex; align-items: center; gap: 8px; }
.notif-head-actions { display: flex; align-items: center; gap: 8px; }
.notif-title     { font-size: 14px; font-weight: 700; color: var(--text-primary); }
.notif-count-badge {
  background: rgba(99,102,241,.2); color: #818cf8;
  font-size: 10px; font-weight: 700; border-radius: 6px; padding: 2px 7px;
}
.btn-mark-all {
  font-size: 11px; color: var(--color-primary); background: none;
  border: none; cursor: pointer; font-family: var(--font-khmer); padding: 0;
}
.btn-mark-all:hover { opacity: .7; }
.btn-clear-all {
  width: 24px; height: 24px;
  display: grid; place-items: center;
  background: none; border: none;
  color: var(--text-secondary);
  cursor: pointer; border-radius: 6px;
  transition: background .15s, color .15s;
  padding: 0;
}
.btn-clear-all:hover {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

.notif-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 10px; padding: 32px 16px;
  color: var(--text-secondary); font-size: 13px;
}

.notif-list { overflow-y: auto; flex: 1; }
.notif-item {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 12px 16px; border-bottom: 1px solid var(--border-color);
  cursor: pointer; transition: background var(--transition); position: relative;
}
.notif-item:last-child { border-bottom: none; }
.notif-item:hover      { background: var(--bg-input); }
.notif-item.unread     { background: color-mix(in srgb, var(--color-primary) 5%, transparent); }

.notif-icon {
  width: 30px; height: 30px; border-radius: 8px;
  flex-shrink: 0; display: grid; place-items: center; margin-top: 1px;
}
.notif-icon--user { background: var(--color-success-light); color: var(--color-success); }

.notif-body   { flex: 1; min-width: 0; }
.notif-msg    { font-size: 13px; font-weight: 600; color: var(--text-primary); line-height: 1.4; margin-bottom: 4px; }
.notif-time   { font-size: 11px; color: var(--text-secondary); }

.unread-dot {
  width: 7px; height: 7px; background: var(--color-primary);
  border-radius: 50%; flex-shrink: 0; margin-top: 4px;
}

/* ── Profile button ── */
.profile-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 4px 8px 4px 4px;
  border-radius: 10px; border: 1px solid transparent;
  background: transparent; cursor: pointer;
  color: rgba(255, 255, 255, .9);
  transition: var(--transition);
}
.profile-btn:hover {
  background: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .15);
}

.avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(26, 98, 212, 0.2); color: var(--text-white);
  display: grid; place-items: center;
  font-size: 12px; font-weight: 700; flex-shrink: 0; overflow: hidden;
}
.avatar--lg { width: 42px; height: 42px; font-size: 15px; }
.avatar-img { width: 100%; height: 100%; object-fit: cover; }

.profile-name {
  font-size: 13px; font-weight: 500; color: rgba(255, 255, 255, .9);
  max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.chevron      { transition: transform .2s; opacity: .6; color: var(--text-white); }
.chevron.open { transform: rotate(180deg); }

/* ── Profile panel ── */
.profile-panel {
  background: var(--bg-card); border: 1px solid var(--border-color);
  border-radius: var(--radius); box-shadow: var(--shadow);
  overflow: hidden; width: 240px;
}
.profile-head {
  display: flex; align-items: center; gap: 12px;
  padding: 16px; border-bottom: 1px solid var(--border-color);
}
.profile-head-info { min-width: 0; }
.profile-head-name {
  font-size: 14px; font-weight: 700; color: var(--text-primary);
  margin: 0 0 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.profile-head-email {
  font-size: 11px; color: var(--text-secondary); margin: 0;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.profile-list { padding: 6px; }
.profile-item {
  display: flex; align-items: center; gap: 10px; padding: 9px 10px;
  border-radius: 8px; font-size: 13px; color: var(--text-primary);
  text-decoration: none; background: none; border: none;
  width: 100%; text-align: left; cursor: pointer;
  transition: var(--transition); font-family: var(--font-khmer);
}
.profile-item:hover { background: var(--bg-input); }
.profile-item svg   { flex-shrink: 0; opacity: .55; }
.profile-item:hover svg { opacity: 1; }
.profile-sep { height: 1px; background: var(--border-color); margin: 4px 0; }
.profile-item--danger       { color: var(--color-danger); }
.profile-item--danger svg   { opacity: .7; }
.profile-item--danger:hover { background: var(--color-danger-light); }
.profile-item--danger:hover svg { opacity: 1; }

/* ── Panel transitions ── */
:global(.panel-enter-active),
:global(.panel-leave-active) { transition: opacity .15s ease, transform .15s ease; }
:global(.panel-enter-from),
:global(.panel-leave-to)     { opacity: 0; transform: translateY(-6px); }
</style>