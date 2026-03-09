package com.gamestoreprototype.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamestoreprototype.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
