CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nickname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARBINARY(255),
  gender VARCHAR(15),
  phone_number VARCHAR(15),
  profile_pic_ref VARCHAR(255)
);

CREATE TABLE SocialMediaAccount (
  id INT AUTO_INCREMENT PRIMARY KEY,
  social_media_name VARCHAR(50) NOT NULL,
  id_user INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES Users (id)
);

CREATE TABLE Quests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user_author INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  time_restriction DECIMAL(5,2),
  FOREIGN KEY (id_user_author) REFERENCES Users (id)
);

CREATE TABLE QuestTasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_quest INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  media_ref VARCHAR(255),
  scoring_max INT,
  FOREIGN KEY (id_quest) REFERENCES Quests (id)
);

CREATE TABLE QuestReviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_quest INT NOT NULL,
  id_user_author INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 10), -- Ensure ratings are between 1 and 5
  description VARCHAR(500),
  FOREIGN KEY (id_quest) REFERENCES Quests (id),
  FOREIGN KEY (id_user_author) REFERENCES Users (id)
);

CREATE TABLE QuestTaskTestOptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_quest_task INT NOT NULL,
  correct_option BIT NOT NULL, 
  option_text VARCHAR(50) NOT NULL,
  FOREIGN KEY (id_quest_task) REFERENCES QuestTasks (id)
);

CREATE TABLE PassedQuests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_quest INT NOT NULL,
  id_user INT NOT NULL,
  FOREIGN KEY (id_quest) REFERENCES Quests (id),
  FOREIGN KEY (id_user) REFERENCES Users (id)
);

CREATE TABLE PassedQuestTasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_passed_quest INT NOT NULL,
  score INT CHECK (score >= 0), -- Ensure score is non-negative
  answer_content VARCHAR(500) NOT NULL,
  FOREIGN KEY (id_passed_quest) REFERENCES PassedQuests (id)
);
