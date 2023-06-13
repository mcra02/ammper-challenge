.DEFAULT_GOAL := help

ifneq (,$(wildcard .env))
    -include .env
    export
endif

CURRENT_UID := $(shell id -u)
CURRENT_GID := $(shell id -g)
CURRENT_DIR := $(shell pwd)

export CURRENT_UID
export CURRENT_GID

TAG = latest
IMAGE_NAME = AMMPER
CONTAINER_NAME = ammper-app
CONTAINER_OWNER = [maicolcrodrigoa@gmail.com]

define install_server
	@echo ${CURRENT_DIR}
	cd ${CURRENT_DIR}/server && yarn
endef

define install_client
	@echo ${CURRENT_DIR}
	cd ${CURRENT_DIR}/client && yarn
endef

######## Manage containers status (default target = all)
status: ## Show containers status, use me with: make status target=api
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml ps ${target}

stop: ## Stops the docker containers, use me with: make stop target=api
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml stop ${target}

down: ## Stops and removes the docker containers, use me with: make down target=api
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml down ${target}

delete: ## Delete the docker containers, use me with: make delete target=api
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml rm -fv ${target}

up: ## Up the docker containers, use me with: make up target=api
	$(call install_server)
	$(call install_client)
	docker network create --driver bridge ammper || true
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml up -d ${target}

logs: ## Logss the docker containers, use me with: make logs target=api
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml logs -f ${target}

restart: ## Restart the docker containers, use me with: make restart target=api
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml restart ${target}

build: ## Build the docker containers, use me with: make build target=api
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml build ${target}

rebuild: # Rebuild the docker containers, use me with: make rebuild
	make stop
	make delete
	make build
	make up

exec: ## Execute command in the docker container, use me with: make exec target=api cmd=ls
	docker-compose -p ${CONTAINER_NAME}_${ENVIRON} -f docker-compose.${ENVIRON}.yaml exec ${target} ${cmd}

nestg: ## Generate module and files nestjs use me with: make nestg cmd="service example"
	cd server && nest g ${cmd}

HELP_FUN = \
    %help; while(<>){push@{$$help{$$2//'options'}},[$$1,$$3] \
    if/^([\w-_]+)\s*:.*\#\#(?:@(\w+))?\s(.*)$$/}; \
    print"$$_:\n", map"  $$_->[0]".(" "x(20-length($$_->[0])))."$$_->[1]\n",\
    @{$$help{$$_}},"\n" for keys %help; \

###### Help
.PHONY: help
help:
	@echo  'Development commands for project ${PROYECT_NAME}'
	@echo
	@echo 'Usage: make COMMAND [target=some-targets] [cms=some-commads] [revision=some-revision]'
	@echo
	@echo 'Targets:'
	@echo
	@echo '  server            API Rest'
	@echo '  client            Client PWA'
	@echo
	@echo '  default target=all'
	@echo
	@echo '༼ つ ◕_◕ ༽つ  Commands:'
	@echo
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)
	@echo