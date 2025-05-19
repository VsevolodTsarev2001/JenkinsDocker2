pipeline {
    agent any

    stages {
        stage('Build Docker image') {
            steps {
                script {
                    dockerImage = docker.build("travel-app:latest")
                }
            }
        }
        stage('Run Docker container') {
            steps {
                script {
                    dockerContainer = dockerImage.run('-d -p 3000:3000')
                }
            }
        }
        stage('Test /travel endpoint') {
            steps {
                script {
                    sleep 5
                    sh 'curl -f http://localhost:3000/travel'
                }
            }
        }
    }

    post {
        always {
            script {
                if (dockerContainer) {
                    sh "docker rm -f ${dockerContainer.id}"
                }
            }
        }
    }
}
