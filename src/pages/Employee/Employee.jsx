import { useEffect, useState } from "react";
import axios from "axios";

const Employee = (props) => {
  const [employees, setEmployees] = useState(null);

  const getEmployees = async () => {
    await axios
      .get("http://localhost:8099/api/v1/employees")
      .then((response) => {
        const temp = response.data;
        response.data.sort((a, b) => a.id - b.id);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="vw-100 vh-100">
      <div className="col-sm-10 mx-auto mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Employee No</th>
              <th scope="col">DOB</th>
            </tr>
          </thead>
          <tbody>
            {employees !== null &&
              employees.map((employee, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{employee.id}</th>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.employeeNo}</td>
                    <td>{employee.dob}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
