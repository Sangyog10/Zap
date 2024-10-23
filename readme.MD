## Run PostgreSQL Locally

To run PostgreSQL locally using Docker, use the following command:

```bash
docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

## Run Kafka in Docker

To run Kafka locally using Docker, use the following command:

```bash
docker run -d -p 9092:9092 apache/kafka:3.7.1
```

## Create Kafka Topic (First Time Setup)

To create a topic/queue in Kafka for the first time, follow these steps:

1. Enter the Kafka container:

   ```bash
   docker exec -it <container_id> /bin/bash
   ```

2. Navigate to the Kafka binary directory:

   ```bash
   cd /opt/kafka/bin
   ```

3. Create the topic named `quickstart-events`:

   ```bash
   ./kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
   ```

Replace `<container_id>` with your Kafka container's ID.

% npx prisma studio

```

```
