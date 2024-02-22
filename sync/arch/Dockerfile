# Use an official Node runtime as a parent image
FROM debian:latest


RUN ln -sf /usr/share/zoneinfo/America/Halifax /etc/localtime

# Install install apt-mirror because the ftpsync sucks.
RUN apt-get update && \
    apt-get install -y rsync cron && \ 
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /app

COPY arch-mirror-cron /etc/cron.d/arch-mirror-cron
RUN chmod 0754 /etc/cron.d/arch-mirror-cron &&  crontab /etc/cron.d/arch-mirror-cron


ENTRYPOINT ["cron", "-f"]

