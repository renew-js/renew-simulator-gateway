FROM node:current-slim

RUN apt update -q
RUN apt install git haskell-platform -yq
RUN curl -sSL https://get.haskellstack.org/ | sh

WORKDIR /usr/gateway
RUN chown node:node /usr/gateway

USER node

RUN git clone https://git.informatik.uni-hamburg.de/tgipublic/ccpn/ccpn
RUN cd ccpn && git submodule update --init --recursive
RUN cd ccpn && stack update && stack setup && make all

USER root
RUN ln -s /usr/gateway/ccpn/bin/ccpn /usr/local/bin/ccpn
USER node

COPY --chown=node:node package.json .
COPY --chown=node:node src ./src

RUN npm install --quiet

RUN cd node_modules/renew-simulator-ccpn && npm install git+https://github.com/renew-js/renew-simulator-gateway
