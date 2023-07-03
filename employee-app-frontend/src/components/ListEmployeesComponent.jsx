import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import EmployeeService from "../services/EmployeeService";

export const ListEmployeesComponent = ()=> {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    useEffect(()=>{
        fetchEmployees();
    },[]);

    const fetchEmployees = async () => {
        try {
            const response = await EmployeeService.getEmployees();
            if (response.status == 200 ) {
                setEmployees(response?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
     const editEmployee = (id)=> {
         navigate(`/add-employee/${id}`);
     }

     const addEmployee = ()=> {
         navigate('/add-employee/_add');
     }

     async function deleteEmployee (id) {
        const response = await EmployeeService.deleteEmployee(id);
        try {
            if (response.status == 200 && response.data != undefined && response.data.deleted == true) {
                navigate('/employees');

                console.log("Employee is deleted successfully..");
                setEmployees(employees.filter((employee)=> employee.id !== id));

            } else {
                console.log("Error occurred deleting the employee..");

            }
        } catch (err) {
            console.log(err);
        }

     }

     const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`);

     }


         return (
             <div>
                <h2 className="text-center">
                    Employee List
                </h2>
                 <div className="row">
                     <button className="btn btn-primary" onClick={addEmployee}> Add Employee</button>
                 </div>
                 <p style={{
                     visibility: employees.length ? "hidden" : "visible",
                 }} className="text-center">No employees found</p>
                 <div style={{
                     visibility: employees.length ? "visible" : "hidden",
                 }} className="row">
                     <table className="table table-striped table-bordered">
                         <thead>
                         <tr>
                             <th> Employee First Name</th>
                             <th> Employee Last Name</th>
                             <th> Employee Email Id</th>
                             <th> Actions</th>
                         </tr>
                         </thead>
                         <tbody>
                         {
                             employees.map(
                                 employee =>
                                     <tr key = {employee.id}>
                                         <td> { employee.firstName} </td>
                                         <td> {employee.lastName}</td>
                                         <td> {employee.emailId}</td>
                                         <td>
                                             <button onClick={ () => editEmployee(employee.id)} className="btn btn-info">Update </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => viewEmployee(employee.id)} className="btn btn-info">View </button>
                                         </td>
                                     </tr>
                             )
                         }
                         </tbody>
                     </table>
                 </div>
             </div>)
}

