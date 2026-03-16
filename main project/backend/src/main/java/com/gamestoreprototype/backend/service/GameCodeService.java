package com.gamestoreprototype.backend.service;

import org.springframework.stereotype.Service;
import com.gamestoreprototype.backend.model.Game;
import com.gamestoreprototype.backend.model.GameCode;
import com.gamestoreprototype.backend.repository.GameCodeRepository;
import com.gamestoreprototype.backend.repository.GameRepository;

import java.util.List;

@Service
public class GameCodeService {

    private final GameCodeRepository gameCodeRepo;
    private final GameRepository gameRepo;

    public GameCodeService(GameCodeRepository gameCodeRepo, GameRepository gameRepo) {
        this.gameCodeRepo = gameCodeRepo;
        this.gameRepo = gameRepo;
    }

    // Get all game codes
    public List<GameCode> getAllGameCodes() {
        return gameCodeRepo.findAll();
    }

    // Add a new game code for a specific game
    public GameCode addGameCode(Long gameId, String code) {
        Game game = gameRepo.findById(gameId)
            .orElseThrow(() -> new RuntimeException("Game not found with id: " + gameId));

        GameCode gameCode = new GameCode();
        gameCode.setCode(code);
        gameCode.setGame(game);
        gameCode.setSold(false);

        return gameCodeRepo.save(gameCode);
    }

    // Update the code string of an existing game code
    public GameCode updateGameCode(Long id, String newCode) {
        GameCode gameCode = gameCodeRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Game code not found with id: " + id));

        gameCode.setCode(newCode);
        return gameCodeRepo.save(gameCode);
    }

    // Delete a game code by its ID
    public void deleteGameCode(Long id) {
        if (!gameCodeRepo.existsById(id)) {
            throw new RuntimeException("Game code not found with id: " + id);
        }
        gameCodeRepo.deleteById(id);
    }
}