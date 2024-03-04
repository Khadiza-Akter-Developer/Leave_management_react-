import React, { useState, useEffect } from "react";
import axios from "axios";
import './application.css';

const Application = () => {
    const [id, setId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("");
    const [employees, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get("http://localhost:5256/api/Application/GetAll");
        setUsers(result.data);
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:5256/api/Application/Save", {
                employeeName,
                startDate,
                endDate,
                type,
            });
            alert("Leave Application has completed successfully.");
            setId("");
            setEmployeeName("");
            setStartDate("");
            setEndDate("");
            setType("");
            Load();
        } catch (err) {
            alert(err);
        }
    }

    async function editEmployee(employees) {
        setEmployeeName(employees.employeeName);
        setStartDate(employees.startDate);
        setEndDate(employees.endDate);
        setType(employees.type);
        setId(employees.id);
    }

    async function DeleteEmployee(id) {
        await axios.delete("http://localhost:5256/api/Application/Delete/" + id);
        alert("Application deleted successfully.");
        setId("");
        setEmployeeName("");
        setStartDate("");
        setEndDate("");
        Load();
    }

    async function update(event) {
        event.preventDefault();
        try {
            const employee = employees.find(u => u.id === id);
            if (!employee) {
                throw new Error("Employee not found");
            }

            await axios.patch(`http://localhost:5256/api/Application/Update/${id}`, {
                id,
                employeeName,
                startDate,
                endDate,
                type,
            });
            alert("Successfully Updated");
            setId("");
            setEmployeeName("");
            setStartDate("");
            setEndDate("");
            setType("");
            Load();
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <>
            <div className="form">
                <h2>Fill up this form</h2>
                <form>
                    <div className="inner-form">
                        {/* <label htmlFor="id">ID:</label>
                        <input type="text" id="id" name="id" value={id} onChange={(event) => setId(event.target.value)} /> */}

                        <label htmlFor="employeeName">Employee Name:</label>
                        <input type="text" id="employeeName" name="employeeName" value={employeeName} onChange={(event) => setEmployeeName(event.target.value)} />

                        <label htmlFor="startDate">Start Date:</label>
                        <input type="date" id="startDate" name="startDate" value={startDate} onChange={(event) => setStartDate(event.target.value)} />

                        <label htmlFor="endDate">End Date:</label>
                        <input type="date" id="endDate" name="endDate" value={endDate} onChange={(event) => setEndDate(event.target.value)} />

                        <label htmlFor="type">Type:</label>
                        <input type="text" id="type" name="type" value={type} onChange={(event) => setType(event.target.value)} />
                    </div>
                    <button type="submit" onClick={save}>Submit</button>
                    <button type="update" onClick={update}>Update</button>

                </form>
            </div>
            <div className="container">
                <div className="card">
                    <div className="card-title">
                        <h2>List of Leave Application</h2>
                    </div>
                    <div className="card-body">
                        <table className="tables">
                            <thead className="test">
                                <tr>
                                    <td>ID</td>
                                    <td>Employee Name</td>
                                    <td>start Date</td>
                                    <td>End Date</td>
                                    <td>Type</td>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(function fn(employee) {
                                    return (
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.employeeName}</td>
                                            <td>{employee.startDate}</td>
                                            <td>{employee.endDate}</td>
                                            <td>{employee.type}</td>
                                            <td>
                                                <button type="edit" onClick={() => editEmployee(employee)}> Edit </button>
                                                <button type="delete" onClick={() => DeleteEmployee(employee.id)}> Delete </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Application;
