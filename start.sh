#!/bin/bash

# Ensure database directory exists
mkdir -p /app/database

# Create SQLite database if it doesn't exist
if [ ! -f /app/database/database.sqlite ]; then
    echo "Creating SQLite database..."
    touch /app/database/database.sqlite
    chmod 664 /app/database/database.sqlite
    chown www-data:www-data /app/database/database.sqlite
fi

# Clear previous caches
echo "Clearing old caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Check database state
echo "Checking if database needs seeding..."
if ! ./check-db.sh; then
    echo "Database needs fresh setup, running migration and seeding..."

    # Install dev dependencies temporarily for seeding (if not already installed)
    if ! php -r "exit(class_exists('Faker\Factory') ? 0 : 1);" 2>/dev/null; then
        echo "Installing dependencies needed for seeding..."
        composer install --dev --no-scripts --optimize-autoloader
    fi

    # Drop all tables and recreate with fresh data
    php artisan migrate:fresh --force

    # Seed the database
    echo "Seeding the database..."
    php artisan db:seed --force

    # Verify seeding worked
    echo "Verifying seeding..."
    if ./check-db.sh; then
        echo "Database successfully seeded!"

        # Clean up dev dependencies
        if [ "$APP_ENV" = "production" ]; then
            echo "Cleaning up dev dependencies..."
            composer install --no-scripts --no-dev --optimize-autoloader
        fi
    else
        echo "Warning: Database seeding may have failed"
    fi
else
    echo "Database already has data, running migrations only..."
    php artisan migrate --force
fi

# Cache configurations
echo "Caching configurations..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions for database
chown -R www-data:www-data /app/database
chmod -R 775 /app/database

# Start the server
echo "Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=8000
