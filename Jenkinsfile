pipeline {
    agent any

    environment {
        IMAGE_NAME = "travel-app:latest"
        CONTAINER_NAME = "travel-app-container"
    }

    stages {
        stage('Build Docker image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Run Docker container') {
            steps {
                // Остановить и удалить контейнер если уже есть
                sh '''
                    if [ $(docker ps -aq -f name=$CONTAINER_NAME) ]; then
                      docker rm -f $CONTAINER_NAME
                    fi
                    docker run -d --name $CONTAINER_NAME -p 3001:3001 $IMAGE_NAME
                '''
            }
        }
        stage('Test /travel endpoint') {
            steps {
                // Подождать немного, чтобы контейнер успел стартовать
                sh 'sleep 5'
                // Проверить доступность эндпоинта
                sh 'curl -f http://localhost:3001/travel'
            }
        }
    }
    post {
        always {
            // Остановить и удалить контейнер после завершения пайплайна
            sh '''
                if [ $(docker ps -aq -f name=$CONTAINER_NAME) ]; then
                  docker rm -f $CONTAINER_NAME
                fi
            '''
        }
    }
}
