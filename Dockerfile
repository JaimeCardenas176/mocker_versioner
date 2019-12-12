FROM node:11.12.0
LABEL Mantainer="Jaime Cárdenas Mesa <jcardenas@xmltravelgate.com>" Lang="nodejs"

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init

COPY . /mocker_online
WORKDIR mocker_online

RUN apt-get update && apt-get install -y git 
RUN git clone https://github.com/travelgateX/graphql-schema.git
RUN chown -R node:node /mocker_online \
    && rm -rf /node_modules \
    && npm install \
    && npm install copyfiles \
    && npm run compile \
    && chmod +x /usr/local/bin/dumb-init

ENV DEPLOY_MODE="prod"
ENV KEEP_ALIVE_MSECS=10000
ENV TGX_SCHEMA_PATH="graphql-schema"

# Without this node fails miserably
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
EXPOSE 3000
USER node
CMD ["node", "."]