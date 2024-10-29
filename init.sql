CREATE DATABASE myflaskapp;
USE myflaskapp;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    email varchar(255),
    username varchar(255),
    password varchar(255)
);

INSERT INTO users VALUES
(null, "juan", "juan@gmail.com", "juan", "123"),
(null, "maria", "maria@gmail.com", "maria", "456"),
(null, "pedro", "pedro@gmail.com", "pedro", "789"),
(null, "ana", "ana@gmail.com", "ana", "101112"),
(null, "luis", "luis@gmail.com", "luis", "131415");

CREATE TABLE computers (
    ref varchar(255) NOT NULL,
    user_id int NOT NULL,
    gpu varchar(255) NOT NULL,
    cpu varchar(255) NOT NULL,
    ram varchar(255) NOT NULL,
    PRIMARY KEY (ref, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO computers VALUES
("comp1", 1, "NVIDIA GTX 1080", "Intel i7", "16GB"),
("comp2", 2, "AMD Radeon RX 580", "AMD Ryzen 5", "8GB"),
("comp3", 3, "NVIDIA GTX 1070", "Intel i5", "16GB"),
("comp4", 4, "NVIDIA GTX 1060", "Intel i3", "8GB"),
("comp5", 5, "AMD Radeon RX 570", "AMD Ryzen 3", "8GB"),
("comp6", 1, "NVIDIA RTX 2080", "Intel i9", "32GB"),
("comp7", 2, "AMD Radeon RX 590", "AMD Ryzen 7", "16GB"),
("comp8", 3, "NVIDIA GTX 1050", "Intel i3", "4GB"),
("comp9", 4, "NVIDIA GTX 1660", "Intel i5", "8GB"),
("comp10", 5, "AMD Radeon RX 560", "AMD Ryzen 5", "8GB");