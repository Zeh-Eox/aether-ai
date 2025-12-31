import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import Layout from "./pages/Layout";
import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

const App: React.FunctionComponent = () => {
  const { getToken } = useAuth();

  React.useEffect(() => {
    getToken().then((token) => {
      console.log("Clerk token:", token);
    });
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/ai" element={<Layout />}>
          {ROUTES.filter((r) => r.isAiRoute).map(
            ({ route, component: Component }, i) => (
              <Route key={i} path={route} element={<Component />} />
            )
          )}
        </Route>

        {ROUTES.filter((r) => !r.isAiRoute).map(
          ({ route, component: Component }, i) => (
            <Route key={i} path={route} element={<Component />} />
          )
        )}
      </Routes>
    </>
  );
};

export default App;
