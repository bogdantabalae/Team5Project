package com.gamestoreprototype.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamestoreprototype.backend.model.GameCode;
import com.gamestoreprototype.backend.service.GameCodeService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.PUT,
    RequestMethod.DELETE,
    RequestMethod.OPTIONS
})
@RequestMapping("/api/game-codes")
public class GameCodeController {

    private final GameCodeService service;

    public GameCodeController(GameCodeService service) {
        this.service = service;
    }

    // GET all game codes → http://localhost:8080/api/game-codes
    @GetMapping
    public List<GameCode> getAllGameCodes() {
        return service.getAllGameCodes();
    }

    // POST add a new game code → http://localhost:8080/api/game-codes
    // Body: { "gameId": 1, "code": "XXXX-YYYY-ZZZZ" }
    @PostMapping
    public ResponseEntity<GameCode> addGameCode(@RequestBody Map<String, Object> body) {
        Long gameId = Long.valueOf(body.get("gameId").toString());
        String code = body.get("code").toString();
        GameCode saved = service.addGameCode(gameId, code);
        return ResponseEntity.ok(saved);
    }

    // PUT update a game code → http://localhost:8080/api/game-codes/{id}
    // Body: { "code": "NEW-CODE-HERE" }
    @PutMapping("/{id}")
    public ResponseEntity<GameCode> updateGameCode(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        String newCode = body.get("code").toString();
        GameCode updated = service.updateGameCode(id, newCode);
        return ResponseEntity.ok(updated);
    }

    // DELETE a game code → http://localhost:8080/api/game-codes/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGameCode(@PathVariable Long id) {
        service.deleteGameCode(id);
        return ResponseEntity.ok("Game code deleted successfully");
    }
}