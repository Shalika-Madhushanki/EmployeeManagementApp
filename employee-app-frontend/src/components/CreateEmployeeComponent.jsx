import React, {useEffect, useState} from 'react';
import EmployeeService from "../services/EmployeeService";
import {useNavigate, useParams} from "react-router-dom";

export const CreateEmployeeComponent = () => {
    const [employee, setEmployee] = useState({});
    const params = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [emailId, setEmailId] = useState("");
    useEffect(() => {
        fetchEmployee()
    }, [])

    const fetchEmployee = async () => {
        try {
            const response = await EmployeeService.getEmployeeById(params.id);
            console.log(response)
            setEmployee(response?.data);
            setFirstName(response?.data.firstName);
            setlastName(response?.data?.lastName);
            setEmailId(response?.data?.emailId);
        } catch (err) {
            console.log(err);
        }
    }


    const navigate = useNavigate();


    function changeFirstNameHandler(event) {
        setFirstName(event.target.value);
    }

    function changeLastNameHandler(event) {
        setlastName(event.target.value);
    }

    function changeEmailIdHandler(event) {
        setEmailId(event.target.value);
    }

    async function saveForm(e) {
        e.preventDefault();

        let employee = {firstName: firstName, lastName: lastName, emailId: emailId, id: 193};

        try {
            if (params.id == '_add') {
                const response = await EmployeeService.createEmployee(employee);
                navigate('/employees')
                console.log(response);

            } else {
                const response = await EmployeeService.updateEmployee(employee, params.id);
                navigate('/employees')
                console.log(response);

            }

        } catch (err) {
            console.log(err)
        }
    }

    function cancelForm() {
        navigate('/employees')
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center"> Add Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name : </label>
                                    <input className="form-control" name="firstName" placeholder="First Name"
                                           value={firstName} onChange={changeFirstNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name : </label>
                                    <input className="form-control" name="lastName" placeholder="Last Name"
                                           value={lastName} onChange={changeLastNameHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Email : </label>
                                    <input className="form-control" name="emailId" placeholder="Email" value={emailId}
                                           onChange={changeEmailIdHandler}/>
                                </div>
                                <button className="btn btn-success" onClick={saveForm}>Submit</button>
                                <button className="btn btn-danger" onClick={cancelForm}
                                        style={{marginLeft: "10px"}}>Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

