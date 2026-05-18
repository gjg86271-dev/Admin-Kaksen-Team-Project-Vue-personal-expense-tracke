<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar  from '@/components/comment/Navbar.vue'
import Sidebar from '@/components/comment/Sidebar.vue'

const isMobile    = ref(false)
const isCollapsed = ref(false)   // desktop: collapse/expand
const isDrawerOpen = ref(false)  // mobile: drawer open/close

function checkMobile() {
  isMobile.value = window.innerWidth < 768
  // reset states on resize
  if (!isMobile.value) isDrawerOpen.value = false
}

function toggleSidebar() {
  if (isMobile.value) {
    isDrawerOpen.value = !isDrawerOpen.value  // mobile → drawer
  } else {
    isCollapsed.value = !isCollapsed.value    // desktop → collapse
  }
}

function closeDrawer() {
  isDrawerOpen.value = false
}



onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="layout">

    <Navbar @toggle-sidebar="toggleSidebar" :is-mobile="isMobile" />

    <div class="main">

      <!-- ✅ MOBILE OVERLAY — click backdrop → close drawer -->
      <Transition name="fade">
        <div
          v-if="isMobile && isDrawerOpen"
          class="drawer-overlay"
          @click="closeDrawer"
        />
      </Transition>

      <!-- ✅ SIDEBAR — drawer on mobile, static on desktop -->
      <Transition name="slide">
        <Sidebar
          v-show="!isMobile || isDrawerOpen"
          :is-collapsed="!isMobile && isCollapsed"
          :is-mobile="isMobile"
          :class="{ 'sidebar-drawer': isMobile }"
          @close="closeDrawer"
        />
      </Transition>

      <div class="content">
        <router-view />
      </div>

    </div>
  </div>
</template>

<style>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #eaf1fa;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* ── Mobile drawer ── */
.sidebar-drawer {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  height: 100vh !important;
  margin: 0 !important;
  border-radius: 0 20px 20px 0 !important;
  z-index: 1000;
}

/* ── Overlay ── */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
}

/* ── Transitions ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.28s ease; }
.slide-enter-from,   .slide-leave-to     { transform: translateX(-100%); }
</style>