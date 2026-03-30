package ems.project.ems_project.controller;

import ems.project.ems_project.DTO.EmployeeDto;
import ems.project.ems_project.Services.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private EmployeeService employeeService;
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmpl=employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmpl, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
    }
}
