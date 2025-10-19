package ems.project.ems_project.Services.EmpServImp;

import ems.project.ems_project.DTO.EmployeeDto;
import ems.project.ems_project.Mapper.EmployeeMapper;
import ems.project.ems_project.Model.Employee;
import ems.project.ems_project.Repository.EmployeeRepository;
import ems.project.ems_project.Services.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmpServiceImp implements EmployeeService {
    private EmployeeRepository employeeRepository;
    public EmployeeDto createEmployee(EmployeeDto employeeDto){
        Employee employee=new EmployeeMapper().EmpDtoToEmp(employeeDto);
        Employee employee1=employeeRepository.save(employee);
        return new EmployeeMapper().EmpToEmpDTO(employee1);
    }

    @Override
    public void deleteEmployee(Long id) {
         employeeRepository.deleteById(id);
    }
}
