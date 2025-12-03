-- MySQL Schema for Smart Attendance System

CREATE DATABASE IF NOT EXISTS smart_attendance;
USE smart_attendance;

-- Create the users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','faculty','student') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB;

-- Create the faculty details table
CREATE TABLE IF NOT EXISTS `faculty_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `branch` VARCHAR(255) DEFAULT NULL,
  `semester` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `faculty_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the students table
CREATE TABLE IF NOT EXISTS `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `branch` varchar(255) NOT NULL,
  `semester` int NOT NULL,
  `section` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the subjects table with new columns
CREATE TABLE IF NOT EXISTS `subjects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `course_code` VARCHAR(50) NOT NULL,
    `branch` VARCHAR(255) NOT NULL, -- New Field
    `semester` INT NOT NULL,       -- New Field
    UNIQUE KEY `unique_subject` (`course_code`, `branch`, `semester`) -- Ensures a subject is unique per branch and semester
) ENGINE=InnoDB;

-- Other tables...
CREATE TABLE IF NOT EXISTS `class_sessions` ( `id` INT AUTO_INCREMENT PRIMARY KEY, `faculty_id` INT NOT NULL, `subject_id` INT NOT NULL, `branch` VARCHAR(255) NOT NULL, `semester` INT NOT NULL, `section` VARCHAR(50) NOT NULL, `session_date` DATE NOT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (faculty_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE ) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `session_tokens` ( `id` INT AUTO_INCREMENT PRIMARY KEY, `session_id` INT NOT NULL, `token` VARCHAR(512) NOT NULL, `expires_at` TIMESTAMP NOT NULL, FOREIGN KEY (session_id) REFERENCES class_sessions(id) ON DELETE CASCADE ) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `attendance` ( `id` INT AUTO_INCREMENT PRIMARY KEY, `student_id` INT NOT NULL, `session_id` INT NOT NULL, `scan_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, UNIQUE(`student_id`, `session_id`), FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (session_id) REFERENCES class_sessions(id) ON DELETE CASCADE ) ENGINE=InnoDB;

-- Truncate tables before inserting sample data to avoid duplicates on re-run
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `faculty_details`;
TRUNCATE TABLE `students`;
TRUNCATE TABLE `subjects`;
SET FOREIGN_KEY_CHECKS = 1;

-- --- SAMPLE DATA --- --
INSERT INTO `users` (id, username, password_hash, `role`) VALUES (1, 'admin', 'admin123', 'admin'), (2, 'FAC001', 'faculty123', 'faculty'), (3, 'STU001', 'student123', 'student');
INSERT INTO `faculty_details` (user_id, name, department) VALUES (2, 'Dr. John Smith', 'CSE');
INSERT INTO `students` (user_id, name, branch, semester, section) VALUES (3, 'Jane Doe', 'CSE', 1, 'A');
INSERT INTO `subjects` (name, course_code, branch, semester) VALUES ('Theory of Computation', 'CS-501', 'CSE', 5), ('Database Management Systems', 'CS-502', 'CSE', 5);
