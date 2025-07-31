FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd

WORKDIR /app

# Copy dependency files first for better caching
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-dev --optimize-autoloader

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy application code
COPY . .


# Set up Laravel directories and permissions
RUN mkdir -p /app/storage/logs /app/storage/framework/cache /app/storage/framework/sessions /app/storage/framework/views /app/bootstrap/cache /app/database
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache /app/database
RUN chmod -R 775 /app/storage /app/bootstrap/cache /app/database

# Build frontend assets
RUN npm run build

# Set up database and run migrations
RUN touch /app/database/database.sqlite
RUN chown www-data:www-data /app/database/database.sqlite
RUN chmod 664 /app/database/database.sqlite
RUN php artisan migrate:fresh --seed --force

# Clean up npm dependencies to reduce image size
RUN npm cache clean --force && rm -rf node_modules

EXPOSE 8000

CMD ["php", "start-server.php"]
