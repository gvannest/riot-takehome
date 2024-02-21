FROM node:21-bullseye-slim

# Set the working directory to the app directory
WORKDIR /usr/app

# Give ownership of the app directory to the node user
RUN chown -R node:node /usr/app

# Switch to the node user
USER node

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the app's source code
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Start the dev server
CMD [ "yarn", "run", "start:dev" ]
