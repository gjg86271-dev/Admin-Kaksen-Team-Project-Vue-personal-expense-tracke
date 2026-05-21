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

    <!-- TABLE -->
    <div class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>អ្នកប្រើប្រាស់</th>
            <th>អ៊ីមែល</th>
            <th>ស្ថានភាព</th>
            <th>កាលបរិច្ឆេទ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in recentUsers" :key="user.id">
            <td>
              <div class="user-info">
                <div class="avatar">
                  <img
                    :src="user.avatar || 'https://i.pravatar.cc/150?img=3'"
                    alt=""
                  />
                </div>

                <div class="user-detail">
                  <h4>{{ user.fullName }}</h4>
                  <span>ID: {{ user.id.slice(0, 8) }}</span>
                </div>
              </div>
            </td>

            <td class="email">
              {{ user.email }}
            </td>

            <td>
              <span
                class="status"
                :class="user.isVerifyEmail ? 'active' : 'inactive'"
              >
                <span class="dot"></span>

                {{ user.isVerifyEmail ? "Active" : "Inactive" }}
              </span>
            </td>

            <!-- DATE -->
            <td class="date">
              {{ new Date(user.registeredAt).toLocaleDateString("en-CA") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api/api";

const recentUsers = ref([]);

async function fetchRecentUsers() {
  try {
    const res = await api.get(
      "/users?_page=1&_per_page=5&sortBy=id&sortDir=desc",
    );

    recentUsers.value = res.data.data.items || [];
  } catch (err) {
    console.error(err);
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

  background: rgba(255, 255, 255, 0.95);

  border-radius: 28px;

  padding: 24px;

  border: 1px solid rgba(255, 255, 255, 0.4);

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

  color: #111827;
}

.subtitle {
  margin-top: 5px;

  font-size: 14px;

  color: #6b7280;
}

/* BUTTON */
.view-btn {
  border: none;

  padding: 10px 18px;

  border-radius: 14px;

  background: linear-gradient(135deg, #4f46e5, #7c3aed);

  color: white;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: all 0.25s ease;
}

.view-btn:hover {
  transform: translateY(-2px);

  box-shadow: 0 8px 18px rgba(124, 58, 237, 0.25);
}

/* TABLE */
.table-wrapper {
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table thead th {
  padding: 16px;

  text-align: left;

  font-size: 13px;
  font-weight: 700;

  color: #6b7280;

  background: #f9fafb;

  border-bottom: 1px solid #e5e7eb;
}

.user-table thead th:first-child {
  border-top-left-radius: 14px;
}

.user-table thead th:last-child {
  border-top-right-radius: 14px;
}

.user-table tbody td {
  padding: 18px 16px;

  border-bottom: 1px solid #f3f4f6;

  font-size: 14px;

  color: #374151;
}

/* ROW HOVER */
.user-table tbody tr {
  transition: all 0.2s ease;
}

.user-table tbody tr:hover {
  background: #fafafa;
}

/* USER INFO */
.user-info {
  display: flex;
  align-items: center;
  gap: 14px;
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

.avatar img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.user-detail h4 {
  margin: 0;

  font-size: 15px;
  font-weight: 700;

  color: #111827;
}

.user-detail span {
  font-size: 12px;

  color: #9ca3af;
}

/* EMAIL */
.email {
  font-weight: 500;

  color: #4b5563;
}

/* STATUS */
.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 700;
}

.dot {
  width: 8px;
  height: 8px;

  border-radius: 50%;
}

.active {
  background: #dcfce7;
  color: #15803d;
}

.active .dot {
  background: #16a34a;
}

.inactive {
  background: #f3f4f6;
  color: #6b7280;
}

.inactive .dot {
  background: #9ca3af;
}

/* DATE */
.date {
  font-weight: 600;

  color: #6b7280;
}

/* SCROLLBAR */
.table-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: #d1d5db;

  border-radius: 999px;
}

/* MOBILE */
@media (max-width: 768px) {
  .table-card {
    padding: 18px;
  }

  .table-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .user-table {
    min-width: 780px;
  }

  .title {
    font-size: 20px;
  }
}
</style>
