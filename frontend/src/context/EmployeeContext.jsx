//create context to be imported
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeContext = createContext();

export default EmployeeContext;

function setEmployeeObject(employee) {
  if (!employee) {
    return null;
  }
  return {
    user_id: employee.userId,
    employee_number: employee.employeeNumber,
    employee_first_name: employee.firstName,
    employee_last_name: employee.lastName,
    department: employee.department,
    supervisor_number: employee.supervisorNumber,
    hire_date: employee.hireDate,
    pto_balance: employee.ptoBalance,
    active: employee.active,
    isSupervisor: employee.isSupervisor,
    isAdmin: employee.isAdmin,
  }; 
}

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(setEmployeeObject);
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const registerEmployee = async (registerData) => {
    try {
      let finalData = {
        user_id: registerData.user_id,
        employee_number: registerData.employee_number,
        employee_first_name: registerData.employee_first_name,
        employee_last_name: registerData.employee_last_name,
        department: registerData.department,
        supervisor_number: registerData.supervisor_number,
        hire_date: registerData.hire_date,
        pto_balance: registerData.pto_balance,
        active: registerData.active,
        isSupervisor: registerData.isSupervisor,
        isAdmin: registerData.isAdmin
      };

      let response = await axios.post(`http://127.0.0.1:8000/api/employees/changes/`, finalData);
      // , {
      //   headers: {
      //     // Authorization: "Bearer " + token,
      //   },
      // }
      // )
      console.log(response.data)
      if (response.status === 201) {
        console.log("Successful registration as employee! Log in to access token");
        setIsServerError(false);
        navigate("/"); // navigate to home page instead login
      } else {
        navigate("/login"); //diff page than user reg
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutEmployee = () => {
    if (employee) {
      setEmployee(null);
    }
  };

  const contextData = {
    employee,
    logoutEmployee,
    registerEmployee,
    isServerError,
  };

  return (
    <EmployeeContext.Provider value={contextData}>{children}</EmployeeContext.Provider>
  );
};