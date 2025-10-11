import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import Layout from "./pages/Layout";

const App: React.FunctionComponent = () => {
  return (
    <Routes>
      {/* Routes IA */}
      <Route path="/ai" element={<Layout />}>
        {ROUTES.filter((r) => r.isAiRoute).map(
          ({ route, component: Component }, i) => (
            <Route key={i} path={route} element={<Component />} />
          )
        )}
      </Route>

      {/* Routes normales */}
      {ROUTES.filter((r) => !r.isAiRoute).map(
        ({ route, component: Component }, i) => (
          <Route key={i} path={route} element={<Component />} />
        )
      )}
    </Routes>
  );
};

export default App;
