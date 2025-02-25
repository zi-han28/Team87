-- Create users table
CREATE TABLE IF NOT EXISTS User (
    user_username TEXT PRIMARY KEY,
    user_firstname TEXT NOT NULL,
    user_lastname TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_badges TEXT
);

CREATE TABLE IF NOT EXISTS Chatroom (
    chatroom_name TEXT PRIMARY KEY,
    chatroom_description TEXT NOT NULL,
    chatroom_type TEXT NOT NULL,
    user_username TEXT NOT NULL,
    FOREIGN KEY (user_username) REFERENCES User(user_username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Messages (
    msg_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_username TEXT NOT NULL,
    chatroom_name TEXT NOT NULL,
    msg_content TEXT NOT NULL,
    msg_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_username) REFERENCES User(user_username) ON DELETE CASCADE,
    FOREIGN KEY (chatroom_name) REFERENCES Chatroom(chatroom_name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Post (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_content TEXT NOT NULL,
    user_username TEXT NOT NULL,
    share_amount INTEGER NOT NULL DEFAULT 0,
    view_amount INTEGER NOT NULL DEFAULT 0,
    like_amount INTEGER NOT NULL DEFAULT 0,
    post_savedindatabase INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_username) REFERENCES User(user_username) ON DELETE CASCADE
);

INSERT INTO User (user_username, user_firstname, user_lastname, user_email, user_password, user_badges) VALUES
('testuser', 'Test', 'User', 'test@example.com', 'password', NULL);

INSERT INTO User (user_username, user_firstname, user_lastname, user_email, user_password, user_badges) VALUES
('john_doe', 'John', 'Doe', 'john.doe@example.com', 'hashedpassword1', 'Gold, Contributor'),
('jane_smith', 'Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', 'Silver, Expert'),
('alex_wong', 'Alex', 'Wong', 'alex.wong@example.com', 'hashedpassword3', 'Bronze, Helper');

INSERT INTO Chatroom (chatroom_name, chatroom_description, chatroom_type, user_username) VALUES
('Tech Talk', 'A place to discuss technology trends.', 'public', 'john_doe'),
('Gaming Hub', 'Discuss the latest in gaming.', 'private', 'jane_smith'),
('Book Club', 'Share and discuss your favorite books.', 'public', 'alex_wong');

INSERT INTO Messages (user_username, chatroom_name, msg_content) VALUES
('john_doe', 'Tech Talk', 'Hey everyone! What do you think about AI?'),
('jane_smith', 'Gaming Hub', 'Who is excited for the new RPG game?'),
('alex_wong', 'Book Club', 'Has anyone read the latest sci-fi novel?');

INSERT INTO Post (post_content, user_username, share_amount, view_amount, like_amount, post_savedindatabase) VALUES
('The future of AI is looking bright with GPT advancements.', 'john_doe', 10, 150, 50, 1),
('The new RPG is releasing next month! Get ready!', 'jane_smith', 25, 300, 100, 1),
('5 Must-Read Sci-Fi Books This Year!', 'alex_wong', 5, 120, 30, 1);
