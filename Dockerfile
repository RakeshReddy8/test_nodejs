# Use an official Node.js runtime as a base image
FROM node:19-bullseye

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port on which the app will run
EXPOSE 80

# Define the command to run your application
CMD ["npm", "start"]
