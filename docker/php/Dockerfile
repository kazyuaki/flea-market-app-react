FROM php:8.2-fpm

# php.iniコピー
COPY php.ini /usr/local/etc/php/

# パッケージインストール
RUN apt-get update \
    && apt-get install -y \
    default-mysql-client \
    zlib1g-dev \
    libzip-dev \
    libicu-dev \
    unzip \
    curl \
    && docker-php-ext-install \
    pdo_mysql \
    zip \
    intl                        

# Composerインストール
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# 作業ディレクトリ
WORKDIR /var/www

# Laravelコードコピー
COPY . /var/www