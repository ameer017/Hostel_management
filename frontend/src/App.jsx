import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeDash from "./Component/Dashboard/HomeDash";
import StudentReg from "./Component/Register/StudentReg";
import Layout from "./Component/Layout/Layout";
import Loader from "./Component/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const renderRoutes = () => (
    <Routes>
      <Route path="/" element={<StudentReg />} />
      <Route
        path="/"
        element={
          <Layout>
            <HomeDash />
          </Layout>
        }
      />
    </Routes>
  );

  return <>{loading ? <Loader /> : renderRoutes()}</>;
}

export default App;
