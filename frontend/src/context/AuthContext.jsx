import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/auth/check", {
          withCredentials: true,
        });
        console.log(response);
        setUser(response.data.user);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => useContext(AuthContext);
