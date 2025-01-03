FROM php:8.2-apache

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    libzip-dev \
    zip \
    curl \
    git

# Enable mod_rewrite
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip

# Set the ServerName globally to suppress the warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Set the Apache DocumentRoot to the Laravel public folder
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Update Apache configuration to use the new DocumentRoot
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy the application code to the container
COPY . /var/www/html

# Set the working directory inside the container
WORKDIR /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install project PHP dependencies using Composer
RUN composer install

# Install Node.js and npm for frontend dependencies
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Install frontend dependencies using npm
RUN npm install

# Set the correct permissions for Laravel directories
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose the default Apache port
EXPOSE 8080

# Command to run Apache in the foreground
CMD ["apache2ctl", "-D", "FOREGROUND"]
