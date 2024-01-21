# Node version 20
FROM node:20

# Path in the container where the application files will go
WORKDIR /usr/src/app

# Copy in the package files and install required packages
COPY grocer-easy/package*.json ./
RUN npm install

# Copy our app source tree into the working directory
COPY grocer-easy/ .

EXPOSE 8000

# Command to execute when the container starts
CMD ["npm", "start"]
