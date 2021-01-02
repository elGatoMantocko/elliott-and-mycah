FROM ubuntu
ARG env=production

RUN apt update && apt install -y curl nginx gnupg

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -

RUN apt update && apt install -y yarn nodejs

WORKDIR /home/mycah_and_elliott

COPY package.json yarn.lock ./

RUN yarn install

COPY app ./app
COPY tsconfig.json webpack.config.ts ./

RUN NODE_ENV=${env} yarn build

COPY nginx.conf /etc/nginx/sites-enabled
COPY dist /var/www/html

CMD nginx -g "daemon off;"
