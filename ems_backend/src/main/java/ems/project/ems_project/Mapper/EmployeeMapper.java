package ems.project.ems_project.Mapper;

import ems.project.ems_project.DTO.EmployeeDto;
import ems.project.ems_project.Model.Employee;

public class EmployeeMapper {
    public  EmployeeDto EmpToEmpDTO(Employee emp){
        return new EmployeeDto(emp.getId(), emp.getFirstname(), emp.getLasttname(), emp.getUsername(), emp.getPassword());
    }
    public Employee EmpDtoToEmp(EmployeeDto empD){
        return new Employee(empD.getId(), empD.getFirstname(), empD.getLastname(), empD.getUsername(), empD.getPassword());
    }
}
