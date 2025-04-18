-- users table
CREATE TABLE IF NOT EXISTS User (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_username TEXT NOT NULL UNIQUE,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_introduction TEXT
);

-- chatrooms table
CREATE TABLE IF NOT EXISTS chatrooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  intro TEXT UNIQUE NOT NULL
);

-- Insert default chatrooms
INSERT INTO chatrooms (name, intro) VALUES ('Computer Science','Welcome to the Computer Science Chat Group, a vibrant community where technology enthusiasts, programmers, and learners come together to explore the fascinating world of computing. This group is a hub for discussing ideas, solving problems, and sharing knowledge on a wide range of topics within computer science.');
INSERT INTO chatrooms (name, intro) VALUES ('Business', 'Welcome to the Business Chat Group for university students, a space designed to connect aspiring professionals, budding entrepreneurs, and curious minds. This group is the perfect place to explore business concepts, share insights, and collaborate with peers on academic and real-world topics.');
INSERT INTO chatrooms (name, intro) VALUES ('Law', 'The law affects every aspect of our lives; it governs our conduct from the cradle to the grave and its influence even extends from before our birth to after our death.');

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chatroom_id INTEGER NOT NULL,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chatroom_id) REFERENCES chatrooms(id)
);


CREATE TABLE IF NOT EXISTS Post (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_content TEXT NOT NULL,
    user_username TEXT NOT NULL,
    share_amount INTEGER NOT NULL DEFAULT 0,
    view_amount INTEGER NOT NULL DEFAULT 0,
    like_amount INTEGER NOT NULL DEFAULT 0,
    post_savedindatabase INTEGER NOT NULL DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_username) REFERENCES User(user_username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Likes (
    user_username TEXT NOT NULL,
    post_id INTEGER NOT NULL,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_username, post_id),
    FOREIGN KEY (user_username) REFERENCES User(user_username) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
);

-- Table to store comments
CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INT NOT NULL,
    user_username VARCHAR(255) NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);




INSERT INTO Post (post_content, user_username, share_amount, view_amount, like_amount, post_savedindatabase, timestamp) VALUES
('The future of AI is looking bright with GPT advancements.', 'john_doe', 10, 150, 50, 0, '2023-10-01 10:00:00'),
('The new RPG is releasing next month! Get ready!', 'jane_smith', 25, 300, 100, 0,'2023-10-01 9:00:00'),
('5 Must-Read Sci-Fi Books This Year!', 'alex_wong', 5, 120, 30, 0, '2023-10-01 11:00:00');

INSERT INTO Likes (user_username, post_id) VALUES
('alex_wong', 1),
('john_doe', 2),
('jane_smith', 3);

INSERT INTO comments (post_id, user_username, comment_text, created_at)
VALUES 
(1, 'john_doe', 'This is a great post!', '2023-10-01 10:00:00'),
(1, 'jane_smith', 'I totally agree with this.', '2023-10-01 10:15:00'),
(1, 'alex_wong', 'Can you explain this further?', '2023-10-01 10:30:00'),

(2, 'john_doe', 'Nice work!', '2023-10-02 11:00:00'),
(2, 'alex_wong', 'This is very helpful.', '2023-10-02 11:30:00'),

(3, 'jane_smith', 'Thanks for sharing!', '2023-10-03 12:15:00'),
(3, 'alex_wong', 'This is an amazing read!', '2023-10-03 12:30:00'),
(3, 'john_doe', 'I highly recommend this to everyone.', '2023-10-03 12:45:00'),
(3, 'jane_smith', 'This post changed my perspective.', '2023-10-03 13:00:00'),
(3, 'alex_wong', 'Can you share more resources on this topic?', '2023-10-03 13:15:00'),
(3, 'john_doe', 'Looking forward to your next post!', '2023-10-03 13:30:00');

