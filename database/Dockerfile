# Image de base : PostgreSQL 15 sur Alpine
FROM postgres:15-alpine

# Copier le script d'initialisation dans le dossier d'init de PostgreSQL
COPY init.sql /docker-entrypoint-initdb.d/

# Exposer le port PostgreSQL
EXPOSE 5432
