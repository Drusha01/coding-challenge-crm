- docker buildx build -t crm-app:1.0 coding-challenge-crm
- docker run -p 8080:80 crm-app:1.0


for raw laravel set up

must have 
- php 8.2^
- node v20.11.1
- sql or mysql

- make sure .env file exist if not copy the .env.sameple file in the folder create a .env file
- composer install
- if using mysql > create database with the same name indicated on your .env file
- php artisan migrate:fresh
- npm install 
- npm run dev

done


