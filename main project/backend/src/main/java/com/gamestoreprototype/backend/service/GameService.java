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

    // Get all games
    public List<Game> getAllGames() {
        return repo.findAll();
    }

    // Add a new game
    public Game addGame(Game game) {
        return repo.save(game);
    }

    // Update an existing game
    public Game updateGame(Long id, Game updatedGame) {
        Game existing = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));

        existing.setTitle(updatedGame.getTitle());
        existing.setDescription(updatedGame.getDescription());
        existing.setPrice(updatedGame.getPrice());
        existing.setImageUrl(updatedGame.getImageUrl());

        return repo.save(existing);
    }

    // Delete a game
    public void deleteGame(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Game not found with id: " + id);
        }
        repo.deleteById(id);
    }
}