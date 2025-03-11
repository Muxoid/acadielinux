#!/usr/bin/env python3

import requests
import json
import sys
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
# Configuration
API_KEY = os.getenv("ABUSEIPDB_API_KEY")  # Fetch API key from .env
OUTPUT_FILE = "./abuseipdb_blacklist.rules"  # Path to output Suricata rules file
CONFIDENCE_MINIMUM = 100  # Minimum confidence score (0-100), adjust as needed
LIMIT = (
    10000  # Max number of IPs to fetch (free tier limit is 10,000 unless subscribed)
)

# AbuseIPDB API endpoint for blacklist
URL = "https://api.abuseipdb.com/api/v2/blacklist"


def fetch_abuseipdb_blacklist():
    """Fetch the blacklist from AbuseIPDB API."""
    headers = {"Key": API_KEY, "Accept": "application/json"}
    params = {"confidenceMinimum": CONFIDENCE_MINIMUM, "limit": LIMIT}

    try:
        response = requests.get(URL, headers=headers, params=params)
        response.raise_for_status()  # Raise an exception for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching blacklist from AbuseIPDB: {e}")
        sys.exit(1)


def generate_suricata_rules(data, output_file):
    """Generate a Suricata-compatible IP reputation file from the blacklist data."""
    if "data" not in data or not data["data"]:
        print("No data returned from AbuseIPDB.")
        sys.exit(1)

    # Open the output file
    with open(output_file, "w") as f:
        # Write header with timestamp
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"# Suricata IP Blacklist generated from AbuseIPDB on {timestamp}\n")
        f.write(
            '# Format: drop ip <src_ip> any -> any any (msg:"AbuseIPDB Blacklisted IP"; sid:<unique_id>; rev:1;)\n\n'
        )

        # Generate a unique SID starting point
        sid_base = 9000000  # Custom SID range to avoid conflicts with other rules
        for index, entry in enumerate(data["data"], start=1):
            ip = entry["ipAddress"]
            confidence = entry["abuseConfidenceScore"]
            last_reported = entry.get("lastReportedAt", "N/A")

            # Write Suricata rule
            rule = (
                f"alert ip {ip} any -> any any "
                f'(msg:"AbuseIPDB Blacklisted IP - Confidence: {confidence}, Last Reported: {last_reported}"; '
                f"sid:{sid_base + index}; rev:1;)"
            )
            f.write(f"{rule}\n")

    print(f"Generated Suricata blacklist with {len(data['data'])} IPs at {output_file}")


def main():
    # Fetch the blacklist
    blacklist_data = fetch_abuseipdb_blacklist()

    # Generate Suricata rules
    generate_suricata_rules(blacklist_data, OUTPUT_FILE)

    # Optional: Reload Suricata rules (uncomment and adjust if needed)
    # os.system("suricata -T")  # Test config
    # os.system("systemctl reload suricata")  # Reload Suricata service


if __name__ == "__main__":
    # Check if API key is set
    if API_KEY == "YOUR_ABUSEIPDB_API_KEY":
        print(
            "Error: Please replace 'YOUR_ABUSEIPDB_API_KEY' with your actual AbuseIPDB API key."
        )
        sys.exit(1)

    main()
