-- Creation file for the code store project prototype (main group project year 3 semester 2)
-- schema contain 4 tables ( users, games, game codes and orders)
-- this schema is for presentation and testing purposes 

-- Set the default storage engine
set default_storage_engine=InnoDB;

-- delete the DB if it exists
drop database if exists code_store_prototype;

-- create a new database/schema
create database code_store_prototype character set utf8mb4 collate utf8mb4_unicode_ci;

-- select the code_store_prototype database
use code_store_prototype;

-- create the users table with appropriate columns
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- email must be unique
-- password will store hashed password

-- create the games table with appropriate columns
CREATE TABLE games (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DECIMAL(10,2) for money
-- image_url lets frontend show image
-- description optional

-- create the game_codes table with appropriate columns
CREATE TABLE game_codes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    game_id BIGINT NOT NULL,
    code VARCHAR(255) NOT NULL,
    is_sold BOOLEAN DEFAULT FALSE,
    sold_at TIMESTAMP NULL,

    FOREIGN KEY (game_id) REFERENCES games(id)
        ON DELETE CASCADE
);
-- Each game has many codes
-- is_sold prevents double selling

-- create the orders table with appropriate columns
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    game_id BIGINT NOT NULL,
    game_code_id BIGINT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (game_code_id) REFERENCES game_codes(id)
);


-- inserts into the tables
 
INSERT INTO games (title, description, price, image_url)
VALUES 
('FIFA 24', 'Football simulation game by EA Sports', 59.99, 'fifa24.jpg'),
('Call of Duty MW3', 'Modern Warfare 3 action shooter', 69.99, 'mw3.jpg'),
('Minecraft', 'Sandbox building and survival game', 29.99, 'minecraft.jpg');

INSERT INTO users (email, password, role)
VALUES
('admin@gamestore.com', 'admin123', 'ADMIN'),
('user1@email.com', 'password123', 'USER'),
('user2@email.com', 'password123', 'USER');

INSERT INTO game_codes (game_id, code)
VALUES
(1, 'FIFA-AAAA-BBBB-1111'),
(1, 'FIFA-CCCC-DDDD-2222'),
(1, 'FIFA-EEEE-FFFF-3333'),

(2, 'COD-AAAA-BBBB-4444'),
(2, 'COD-CCCC-DDDD-5555'),

(3, 'MC-AAAA-BBBB-6666'),
(3, 'MC-CCCC-DDDD-7777');
