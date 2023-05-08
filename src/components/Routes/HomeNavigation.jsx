import { Route, Routes } from "react-router-dom";
import Employee from "../../pages/Employee/Employee";

const HomeNavigation = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Employee />} />
    </Routes>
  );
};

export default HomeNavigation;
