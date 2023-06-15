<p align="center">
    <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_quasar_icon_130213.png" width="120" alt="Maicol" />
   <img src="https://seeklogo.com/images/N/nestjs-logo-09342F76C0-seeklogo.com.png" width="120" alt="Maicol" />    
</p>

<h1 align="center">
  AMPPER CHALLENGE
</h1>

## Description

Simple challenge developed by [Maicol](https://github.com/mcra02/)  implementing nestjs, quasar framework and using the following features:

- **NodeJs** 16.x+
- **Nest** 9.4
- **API REST**
- **JWT**
- **axios**
- **async Events**
- **SWAGGER**
- **Docker** and **Docker Compose**

## Installation

1. Clone Repository

   ```bash
    git clone https://github.com/mcra02/ammper-challenge
   ```

2. Check the .env file and change the credentials of the connection url to postgresql if necessary (**postgresql://USER:PASSWORD@HOST:PORT/DATABASE**).

   You should create a database named **challenge_app**.

3. Build Docker

   ```bash
    make build
   ```

4. Run Services

   ```bash
    make up
   ```

5. Run help

   ```bash
   make
   ```
   or
   ```bash
   make help
   ```

6. Run logs

   ```bash
    make logs
   ```

7. Open API Doc http://localhost:7001/api/v1/swagger
8. Open Client http://localhost:7002/

# Author

#### [Maicol C Rodrigo](https://www.facebook.com/MaicolCRodrigo)