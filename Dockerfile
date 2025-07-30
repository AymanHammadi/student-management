FROM php:8.2-fpm

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
    npm

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo_sqlite mbstring

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-scripts

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Create .env file from example
RUN cp .env.example .env

# Set up Laravel storage permissions and environment
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache
RUN chmod -R 775 /app/storage /app/bootstrap/cache

# Create database directory and set DB path
RUN mkdir -p /app/database
ENV DB_DATABASE=/app/database/database.sqlite

RUN npm run build
RUN php artisan key:generate --force
RUN php artisan migrate:fresh --seed --force

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port", "8000"]
