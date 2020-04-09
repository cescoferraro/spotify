FROM  mhart/alpine-node:latest
WORKDIR /srv/acharh
RUN npm i express@5.0.0-alpha.5
RUN npm i compression 
RUN npm i morgan 
ADD ./ /srv/acharh/
CMD ["node","server.js"]
EXPOSE 5000 
