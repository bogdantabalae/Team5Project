package com.gamestoreprototype.backend.controller;

import com.gamestoreprototype.backend.dto.BuyRequest;
import com.gamestoreprototype.backend.service.OrderService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping("/buy")
    public ResponseEntity<String> buy(@RequestBody BuyRequest request) {
        String code = service.buyGame(request);
        return ResponseEntity.ok(code);
    }
}