# Use an official Node runtime as a parent image
FROM debian:latest

RUN ln -sf /usr/share/zoneinfo/America/Halifax /etc/localtime

# Install install apt-mirror because the ftpsync sucks.
RUN apt-get update && \
    apt-get install -y rsync && \ 
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


RUN useradd -m -s /bin/bash rsync


WORKDIR /app

EXPOSE 873


ENTRYPOINT ["rsync", "--daemon", "--no-detach"]

