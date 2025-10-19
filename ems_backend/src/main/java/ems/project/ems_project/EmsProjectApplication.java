package ems.project.ems_project;


import org.junit.runner.RunWith;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories(basePackages = "ems.project.ems_project.Repository")
@ComponentScan(basePackages = {"ems.project.ems_project", "ems.project.ems_project.Controllers","ems.project.ems_project.Services"})
public class EmsProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmsProjectApplication.class, args);
	}

}
