Java coursework "Car Service"

Steps to run the project.

1. git clone https://github.com/UberStreuneR/car-service.git /your/clone/directory

Then follow the instructions in "Backend" and "Frontend" sections.


Backend:

1. Make sure Java 17 is installed ($ java --version)
2. Make sure PostgreSQL is installed ($ psql --version) (project works for 14.2)
3. Make sure Apache Maven is installed ($ mvn --version) (project works for 3.8.5)
4. Log in to PostgreSQL as "postgres" user ($ psql -u postgres). Typically the password is "password", make sure it is so if that's not your case.
5. $ postgres=# CREATE DATABASE backend;
6. Open /car-service-backend/src/main/resources/application.properties and make sure "spring.datasource.username" and "spring.datasource.password" designate the appropriate credentials for your PostgreSQL user.
7. $ cd /car-service-backend
8. $ mvn install
9. $ cd target
10. $ java -jar .\CarServiceBackend-0.0.1-SNAPSHOT.jar
11. Open http://localhost:8080/api/clients to confirm the project is working, you should see JSON data.

Frontend:

1. Make sure npm is installed ($ npm --version) (project works for 8.1.2)
2. $ cd /car-service-frontend
3. $ npm install
4. $ npm start
5. Open http://localhost:3000 to interact with the project's UI.