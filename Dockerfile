FROM node:10

RUN mkdir /code
WORKDIR /code

RUN npm install -g serve

COPY package.json /code
COPY package-lock.json /code

RUN npm install

COPY . /code

RUN npm run build

EXPOSE 3000

CMD serve -l 3000 -s build