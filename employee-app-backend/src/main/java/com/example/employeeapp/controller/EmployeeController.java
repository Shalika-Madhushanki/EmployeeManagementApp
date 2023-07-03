package com.example.employeeapp.controller;

import com.example.employeeapp.exception.ResourceNotFoundException;
import com.example.employeeapp.model.Employee;
import com.example.employeeapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;

    //get all employees
    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return repository.findAll();
    }

    //create employee
    @PostMapping("employees")
    public Employee createEmplpyee(@RequestBody Employee emp) {
        return repository.save(emp);
    }

    //get employees by id
    @GetMapping("employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No employee found with id : " + id));
        return ResponseEntity.ok(employee);
    }
    //update employee
    @PutMapping("employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Employee emp = repository.findById(id).orElseThrow(()-> new ResourceNotFoundException("No employee found with id : "+ id));
        emp.setEmailId(employee.getEmailId());
        emp.setFirstName(employee.getFirstName());
        emp.setLastName(employee.getLastName());
        Employee updatedEmp = repository.save(emp);
        return ResponseEntity.ok(updatedEmp);
    }

    //delete employee endpoint
     @DeleteMapping("employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        Employee employee = repository.findById(id).orElseThrow(()-> new ResourceNotFoundException("No employee found with id : " + id));
        repository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
