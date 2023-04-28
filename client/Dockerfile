# Set the base image
FROM node:latest

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

RUN npm run build

# Expose ports
EXPOSE 5173

# Start the app
CMD ["npm", "run" ,"dev"]
