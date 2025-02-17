-- Create users table
CREATE TABLE IF NOT EXISTS User (
    user_username VARCHAR(20) PRIMARY KEY,
    user_firstname VARCHAR(20) NOT NULL,
    user_lastname VARCHAR(20) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_badges TEXT
);

CREATE TABLE IF NOT EXISTS Chatroom (
    chatroom_name VARCHAR(50) PRIMARY KEY,
    chatroom_description VARCHAR(200) NOT NULL,
    chatroom_type TEXT NOT NULL,
    user_username VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_username) REFERENCES User(user_username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Messages (
    msg_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_username VARCHAR(20) NOT NULL,
    chatroom_name VARCHAR(50) NOT NULL,
    msg_content TEXT NOT NULL,
    msg_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_username) REFERENCES User(user_username) ON DELETE CASCADE,
    FOREIGN KEY (chatroom_name) REFERENCES Chatroom(chatroom_name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Post (
    post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_content TEXT NOT NULL,
    user_username VARCHAR(20) NOT NULL,
    share_amount INT NOT NULL DEFAULT 0,
    view_amount INT NOT NULL DEFAULT 0,
    like_amount INT NOT NULL DEFAULT 0,
    post_savedindatabase BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_username) REFERENCES User(user_username) ON DELETE CASCADE
);

-- Insert a test user
INSERT INTO users (email, username, password) 
VALUES ('test@example.com', 'testuser', 'password')
ON CONFLICT(email) DO NOTHING;