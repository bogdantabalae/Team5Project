package com.gamestoreprototype.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.gamestoreprototype.backend.model.GameCode;

public interface GameCodeRepository extends JpaRepository<GameCode, Long> {

    @Query(value = "SELECT * FROM game_codes WHERE game_id = :gameId AND is_sold = 0 LIMIT 1", nativeQuery = true)
    Optional<GameCode> findFirstAvailableByGameId(@Param("gameId") Long gameId);
}