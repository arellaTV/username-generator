# syntax=docker/dockerfile:1.4
FROM node:lts-buster AS development
 
WORKDIR /usr/src/app
 
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
 
RUN npm ci
 
COPY . .

RUN npm run build
 
EXPOSE 5173
 
 
CMD ["npm", "run", "preview"]
 
FROM development as dev-envs
 
 
RUN <<EOF
   apt-get update
   apt-get install -y --no-install-recommends git
EOF
 
RUN <<EOF
   useradd -s /bin/bash -m vscode
   groupadd docker
   usermod -aG docker vscode
EOF
 
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "run", "preview" ]