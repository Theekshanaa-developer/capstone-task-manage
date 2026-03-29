package com.teamflow.teamflow_backend.service;

import com.teamflow.teamflow_backend.dto.UserResponse;
import com.teamflow.teamflow_backend.entity.Role;
import com.teamflow.teamflow_backend.entity.User;
import com.teamflow.teamflow_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public User register(User user) {

        long userCount = userRepository.count();

        if (userCount == 0) {
            user.setRole(Role.ADMIN);   // First user
        } else {
            user.setRole(Role.USER);    // Others
        }

        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }


    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                ))
                .toList();
    }
}