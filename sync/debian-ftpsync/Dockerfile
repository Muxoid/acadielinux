# Use an official Node runtime as a parent image
FROM debian:latest


# Install install apt-mirror because the ftpsync sucks.
RUN apt-get update && \
    apt-get install -y rsync cron sudo curl && \ 
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


RUN ln -sf /usr/share/zoneinfo/America/Halifax /etc/localtime

#RUN chmod 0644 /etc/cron.d/ftpsync-cron &&  crontab /etc/cron.d/ftpsync-cron

# Create a new user 'myuser' with a home directory
RUN useradd -m -s /bin/bash ftpsync
WORKDIR /home/ftpsync

COPY ftpsync-crontab /etc/cron.d/ftpsync-crontab
RUN chmod 0754 /etc/cron.d/ftpsync-crontab &&  crontab /etc/cron.d/ftpsync-crontab


RUN crontab /etc/cron.d/ftpsync-crontab

# Set the working directory to the new user's home directory


USER root



ENTRYPOINT ["cron", "-f"]

