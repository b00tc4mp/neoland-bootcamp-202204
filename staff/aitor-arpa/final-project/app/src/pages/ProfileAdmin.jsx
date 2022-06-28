import { Route, Routes } from "react-router-dom";
import FormProfile from "../components/users/FormProfile";
import NavbarAdmin from "../components/NavbarAdmin";
import Logout from "../components/users/Logout";
import { withTokenAndRol } from "../container";

export default withTokenAndRol(function ProfileAdmin() {
  return (
    <Routes>
      <Route
        index
        element={
          <div>
            <Logout />

            <FormProfile />
            <div>
              <NavbarAdmin />
            </div>
          </div>
        }
      />
    </Routes>
  );
}, true);
