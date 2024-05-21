import {
  selectAdmin,
  selectIsLoggedIn,
} from "../../redux/features/auth-admin/adminSlice";

import { useSelector } from "react-redux";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const AdminLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectAdmin);

  if (isLoggedIn && user?.role === "admin") {
    return <>{children}</>;
  }
  return null;
};
