docker buildx build -t crm-app:1.0 coding-challenge-crm
docker run -p 8080:80 crm-app:1.0
