pipeline {
    agent any
    environment {
        PATH          = "C:\\Program Files\\nodejs\\;${env.PATH}"
        DOCKER_IMAGE  = "ruanitro/nextjs-frontend"
        TAG           = "1.0"
        FRONTEND_API_URL = "http://nestjs:3000"
    }
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('install') {
            steps {
                bat 'npm install'
            }
        }
        stage('build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('build image') {
            steps {
                bat """
                  docker build \
                    --build-arg NEXT_PUBLIC_API_URL=%FRONTEND_API_URL% \
                    -t %DOCKER_IMAGE%:%TAG% \
                    .
                """
            }
        }
        stage('docker push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker_cred',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_PASSWORD'
                )]) {
                    bat """
                        docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%
                        docker tag %DOCKER_IMAGE%:%TAG% %DOCKERHUB_USERNAME%/%DOCKER_IMAGE%:%TAG%
                        docker push %DOCKERHUB_USERNAME%/%DOCKER_IMAGE%:%TAG%
                        docker logout
                    """
                }
            }
        }
    }
}