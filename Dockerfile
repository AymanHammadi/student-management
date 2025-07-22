FROM php:8.2-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install system dependencies including SQLite dev headers
RUN apt-get update && apt-get install -y \
    unzip git curl zip libzip-dev libpng-dev libsqlite3-dev nodejs npm pkg-config \
    && docker-php-ext-install pdo pdo_sqlite zip

# Set working directory
WORKDIR /var/www/html

# Copy the application code including the populated SQLite database
COPY . .
COPY .env .env


RUN chown -R www-data:www-data database storage bootstrap/cache
RUN chmod -R 775 database storage bootstrap/cache


# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

# Install PHP dependencies and Node dependencies, build assets
RUN composer install --no-dev --optimize-autoloader \
    && npm install \
    && npm run build

# Set correct permissions for Laravel storage and cache directories
RUN chown -R www-data:www-data storage bootstrap/cache

# Cache configuration without running migrations or seeders
RUN php artisan config:cache

EXPOSE 80

RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf


COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Start Apache in foreground
CMD ["/entrypoint.sh"]

