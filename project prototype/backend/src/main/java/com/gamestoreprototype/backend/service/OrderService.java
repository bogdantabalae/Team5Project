package com.gamestoreprototype.backend.service;

import com.gamestoreprototype.backend.dto.BuyRequest;
import com.gamestoreprototype.backend.model.*;
import com.gamestoreprototype.backend.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final GameCodeRepository gameCodeRepo;
    private final OrderRepository orderRepo;
    private final GameRepository gameRepo;
    private final UserRepository userRepo;

    public OrderService(GameCodeRepository gameCodeRepo,
                        OrderRepository orderRepo,
                        GameRepository gameRepo,
                        UserRepository userRepo) {
        this.gameCodeRepo = gameCodeRepo;
        this.orderRepo = orderRepo;
        this.gameRepo = gameRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public String buyGame(BuyRequest request) {
System.out.println("Received request - userId: " + request.getUserId() + ", gameId: " + request.getGameId());
        // 1. Find unsold code
        GameCode code = gameCodeRepo
                .findFirstAvailableByGameId(request.getGameId())
                .orElseThrow(() -> new RuntimeException("Game out of stock"));

        // 2. Mark code as sold
        code.setSold(true);
        code.setSoldAt(LocalDateTime.now());

        // 3. Create order
        Order order = new Order();
        order.setUser(userRepo.findById(request.getUserId()).orElseThrow());
        order.setGame(gameRepo.findById(request.getGameId()).orElseThrow());
        order.setGameCode(code);
        order.setTotalPrice(order.getGame().getPrice());
        order.setCreatedAt(LocalDateTime.now());

        // 4. Save order
        orderRepo.save(order);

        // 5. Return actual game key
        return code.getCode();
    }
}