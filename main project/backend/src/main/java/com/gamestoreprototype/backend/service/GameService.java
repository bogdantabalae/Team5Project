package com.gamestoreprototype.backend.service;

import org.springframework.stereotype.Service;
import com.gamestoreprototype.backend.model.Game;
import com.gamestoreprototype.backend.repository.GameRepository;
import java.util.List;

@Service
public class GameService {

    private final GameRepository repo;

    public GameService(GameRepository repo) {
        this.repo = repo;
    }

    public List<Game> getAllGames() {
        return repo.findAll();
    }
}
