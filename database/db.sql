-- table tasks
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    lastName VARCHAR(300),
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);