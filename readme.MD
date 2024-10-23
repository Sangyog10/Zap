npx prisma studio

run postgres and kafka in docker.

for first time in kafka, to create the topic/queue
$docker exec -it 
$cd /opt/kafka/bin
$./kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
