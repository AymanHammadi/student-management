#!/bin/bash

# Create SQLite database if it doesn't exist
if [ ! -f /app/database/database.sqlite ]; then
    echo "Creating SQLite database..."
    touch /app/database/database.sqlite
    chmod 664 /app/database/database.sqlite
fi

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Cache configurations for better performance
echo "Caching configurations..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start the server
echo "Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=8000
