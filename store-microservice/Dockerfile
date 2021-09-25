FROM php:7.4-fpm

ENV APP_DIR="/code"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip && \
    pecl install mongodb && docker-php-ext-enable mongodb

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . $APP_DIR

RUN cd $APP_DIR && composer install
CMD php artisan db:seed

WORKDIR $APP_DIR
CMD php artisan serve --host 0.0.0.0
