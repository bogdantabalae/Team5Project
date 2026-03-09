package com.gamestoreprototype.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamestoreprototype.backend.model.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
}
