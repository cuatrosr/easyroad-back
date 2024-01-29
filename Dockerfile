# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the remaining application code to the working directory
COPY . .

# Build the Next.js app
RUN pnpm build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the application
CMD ["pnpm", "start"]