package com.gamestoreprototype.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamestoreprototype.backend.model.Game;
import com.gamestoreprototype.backend.service.GameService;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/games")
public class GameController {

    private final GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    // GET all games → http://localhost:8080/api/games
    @GetMapping
    public List<Game> getGames() {
        return service.getAllGames();
    }
    
    // POST add a new game → http://localhost:8080/api/games
    // Body: { "title": "FIFA 25", "description": "...", "price": 59.99, "imageUrl": "fifa25.jpg" }
    @PostMapping
    public ResponseEntity<Game> addGame(@RequestBody Game game) {
        Game saved = service.addGame(game);
        return ResponseEntity.ok(saved);
    }
}
