# Use an official Node runtime as a parent image
FROM debian:latest

WORKDIR /srv
# Install install apt-mirror because the ftpsync sucks.
RUN apt-get update && \
    apt-get install -y apt-mirror && \ 
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY mirror.list /etc/apt/mirror.list


# Set the working directory in the container



# Run the app when the container launches
CMD ["su", "-","apt-mirror", "-c", "apt-mirror"]

