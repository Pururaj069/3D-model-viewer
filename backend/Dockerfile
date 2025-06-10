FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy all files into the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "server.js"]
