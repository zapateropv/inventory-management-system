import { useEffect } from "react";
import { useStore } from "../store/store";
import { Outlet } from "react-router-dom";

function App() {
  const checkAuth = useStore((state) => state.checkAuth);
  const isCheckingAuth = useStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className="bg-white">Loading...</div>;
  }

  return <Outlet />;
}

export default App;