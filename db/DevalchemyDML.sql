INSERT INTO Users (nickname, email, password_hash, gender, phone_number, profile_pic_ref)
VALUES
('john_doe', 'john.doe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$xdh7T4mx9v4/h5DSmvPeOw$1/fpSPFVV/3VNQMPJRZkXHkqqmvOFM3t07xLMqIejdE', 'Male', '1234567890', 'profile1.jpg'),
('jane_smith', 'jane.smith@example.com', NULL, 'Female', '0987654321', NULL),
('sam_wilson', 'sam.wilson@example.com', '$argon2id$v=19$m=65536,t=3,p=4$xfhfy1lr7X1PqXXOeU8J4Q$25gutwZhYPAnPm77NPwSUDP5jw5FZNrTTPyxv3Hit68', NULL, NULL, 'profile3.jpg'),
('emma_brown', 'emma.brown@example.com', '$argon2id$v=19$m=65536,t=3,p=4$t7YWAmBsjZESAmCsNeZ8Dw$TQ1uHiWL58seRQQb0jO5MBWIl6P50uJBVUmoU2YhTbQ', 'Female', NULL, NULL),
('admin', 'admin@admin.com', '$argon2id$v=19$m=65536,t=3,p=4$750zprTWeo+Rcq7Vuhfi/A$67MGAMXaMCvf8WrDbmuZ2+pigRmkY4Tsa4hT4vghxcI', NULL, NULL, NULL);

INSERT INTO SocialMediaAccount (social_media_name, id_user)
VALUES
('Facebook', 1),
('Twitter', 2),
('Instagram', 3);


INSERT INTO Quests (id_user_author, name, description, time_restriction)
VALUES
(1, 'Treasure Hunt Adventure', 'Find the hidden treasure in the forest.', 120.00),
(2, 'Escape the Maze', 'Solve puzzles to escape the maze.', 90.50),
(3, 'Cooking Challenge', 'Prepare a gourmet meal in under an hour.', 60.00),
(4, 'Art Contest', 'Create a masterpiece using provided materials.', NULL); -- No time restriction


INSERT INTO QuestTasks (id_quest, name, description, media_ref, scoring_max)
VALUES
(1, 'Find the Map', 'Locate the treasure map hidden near the old oak tree.', NULL, 10),
(1, 'Solve the Riddle', 'Answer the riddle on the map to find the treasure.', NULL, 20),
(2, 'Find the Exit Key', 'Search for the key hidden in the maze.', NULL, 15),
(3, 'Prepare Ingredients', 'Gather all required ingredients for cooking.', NULL, 10),
(3, 'Cook the Dish', 'Cook a gourmet dish within the time limit.', NULL, 30),
(4, 'Draw a Sketch', 'Create an initial sketch of your masterpiece.', NULL, 5);

INSERT INTO QuestTaskTestOptions (id_quest_task, correct_option, option_text)
VALUES
(2, b'1', 'The treasure is buried under the oak tree.'),
(2, b'0', 'The treasure is hidden inside a cave.'),
(2, b'0', 'The treasure is underwater.');

INSERT INTO QuestReviews (id_quest, id_user_author, title, rating, description)
VALUES
(1, 1, 'Amazing Adventure!', 9, 'I had so much fun finding the treasure!'),
(2, 2, 'Challenging but Fun!', 8, 'The maze was tricky but very rewarding.'),
(3, 3, 'Delicious Experience!', 10, 'Loved every moment of cooking.'),
(4, 4, 'Creative and Inspiring!', 7, NULL);

INSERT INTO PassedQuests (id_quest, id_user)
VALUES
(1, 1), -- John Doe completed "Treasure Hunt Adventure"
(2, 2), -- Jane Smith completed "Escape the Maze"
(3, 3); -- Sam Wilson completed "Cooking Challenge"

INSERT INTO PassedQuestTasks (id_passed_quest, score, answer_content)
VALUES
(1, 10, 'Found the map near the oak tree.'), -- Task: Find the Map (Quest: Treasure Hunt Adventure)
(1, 20, "The treasure is buried under the oak tree."), -- Task: Solve the Riddle

(2, 15, "Found the exit key hidden under a rock."), -- Task: Find the Exit Key (Quest: Escape the Maze)

(3, 10, "Prepared all ingredients on time."), -- Task: Prepare Ingredients (Quest: Cooking Challenge)
(3, 25, "Cooked a delicious gourmet dish."); -- Task: Cook the Dish
