import { a as useState } from './server.mjs';
import { readonly } from 'vue';

const useAuth = () => {
  const isAuthenticated = useState("auth.isAuthenticated", () => false);
  const user = useState("auth.user", () => null);
  const isCheckingAuth = useState("auth.isChecking", () => false);
  const login = async (email, password) => {
    var _a;
    try {
      const response = await $fetch("/api/admin/login", {
        method: "POST",
        body: {
          email,
          password
        }
      });
      if (response.success && response.user) {
        isAuthenticated.value = true;
        user.value = response.user;
        if (false) ;
        return { success: true };
      }
      return { success: false, error: "Login failed" };
    } catch (error) {
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "An error occurred during login"
      };
    }
  };
  const logout = () => {
    isAuthenticated.value = false;
    user.value = null;
  };
  const checkAuth = async () => {
  };
  return {
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    isCheckingAuth: readonly(isCheckingAuth),
    login,
    logout,
    checkAuth
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-jTt8KfVH.mjs.map
