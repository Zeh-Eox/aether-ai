import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";

const App: React.FunctionComponent = () => {
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
