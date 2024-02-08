

interface NginxStatus {
  activeConnections: number;
  accepts: number;
  handled: number;
  requests: number;
  reading: number;
  writing: number;
  waiting: number;
}

// Function to parse NGINX status response to JSON
function parseNginxStatusToJSON(nginxStatusResponse: string): NginxStatus {
  const lines = nginxStatusResponse.split('\n');
  const activeConnections = parseInt(lines[0].split(':')[1].trim(), 10);
  const [accepts, handled, requests] = lines[2].trim().split(' ').map(Number);
  const reading = parseInt(lines[3].split(':')[1].trim(), 10);
  const writing = parseInt(lines[3].split(':')[2].trim(), 10);
  const waiting = parseInt(lines[3].split(':')[3].trim(), 10);

  return { activeConnections, accepts, handled, requests, reading, writing, waiting };
}

// Modified fetchNginxStatus to return NginxStatus JSON
export async  function fetchNginxStatus(): Promise<NginxStatus> {
  try {
    const url = 'http://nginx:8080/nginx_status'; // Your actual URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const nginxStatusResponse = await response.text();
    return parseNginxStatusToJSON(nginxStatusResponse);
  } catch (error) {
    console.error('Error fetching NGINX status:', error);
    throw error; // Re-throw the error to handle it outside this function
  }
}


