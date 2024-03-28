FROM node
WORKDIR /print-demo
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]