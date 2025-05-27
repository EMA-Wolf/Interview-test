# Use an official Node.js image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
