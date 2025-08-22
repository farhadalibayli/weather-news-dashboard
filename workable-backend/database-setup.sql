-- Workable Backend Database Setup
-- Run this script in your MySQL client to create the database

-- Create the database
CREATE DATABASE IF NOT EXISTS workable_db;

-- Use the database
USE workable_db;

-- The tables will be created automatically by Hibernate when the application starts
-- with spring.jpa.hibernate.ddl-auto=update

-- You can verify the tables were created by running:
-- SHOW TABLES;

-- Expected tables:
-- - users
-- - todos
-- - weather_data
-- - news_articles
