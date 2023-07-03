import React, {useEffect, useState} from 'react';
import EmployeeService from "../services/EmployeeService";
import {useNavigate, useParams} from "react-router-dom";

export const ViewEmployeeComponent = (props) => {

    const navigate = useNavigate();
    const params = useParams();

    const [employee, setEmployee] = useState({});

    useEffect( ()=>{
        fetchEmployee()
    },[])

    const fetchEmployee = async ()=>{
        try {
            const response = await EmployeeService.getEmployeeById(params.id);
            console.log(response);
            setEmployee(response?.data);
        } catch (err) {
            console.log(err);
        }
    }


    function onCancelClick() {
        navigate('/employees');
    }

    return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Employee First Name: </label>
                            <div> { employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Last Name: </label>
                            <div> { employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Email ID: </label>
                            <div> { employee.emailId }</div>
                        </div>
                        <div className="row">
                            <button onClick={onCancelClick} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        )

}

