package ems.project.ems_project.Services;


import ems.project.ems_project.Exceptions.ResourceNotFound;
import ems.project.ems_project.Model.User;
import ems.project.ems_project.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository, EmailService emailService){
        this.userRepository=userRepository;
    }
    public List<User> allUsers(){
        List<User> userList=new ArrayList<>();
        userRepository.findAll().forEach(userList::add);
        return userList;
    }
    public void resetPassword(String email,String password){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFound("User not found !"));

    }
}
