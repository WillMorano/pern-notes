#!/bin/bash

# Set database connection parameters
DB_NAME="postgres"

# Path to the SQL file to load
SQL_FILE="scripts/database/psql-database-delete.sql"

# Start psql and load the SQL file
psql "$DB_NAME" -f "$SQL_FILE"
