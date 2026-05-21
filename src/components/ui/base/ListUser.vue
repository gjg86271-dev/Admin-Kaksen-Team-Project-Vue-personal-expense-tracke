<template>
  <!-- ADD THIS BELOW YOUR CHARTS -->
  <div class="table-card">
    <div class="table-header">
      <h3>អ្នកប្រើប្រាស់ថ្មីៗ</h3>
    </div>

    <div class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>ឈ្មោះ</th>
            <th>អ៊ីមែល</th>
            <th>ស្ថានភាព</th>
            <th>កាលបរិច្ឆេទ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in recentUsers" :key="user.id">
            <td class="name-cell">
              <div class="avatar">
                <img :src="user.avatar" alt="" />
              </div>

              <span>{{ user.fullName }}</span>
            </td>

            <td>
              {{ user.email }}
            </td>

            <td>
              <span
                class="status"
                :class="user.isVerifyEmail ? 'active' : 'inactive'"
              >
                {{ user.isVerifyEmail ? "Active" : "Inactive" }}
              </span>
            </td>

            <td>
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
/* TABLE CARD */
.table-card {
  margin-top: 24px;

  background: rgba(255, 255, 255, 0.95);

  border-radius: 24px;

  padding: 24px;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);

  overflow: hidden;
}

.table-header {
  margin-bottom: 18px;
}

.table-header h3 {
  margin: 0;

  font-size: 18px;
  font-weight: 700;

  color: #111827;
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
  text-align: left;

  padding: 16px;

  font-size: 14px;
  font-weight: 700;

  color: #374151;

  border-bottom: 1px solid #e5e7eb;
}

.user-table tbody td {
  padding: 16px;

  border-bottom: 1px solid #f3f4f6;

  font-size: 14px;

  color: #4b5563;
}

/* NAME CELL */
.name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 42px;
  height: 42px;

  border-radius: 50%;

  overflow: hidden;

  flex-shrink: 0;

  background: #f3f4f6;
}

.avatar img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

/* STATUS */
.status {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 5px 12px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;
}

.active {
  background: #dcfce7;
  color: #15803d;
}

.inactive {
  background: #f3f4f6;
  color: #6b7280;
}

/* HOVER */
.user-table tbody tr {
  transition: 0.2s ease;
}

.user-table tbody tr:hover {
  background: #f9fafb;
}

/* MOBILE */
@media (max-width: 768px) {
  .table-card {
    padding: 18px;
  }

  .user-table {
    min-width: 700px;
  }
}
</style>
