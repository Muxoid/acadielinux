certbot certonly --dns-cloudflare --dns-cloudflare-credentials $CERTBOT_CRED_INI  --agree-tos --email $CERTBOT_EMAIL --non-interactive --keep-until-expiring -d *.acadielinux.ca
##

