// pipeline {
//     agent any
//     environment {
//         PATH          = "C:\\Program Files\\nodejs\\;${env.PATH}"
//         DOCKER_IMAGE  = "ruanitro/nextjs-frontend"
//         TAG           = "1.0"
//         FRONTEND_API_URL = "http://nestjs:3000"
//     }
//     stages {
//         stage('checkout') {
//             steps {
//                 checkout scm
//             }
//         }
//         stage('install') {
//             steps {
//                 bat 'npm install'
//             }
//         }
//         stage('build') {
//             steps {
//                 bat 'npm run build'
//             }
//         }
//         stage('build image') {
//             steps {
//                 bat """
//                   docker build \
//                     --build-arg NEXT_PUBLIC_API_URL=%FRONTEND_API_URL% \
//                     -t %DOCKER_IMAGE%:%TAG% \
//                     .
//                 """
//             }
//         }
//         stage('docker push') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'docker_cred',
//                     usernameVariable: 'DOCKERHUB_USERNAME',
//                     passwordVariable: 'DOCKERHUB_PASSWORD'
//                 )]) {
//                     bat """
//                         docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%
//                         docker tag %DOCKER_IMAGE%:%TAG% %DOCKERHUB_USERNAME%/%DOCKER_IMAGE%:%TAG%
//                         docker push %DOCKERHUB_USERNAME%/%DOCKER_IMAGE%:%TAG%
//                         docker logout
//                     """
//                 }
//             }
//         }
//     }
// }

pipeline {
    agent any
    environment {
        PATH = "C:/Program Files/nodejs/;${env.PATH}"
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
        // stage('test') {
        //     steps {
        //         bat 'npm run test'
        //     }
        // }
        stage('build image') {
            steps {
                bat 'docker build -t nextjs-frontend:1.0 .'
            }
        }
        stage('docker push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    bat """
                        docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%
                        docker tag nextjs-frontend:1.0 %DOCKERHUB_USERNAME%/nextjs-frontend:1.0
                        docker push %DOCKERHUB_USERNAME%/nextjs-frontend:1.0
                        docker logout
                    """
                }
            }
        }
    }
}