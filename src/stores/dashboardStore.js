import api from "@/api/api";
import { ref } from "vue";
import { defineStore } from "pinia";


export const useDashboardStore = defineStore("dashboard", () => {

  const totalUsers = ref(0);
  const incomeCount = ref(0);
  const expenseCount = ref(0);

  const loading = ref(false);
  const error = ref(null);

  async function fetchUsers() {
    try {
      const res = await api.get("/users?_page=1&_per_page=10&search&sortBy=id&sortDir=asc");
      totalUsers.value = res.data.data.items.length;
    } catch (err) {
      error.value = err;
    }
  }

  
  async function fetchTransactions() {
    loading.value = true;

    try {
      const res = await api.get(
        "/transactions?_page=1&_per_page=100&sortBy=id&sortDir=asc"
      );

      const items = res.data.data.items || [];

      // INCOME COUNT
      incomeCount.value = items.filter(
        (t) => t.category?.type === "INCOME"
      ).length;

      // EXPENSE COUNT
      expenseCount.value = items.filter(
        (t) => t.category?.type === "EXPENSE"
      ).length;

    } catch (err) {
      console.log("Dashboard error:", err.response?.data || err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchDashboard() {
    await Promise.all([
      fetchUsers(),
      fetchTransactions(),
    ]);
  }

  return {
    totalUsers,
    incomeCount,
    expenseCount,
    loading,
    error,
    fetchDashboard,
  };
});