# Use an official Node runtime as a parent image
FROM node:24.4.0-bookworm-slim

RUN ln -sf /usr/share/zoneinfo/America/Halifax /etc/localtime

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install any needed packages
RUN npm install --verbose

# Install any needed packages including vnStat
# Update the package listings, install vnStat, and clean up apt cache to keep the image size down
RUN apt-get update && \
  apt-get install -y vnstat bash && \
  vnstatd -n -d && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Bundle app source inside the Docker image
COPY . .


RUN useradd -m -s /bin/bash www

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

USER www

# Run the app when the container launches
CMD ["/bin/bash", "-c", "echo $BASH_VERSION && export PATH=$PATH:/usr/src/app/node_modules && echo $PATH && npm start"]

