import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

const Employee = (props) => {
  const BASE_URL_FOR_EMPLOYEE = "http://localhost:8099/api/v1/employees";
  const [employees, setEmployees] = useState(null);
  const [errorGet, sendGetRequest] = useHttp();
  const [errorDelete, sendDeleteRequest] = useHttp();
  const [errorPost, sendPostRequest] = useHttp();
  const [errorPut, sendPutRequest] = useHttp();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    employeeNo: "",
    dob: "",
  });
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const resetNewEmployee = () => {
    setNewEmployee({
      firstName: "",
      lastName: "",
      employeeNo: "",
      dob: "",
    });
  };

  const getAllEmployees = (employees) => {
    // Sort by id in ascesding order
    employees.sort((a, b) => a.id - b.id);

    setEmployees(employees);
  };

  const getEmployee = (employee) => {
    setNewEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
      employeeNo: employee.employeeNo,
      dob: employee.dob,
    });
    setEditEmployeeId(employee.id);
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

  const handleEdit = () => {
    if (selectedEmployees.length === 1) {
      sendGetRequest(
        BASE_URL_FOR_EMPLOYEE.concat("/").concat(selectedEmployees[0]),
        "get",
        null,
        getEmployee
      );
    }
  };

  const handleDelete = () => {
    const payload = { ids: selectedEmployees };

    sendDeleteRequest(
      BASE_URL_FOR_EMPLOYEE,
      "delete",
      payload,
      getAllEmployees
    );
  };

  const handleEmployeeSubmit = (event, method) => {
    event.preventDefault();

    if (method === "post") {
      sendPostRequest(
        BASE_URL_FOR_EMPLOYEE,
        "post",
        newEmployee,
        getAllEmployees
      );
    } else if (method === "put") {
      sendPutRequest(
        BASE_URL_FOR_EMPLOYEE.concat("/").concat(editEmployeeId),
        "put",
        newEmployee,
        getAllEmployees
      );
      setEditEmployeeId(null);
    }

    resetNewEmployee();
  };

  useEffect(() => {
    sendGetRequest(BASE_URL_FOR_EMPLOYEE, "get", null, getAllEmployees);
  }, []);

  return (
    <div className="vw-100 vh-100">
      <div className="col-sm-10 mx-auto mt-4">
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
          className="btn btn-success me-3"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>

        <h3 className="mt-5">Add new employee</h3>
        <form
          onSubmit={(event) => {
            let method = null;
            console.log(editEmployeeId);

            if (editEmployeeId !== null) {
              method = "put";
            } else {
              method = "post";
            }

            handleEmployeeSubmit(event, method);
          }}
        >
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
