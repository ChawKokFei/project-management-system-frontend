import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

const Employee = (props) => {
  const [employees, setEmployees] = useState(null);
  const [errorGet, sendGetRequest] = useHttp();
  const [errorDelete, sendDeleteRequest] = useHttp();
  const [errorPost, sendPostRequest] = useHttp();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    employeeNo: "",
    dob: "",
  });

  const getAllEmployees = (employees) => {
    // Sort by id in ascesding order
    employees.sort((a, b) => a.id - b.id);

    setEmployees(employees);
  };

  const handleCheckboxChange = (event, employee) => {
    if (event.target.checked) {
      setSelectedEmployees([...selectedEmployees, employee.id]);
    } else {
      const filteredEmployees = selectedEmployees.filter((selectedEmployee) => {
        return selectedEmployee !== employee.id;
      });

      setSelectedEmployees(filteredEmployees);
    }

    console.log(selectedEmployees);
  };

  const handleEmployeeChange = (event) => {
    setNewEmployee({
      ...newEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = () => {
    const payload = { ids: selectedEmployees };

    sendDeleteRequest(
      "http://localhost:8099/api/v1/employees",
      "delete",
      payload,
      getAllEmployees
    );
  };

  const handleEmployeeSubmit = (event) => {
    event.preventDefault();

    sendPostRequest(
      "http://localhost:8099/api/v1/employees",
      "post",
      newEmployee,
      getAllEmployees
    );
  };

  useEffect(() => {
    sendGetRequest(
      "http://localhost:8099/api/v1/employees",
      "get",
      null,
      getAllEmployees
    );
  }, []);

  return (
    <div className="vw-100 vh-100">
      <div className="col-sm-10 mx-auto mt-4">
        <form>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Select</th>
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
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={(event) =>
                            handleCheckboxChange(event, employee)
                          }
                        />
                      </td>
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
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </form>

        <h3 className="mt-5">Add new employee</h3>
        <form onSubmit={handleEmployeeSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={newEmployee.firstName}
              onChange={handleEmployeeChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={newEmployee.lastName}
              onChange={handleEmployeeChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Employee No</label>
            <input
              type="text"
              name="employeeNo"
              className="form-control"
              value={newEmployee.employeeNo}
              onChange={handleEmployeeChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={newEmployee.dob}
              onChange={handleEmployeeChange}
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Employee;
