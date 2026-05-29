import { ref, computed } from "vue"
import { defineStore } from "pinia"
import api from "@/api/api"

const getApiErrorMessage = (error, fallback) => {
  const data = error.response?.data
  if (typeof data === "string" && data.trim()) return data
  if (data?.message) return data.message
  if (data?.errors && typeof data.errors === "object") {
    return Object.values(data.errors).flat().filter(Boolean).join(" ")
  }
  return fallback
}

export const useAuthStore = defineStore("auth", () => {

  // ── State ──────────────────────────────────────────────
  const token = ref(localStorage.getItem("token") || null)
  const user = ref(
    localStorage.getItem("role")
      ? { role: localStorage.getItem("role") }
      : null
  )
  const errorMsg = ref("")
  const resetToken = ref("")
  const resetEmail = ref(localStorage.getItem("resetEmail") || "")

  // ── Computed ───────────────────────────────────────────
  const isLogin = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === "ADMIN")

  // ── Actions ────────────────────────────────────────────
  const setAuth = (data) => {
    user.value = data.user
    token.value = data.token
  }

  const saveToken = (tokenValue) => {
    token.value = tokenValue
    localStorage.setItem("token", tokenValue)
  }

  const logout = () => {
    user.value = null
    token.value = null
    errorMsg.value = ""
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("resetEmail")
  }

  const login = async (data) => {
    const { rememberMe, ...loginData } = data
    try {
      const res = await api.post("/auth/login", loginData)
      const userToken = res.data.data.token
      const userData = res.data.data.user ?? null

      const roleRes = await api.get("/roles/1", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      const roleName = roleRes.data?.data?.name ?? ""

      if (roleName !== "ADMIN") {
        errorMsg.value = "អ្នកមិនមានសិទ្ធិចូលប្រព័ន្ធនេះទេ"
        throw new Error("Unauthorized role")
      }

      token.value = userToken
      user.value = { ...userData, role: roleName }
      localStorage.setItem("token", userToken)
      localStorage.setItem("role", roleName)

      errorMsg.value = ""
      return res.data

    } catch (error) {
      if (error.message !== "Unauthorized role") {
        errorMsg.value = getApiErrorMessage(
          error,
          "បញ្ចូលបរាជ័យ សូមពិនិត្យអុីមែល និងពាក្យសម្ងាត់ម្ដងទៀត"
        )
      }
      throw error
    }
  }

  const register = async (data) => {
    try {
      const res = await api.post("/auth/register", data)
      user.value = res.data.data
      errorMsg.value = ""
      return res.data
    } catch (err) {
      errorMsg.value = getApiErrorMessage(
        err,
        "បង្កើតបរាជ័យ សូមពិនិត្យព័ត៏មានម្ដងទៀត"
      )
      throw err
    }
  }

  const requestOtp = async (data) => {
    try {
      const res = await api.post("/otp/send", data)
      errorMsg.value = ""
      return res.data
    } catch (error) {
      errorMsg.value = getApiErrorMessage(error, "ផ្ញើរ OTP បានបរាជ័យ")
      throw error
    }
  }

  const resendOtp = async (data) => {
    try {
      const res = await api.post("/otp/resend", data)
      errorMsg.value = ""
      return res.data
    } catch (error) {
      errorMsg.value = getApiErrorMessage(error, "ផ្ញើរ OTP បានបរាជ័យ")
      throw error
    }
  }

  const verifyOtp = async (data) => {
    try {
      const res = await api.post("/otp/verify", data)
      resetToken.value = res.data?.data?.token ?? res.data?.token ?? ""
      errorMsg.value = ""
      return res.data
    } catch (error) {
      errorMsg.value = getApiErrorMessage(error, "លេខកូដ OTP មិនត្រឹមត្រូវ ឬផុតកំណត់")
      throw error
    }
  }

  const forgotPassword = async (data) => {
    try {
      const res = await api.post("/auth/admin/forget-password", data)
      resetEmail.value = data.email
      localStorage.setItem("resetEmail", data.email)
      errorMsg.value = ""
      return res.data
    } catch (error) {
      errorMsg.value = getApiErrorMessage(error, "មិនអាចផ្ញើសារបាន សូមព្យាយាមម្តងទៀត")
      throw error
    }
  }

  const resetPassword = async (data) => {
    try {
      const res = await api.post("/auth/reset-password", data)
      resetToken.value = ""
      resetEmail.value = ""
      localStorage.removeItem("resetEmail")
      errorMsg.value = ""
      return res.data
    } catch (error) {
      errorMsg.value = getApiErrorMessage(
        error,
        "មិនអាចកំណត់ពាក្យសម្ងាត់ឡើងវិញបាន សូមព្យាយាមម្តងទៀត"
      )
      throw error
    }
  }

  // ── Exports ────────────────────────────────────────────
  return {
    token, user, errorMsg, resetToken, resetEmail,
    isLogin, isAdmin,
    setAuth, saveToken, logout,
    login, register,
    requestOtp, resendOtp, verifyOtp,
    forgotPassword, resetPassword,
  }
})