<template>
  <!-- RECENT USERS TABLE -->
  <div class="table-card">
    <!-- HEADER -->
    <div class="table-top">
      <div>
        <h3 class="title">អ្នកប្រើប្រាស់ថ្មីៗ</h3>
        <p class="subtitle">បញ្ជីអ្នកប្រើប្រាស់ដែលបានចុះឈ្មោះថ្មី</p>
      </div>
    </div>

    <!-- DESKTOP TABLE -->
    <div class="table-wrapper d-none d-md-block">
      <table class="user-table">
        <thead>
          <tr>
            <th>អ្នកប្រើប្រាស់</th>
            <th>អ៊ីមែល</th>
            <th>ស្ថានភាព</th>
            <th>កាលបរិច្ឆេទ</th>
            <th>សកម្មភាព</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in recentUsers"
            :key="user.id"
            class="table-row"
          >
            <!-- USER -->
            <td>
              <RouterLink
                class="user-link"
                :to="{ name: 'detailuser', params: { id: user.id } }"
              >
                <div class="user-info">
                  <div class="avatar">
                    <img
                      :src="user.avatar || 'https://i.pravatar.cc/150?img=3'"
                      alt="avatar"
                    />
                  </div>
                  <div class="user-detail">
                    <h4>{{ user.fullName }}</h4>
                    <span>ID: {{ user.id.slice(0, 8) }}</span>
                  </div>
                </div>
              </RouterLink>
            </td>

            <!-- EMAIL -->
            <td class="email">{{ user.email }}</td>

            <!-- STATUS -->
            <td>
              <span class="status" :class="user.isVerifyEmail ? 'active' : 'inactive'">
                <span class="dot"></span>
                {{ user.isVerifyEmail ? "Active" : "Inactive" }}
              </span>
            </td>

            <!-- DATE -->
            <td class="date">
              {{ new Date(user.registeredAt).toLocaleDateString("en-CA") }}
            </td>

            <!-- ACTION -->
            <td>
              <RouterLink
                class="action-btn"
                :to="{ name: 'detailuser', params: { id: user.id } }"
              >
                View
              </RouterLink>
            </td>
          </tr>

          <!-- EMPTY -->
          <tr v-if="recentUsers.length === 0">
            <td colspan="5" class="empty-state">
              មិនមានទិន្នន័យអ្នកប្រើប្រាស់
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MOBILE CARDS — matches UserView style -->
    <div class="d-md-none mt-2">
      <template v-if="recentUsers.length > 0">
        <div
          v-for="user in recentUsers"
          :key="user.id"
          class="mobile-card"
        >
          <div class="d-flex align-items-center gap-3">
            <img
              :src="user.avatar || 'https://i.pravatar.cc/150?img=3'"
              class="rounded-circle"
              width="42"
              height="42"
              style="object-fit:cover;flex-shrink:0;"
              alt="avatar"
            />
            <div style="min-width:0;">
              <div class="fw-semibold" style="color:var(--text-primary);font-size:14px;">{{ user.fullName }}</div>
              <div style="font-size:12px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ user.email }}</div>
              <div class="mt-1">
                <span
                  :class="user.role?.name === 'ADMIN'
                    ? 'role-badge role-badge--admin'
                    : 'role-badge role-badge--user'"
                >
                  {{ user.role?.name || 'USER' }}
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex gap-1" style="flex-shrink:0;">
            <RouterLink
              class="btn text-primary btn-sm"
              :to="{ name: 'detailuser', params: { id: user.id } }"
            >
              <i class="bi bi-eye-fill"></i>
            </RouterLink>
          </div>
        </div>
      </template>

      <div v-else class="text-center py-4" style="color:var(--text-secondary);font-size:13px;">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        មិនមានទិន្នន័យអ្នកប្រើប្រាស់
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import api from "@/api/api";

const recentUsers = ref([]);

async function fetchRecentUsers() {
  try {
    const res = await api.get(
      "/users?_page=1&_per_page=5&sortBy=id&sortDir=desc",
    );
    recentUsers.value = res.data?.data?.items || [];
  } catch (err) {
    console.error("Failed to fetch recent users:", err);
  }
}

onMounted(() => {
  fetchRecentUsers();
});
</script>

<style scoped>
/* CARD */
.table-card {
  margin-top: 24px;
  background: var(--bg-card);
  border-radius: 28px;
  padding: 24px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.06),
    0 2px 6px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

/* TOP */
.table-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.title {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: var(--text-primary);
}

.subtitle {
  margin-top: 5px;
  font-size: 14px;
  color: var(--text-secondary);
}

/* TABLE */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

.user-table thead th {
  padding: 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  background: var(--bg-input);
  border-bottom: 1px solid var(--border-color);
  white-space: nowrap;
}

.user-table thead th:first-child { border-top-left-radius: 14px; }
.user-table thead th:last-child  { border-top-right-radius: 14px; }

.user-table tbody td {
  padding: 18px 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  color: var(--text-secondary);
  vertical-align: middle;
}

.table-row { transition: all 0.2s ease; }
.table-row:hover { background: var(--bg-input); }

.user-link { display: block; text-decoration: none; }

.user-info {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: #e5e7eb;
  flex-shrink: 0;
  border: 3px solid #eef2ff;
}

.avatar img { width: 100%; height: 100%; object-fit: cover; }

.user-detail { min-width: 0; flex: 1; }

.user-detail h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-detail span {
  font-size: 12px;
  color: #9ca3af;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.email {
  font-weight: 500;
  color: var(--text-secondary);
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.dot { width: 8px; height: 8px; border-radius: 50%; }

.active     { background: #dcfce7; color: #15803d; }
.active .dot { background: #16a34a; }
.inactive     { background: #f3f4f6; color: #6b7280; }
.inactive .dot { background: #9ca3af; }

.date { font-weight: 600; color: var(--text-secondary); white-space: nowrap; }

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 10px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(79, 70, 229, 0.2);
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #9ca3af;
  font-weight: 600;
}

/* MOBILE CARDS — matches UserView */
.mobile-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

/* Role badges */
.role-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.role-badge--user {
  background: rgba(26, 98, 212, 0.12);
  color: var(--color-primary, #1a62d4);
  border: 1px solid rgba(26, 98, 212, 0.25);
}

.role-badge--admin {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.25);
}

/* SCROLLBAR */
.table-wrapper::-webkit-scrollbar { height: 8px; }
.table-wrapper::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 999px;
}

/* TABLET */
@media (max-width: 768px) {
  .table-card {
    padding: 18px;
    border-radius: 22px;
  }

  .table-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .title { font-size: 20px; }
  .subtitle { font-size: 13px; }
}

/* MOBILE */
@media (max-width: 480px) {
  .table-card {
    padding: 14px;
    border-radius: 18px;
  }

  .title { font-size: 18px; }
  .subtitle { font-size: 12px; }
}
</style>