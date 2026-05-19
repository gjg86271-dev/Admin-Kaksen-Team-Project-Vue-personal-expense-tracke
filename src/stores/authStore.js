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
  const token = ref(
    localStorage.getItem("token") || sessionStorage.getItem("token") || null
  )
  const user = ref(null)
  const errorMsg = ref("")
  const resetToken = ref("")
  const resetEmail = ref(sessionStorage.getItem("resetEmail") || "")

  // ── Computed ───────────────────────────────────────────
  const isLogin = computed(() => !!token.value)
  const isAdmin = computed(() => {
    const role = localStorage.getItem("role") || sessionStorage.getItem("role")
    return role === "ADMIN"
  })

  // ── Actions ────────────────────────────────────────────
  const setAuth = (data) => {
    user.value = data.user
    token.value = data.token
    localStorage.setItem("token", data.token)
    localStorage.setItem("role", data.user?.role ?? "")
  }

  const logout = () => {
    user.value = null
    token.value = null
    errorMsg.value = ""
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("role")
    sessionStorage.removeItem("resetEmail")
  }

  const login = async (data) => {
    const { rememberMe, ...loginData } = data
    try {
      // Step 1: Login ទទួល token
      const res = await api.post("/auth/login", loginData)
      const userToken = res.data.data.token
      const userData = res.data.data.user ?? null

      // Step 2: ប្រើ token ទៅ GET /roles/1 ភ្លាមៗ
      const roleRes = await api.get("/roles/1", {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      const roleName = roleRes.data?.data?.name ?? ""

      // Step 3: Check — ADMIN ប៉ុណ្ណោះអាចចូល
      if (roleName !== "ADMIN") {
        errorMsg.value = "អ្នកមិនមានសិទ្ធិចូលប្រព័ន្ធនេះទេ"
        throw new Error("Unauthorized role")
      }

      // Step 4: Save token + role
      token.value = userToken
      user.value = { ...userData, role: roleName }

      if (rememberMe) {
        localStorage.setItem("token", userToken)
        localStorage.setItem("role", roleName)
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("role")
      } else {
        sessionStorage.setItem("token", userToken)
        sessionStorage.setItem("role", roleName)
        localStorage.removeItem("token")
        localStorage.removeItem("role")
      }

      errorMsg.value = ""
      return res.data

    } catch (error) {
      // មិន override errorMsg បើ role error
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
  const sentOtp = requestOtp

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
      const res = await api.post("/auth/forgot-password", data)
      resetEmail.value = data.email
      sessionStorage.setItem("resetEmail", data.email)
      errorMsg.value = ""
      return res.data
    } catch (error) {
      errorMsg.value = getApiErrorMessage(error, "មិនអាចផ្ញើ OTP បាន សូមព្យាយាមម្តងទៀត")
      throw error
    }
  }

  const resetPassword = async (data) => {
    try {
      const res = await api.post("/auth/reset-password", data)
      resetToken.value = ""
      resetEmail.value = ""
      sessionStorage.removeItem("resetEmail")
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
    setAuth, logout,
    login, register,
    requestOtp, sentOtp, resendOtp, verifyOtp,
    forgotPassword, resetPassword,
  }
})