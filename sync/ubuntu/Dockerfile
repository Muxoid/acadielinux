# Use an official Node runtime as a parent image
FROM debian:latest


# Install install apt-mirror because the ftpsync sucks.
RUN apt-get update && \
    apt-get install -y apt-mirror cron && \ 
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY apt-mirror-cron /etc/cron.d/apt-mirror-cron
RUN chmod 0644 /etc/cron.d/apt-mirror-cron &&  crontab /etc/cron.d/apt-mirror-cron

COPY mirror.list /etc/apt/mirror.list

WORKDIR /app

RUN chown -R apt-mirror:apt-mirror /app




# Set the working directory in the container



# Run the app when the container launches
CMD ["su", "-","apt-mirror", "-c", "apt-mirror"]

