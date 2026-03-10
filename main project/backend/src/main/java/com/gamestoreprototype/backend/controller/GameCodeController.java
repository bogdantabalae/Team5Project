package com.gamestoreprototype.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamestoreprototype.backend.model.GameCode;
import com.gamestoreprototype.backend.service.GameCodeService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/game-codes")
public class GameCodeController {

    private final GameCodeService service;

    public GameCodeController(GameCodeService service) {
        this.service = service;
    }

    // GET all game codes
    @GetMapping
    public List<GameCode> getAllGameCodes() {
        return service.getAllGameCodes();
    }

    // POST add a new game code
    // Body: { "gameId": 1, "code": "XXXX-YYYY-ZZZZ" }
    @PostMapping
    public ResponseEntity<GameCode> addGameCode(@RequestBody Map<String, Object> body) {
        Long gameId = Long.valueOf(body.get("gameId").toString());
        String code = body.get("code").toString();
        GameCode saved = service.addGameCode(gameId, code);
        return ResponseEntity.ok(saved);
    }

    // DELETE a game code by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGameCode(@PathVariable Long id) {
        service.deleteGameCode(id);
        return ResponseEntity.ok("Game code deleted successfully");
    }
}