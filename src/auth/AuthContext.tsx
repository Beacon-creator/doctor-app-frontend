import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { syncUserWithBackend } from "./syncUser";

type BackendUser = {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  backendUser: BackendUser | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  backendUser: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setUser(user);
        setLoading(false);

        if (user) {
          try {
            const dbUser = await syncUserWithBackend();
            setBackendUser(dbUser);
          } catch (err) {
            console.error("BACKEND SYNC FAILED:", err);
          }
        } else {
          setBackendUser(null);
        }
      },
      (error) => {
        setLoading(false);
        console.error("AUTH ERROR:", error);
      }
    );

    return unsubscribe;
  }, []);

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setBackendUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, backendUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
