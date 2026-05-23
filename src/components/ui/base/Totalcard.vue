<template>
  <div class="card border-0 shadow">

    <div class="card-body">

      <!-- HEADER -->
      <div class="card-header-row">

        <!-- TITLE -->
        <div class="card-title">
          {{ title }}
        </div>

        <!-- ICON -->
        <div class="card-icon">
          <slot name="icon"></slot>
        </div>

      </div>

      <!-- VALUE -->
      <div class="card-subtitle">
        {{ formattedValue }}
      </div>

      <!-- OPTIONAL TEXT -->
      <div class="card-text">
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },

  value: {
    type: Number,
    default: 0
  },

  currency: {
    type: String,
    default: ''
  }
})

const formattedValue = computed(() => {
  return `${props.currency}${Number(props.value).toLocaleString()}`
})
</script>

<style scoped>
/* ================= ROOT VARIABLES ================= */
:root {
  --sidebar-width: 300px;
  --sidebar-collapsed-width: 80px;
}

/* ================= MAIN CARD ================= */
.card {
  border-radius: var(--radius);

  background: var(--bg-card);

  border: 1px solid var(--border-color);

  width: calc(100% - var(--sidebar-width));

  box-shadow: var(--shadow);

  transition: var(--transition);
}

/* ================= SIDEBAR COLLAPSED ================= */
body.sidebar-collapsed .card {
  width: calc(100% - var(--sidebar-collapsed-width));
}

/* ================= MOBILE ================= */
@media (max-width: 992px) {
  .card {
    width: 100% !important;
  }
}

/* ================= CARD BODY ================= */
.card-body {
  padding: 20px;

  display: flex;
  flex-direction: column;

  gap: 6px;
}

/* ================= HEADER ================= */
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 14px;
}

/* ================= TITLE ================= */
.card-title {
  font-size: 16px;
  font-weight: 500;

  color: var(--text-secondary);

  font-family: var(--font-khmer);

  line-height: 1.5;
}

/* ================= ICON ================= */
.card-icon {
  width: 48px;
  height: 48px;

  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--bg-input);

  border: 1px solid var(--border-color);

  color: var(--color-primary);

  flex-shrink: 0;

  transition: var(--transition);
}

/* ================= ICON SVG ================= */
.card-icon svg {
  width: 18px;
  height: 18px;
}

/* ================= VALUE ================= */
.card-subtitle {
  font-size: 28px;
  font-weight: 700;

  color: var(--text-primary);

  line-height: 1.1;

  word-break: break-word;
}

/* ================= TEXT ================= */
.card-text {
  font-size: 13px;

  color: var(--text-secondary);

  display: flex;
  align-items: center;

  gap: 4px;
}

/* ================= HOVER ================= */
.card:hover {
  transform: translateY(-2px);

  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

/* ================= TABLET ================= */
@media (max-width: 768px) {
  .card-body {
    padding: 18px;
  }

  .card-title {
    font-size: 15px;
  }

  .card-subtitle {
    font-size: 24px;
  }

  .card-icon {
    width: 44px;
    height: 44px;
  }
}

/* ================= MOBILE ================= */
@media (max-width: 480px) {
  .card {
    border-radius: 12px;
  }

  .card-body {
    padding: 16px;
  }

  .card-header-row {
    gap: 10px;
  }

  .card-title {
    font-size: 14px;
  }

  .card-subtitle {
    font-size: 22px;
  }

  .card-icon {
    width: 40px;
    height: 40px;

    border-radius: 10px;
  }

  .card-icon svg {
    width: 16px;
    height: 16px;
  }

  .card-text {
    font-size: 12px;
  }
}
</style>