# CCProyect

FROM    ubuntu:latest
MAINTAINER Rosendo Ismael Fernandez Perez <elendil.capt.gondor@gmail.com> Version: 1.0

# Instalar todos los paquetes necesarios para poder realizar realizar el proyecto de CC
RUN apt-get -y install wget
RUN wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -
RUN sudo apt-get install -y git nodejs
RUN node -v
RUN git clone https://github.com/lrdzero/CCProyect.git /home/CCProyect
RUN cd /home/CCProyect && npm install
