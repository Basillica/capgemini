FROM node:13.12.0-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
CMD ["npm", "run", "start"]