//General Imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

//Context Imports
import { EmployeeProvider } from "./context/EmployeeContext";
import { EmployeeInfoProvider } from "./context/EmployeeInfoProvider";
import { RequestInfoProvider } from "./context/RequestInfoProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <EmployeeInfoProvider>
            <RequestInfoProvider>
                <App />
            </RequestInfoProvider>
          </EmployeeInfoProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
