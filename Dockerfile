# CCProyect

FROM    ubuntu:latest
MAINTAINER Rosendo Ismael Fernandez Perez <elendil.capt.gondor@gmail.com> Version: 1.0

RUN apt-get -y update
RUN apt-get -y install sudo

# Instalar todos los paquetes necesarios para poder realizar realizar el proyecto de CC
RUN sudo apt-get install -y git 
RUN git clone https://github.com/lrdzero/CCProyect.git /home/CCProyect
RUN cd /home/CCProyect
RUN npm install
