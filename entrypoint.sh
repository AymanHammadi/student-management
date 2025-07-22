#!/bin/bash

DB_FILE=/var/data/database.sqlite

if [ ! -f "$DB_FILE" ]; then
  echo "Creating new SQLite database..."
  touch "$DB_FILE"
  php artisan migrate --force
  php artisan db:seed --force
else
  echo "Database already exists, skipping migration and seeding."
fi

chmod 664 "$DB_FILE"
chown -R www-data:www-data /var/data

exec apache2-foreground
