# Set the base image
FROM node:latest

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose ports
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:dev"]
