#!/bin/bash
echo "Starting Workable Backend..."
echo ""
echo "Make sure you have:"
echo "1. Java 17+ installed"
echo "2. MySQL running on localhost:3306"
echo "3. Database 'workable_db' created"
echo ""
echo "Starting application..."
mvn spring-boot:run
