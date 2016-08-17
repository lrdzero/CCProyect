FROM ubuntu:precise
RUN echo "deb http://archive.ubuntu.com/ubuntu precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y python-software-properties python g++ make redis-server libicu-dev libexpat1
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs
RUN cd /home/CCProyect
RUN npm isntall
EXPOSE 10550
