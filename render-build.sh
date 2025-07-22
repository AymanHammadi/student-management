#!/usr/bin/env bash

# Install PHP and Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Laravel build
composer install --no-interaction --prefer-dist --optimize-autoloader
npm install
npm run build

# Prepare SQLite
mkdir -p database
touch database/database.sqlite

# Migrate and seed
php artisan migrate --force --seed
php artisan config:cache
