#!/bin/bash
brew services start postgresql

ADMIN_FILE="scripts/database/psql-database-admin.sql"

psql postgres -f "$ADMIN_FILE"

# Set database connection parameters
DB_NAME="postgres"
DB_USER="admin"
DB_PASSWORD="admin"

# Path to the SQL file to load
SQL_FILE="scripts/database/psql-database-build.sql"

# Start psql and load the SQL file
psql -U "$DB_USER" -d "$DB_NAME" -f "$SQL_FILE"
