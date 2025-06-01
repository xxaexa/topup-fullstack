// Tipe untuk user login
export interface UserData {
    uid: string;
    token: string;
  }
  
  // Get user dari localStorage
  export const getUserFromLocalStorage = (): UserData | null => {
    const user = localStorage.getItem("user");
    try {
      return user ? JSON.parse(user) as UserData : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  };
  
  // Simpan user ke localStorage
  export const saveUserToLocalStorage = (user: UserData): void => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
    }
  };
  
  // Hapus user dari localStorage
  export const removeUserFromLocalStorage = (): void => {
    localStorage.removeItem("user");
  };
  