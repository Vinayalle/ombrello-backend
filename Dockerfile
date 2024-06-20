# Use the latest Node.js LTS version
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of your application’s code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Command to run the application
CMD ["nodemon", "index.js"]
