# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd zip \
    && a2enmod rewrite \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node.js dependencies and build frontend assets
RUN npm ci --only=production \
    && npm run build \
    && rm -rf node_modules

# Configure Apache
RUN echo '<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
    </VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Create startup script
RUN echo '#!/bin/bash\n\
    set -e\n\
    \n\
    # Generate application key if not set\n\
    if [ -z "$APP_KEY" ]; then\n\
    php artisan key:generate --force\n\
    fi\n\
    \n\
    # Create database directory if it does not exist\n\
    mkdir -p /var/www/html/database\n\
    \n\
    # Create SQLite database file if it does not exist\n\
    if [ ! -f /var/www/html/database/database.sqlite ]; then\n\
    touch /var/www/html/database/database.sqlite\n\
    chmod 664 /var/www/html/database/database.sqlite\n\
    chown www-data:www-data /var/www/html/database/database.sqlite\n\
    fi\n\
    \n\
    # Run migrations\n\
    php artisan migrate --force\n\
    \n\
    # Seed the database if SEED_DATABASE is set to true\n\
    if [ "$SEED_DATABASE" = "true" ]; then\n\
    php artisan db:seed --force\n\
    fi\n\
    \n\
    # Cache configuration for better performance\n\
    php artisan config:cache\n\
    php artisan route:cache\n\
    php artisan view:cache\n\
    \n\
    # Start Apache\n\
    exec apache2-foreground' > /usr/local/bin/start.sh \
    && chmod +x /usr/local/bin/start.sh

# Expose port 80
EXPOSE 80

# Start the application
CMD ["/usr/local/bin/start.sh"]
