# FROM node:alpine3.18
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# EXPOSE 4000
# CMD [ "npm", "start" ]


# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies, including nodemon
RUN npm install
RUN npm install -g nodemon

# Copy the rest of your application’s code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Command to run the application
CMD ["nodemon", "index.js"]
