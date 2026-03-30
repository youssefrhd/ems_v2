package ems.project.ems_project.Services;

import ems.project.ems_project.DTO.EmployeeDto;
import ems.project.ems_project.Repository.ProductRepository;

public interface EmployeeService {
    public EmployeeDto createEmployee(EmployeeDto employeeDto);

    void deleteEmployee(Long id);
}
