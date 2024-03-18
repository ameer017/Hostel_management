// import { useState, useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import HomeDash from "./Component/Dashboard/HomeDash";
// import StudentReg from "./Component/Register/StudentReg";
// import AdminReg from "./Component/Register/AdminReg";
// import HomeDash from "./Component/Dashboard/HomeDash";
// import Layout from "./Component/Layout/Layout";
// import Loader from "./Component/Loader/Loader";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);

//   const renderRoutes = () => (
//     <Routes>
//       <Route path="/" element={<StudentReg />} />
//       <Route path="admin" element={<AdminReg />} />
//       <Route path="home" element={<HomeDash />} />
//       <Route
//         path="/"
//         element={
//           <Layout>
//             <HomeDash />
//           </Layout>
//         }
//       />
//     </Routes>
//   );

//   return <>{loading ? <Loader /> : renderRoutes()}</>;
// }

// export default App;
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeDash from "./Component/Dashboard/HomeDash"; // Removed duplicate import
import StudentReg from "./Component/Register/StudentReg";
import AdminReg from "./Component/Register/AdminReg";
import Layout from "./Component/Layout/Layout";
import Loader from "./Component/Loader/Loader";
import AdminPreview from "./Component/AdminPreview/AdminPreview";

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
      <Route path="admin" element={<AdminReg />} />
      <Route path="home" element={<HomeDash />} />
      <Route
        path="/"
        element={
          <Layout>
            <HomeDash />
          </Layout>
        }
      />
      <Route path="/adminsPrev" element={<AdminPreview />} />
    </Routes>
  );

  return <>{loading ? <Loader /> : renderRoutes()}</>;
}

export default App;
