import { exec } from 'child_process';

// Adjusted interface to focus on the data
interface VnstatResult {
  data: any; // Holds the parsed JSON data
}

// Function to call vnstat and return its output as JSON
export function callVnstat(): Promise<VnstatResult> {
  return new Promise((resolve, reject) => {
    exec('vnstat -h 24 --json', (error, stdout, stderr) => {
      if (error) {
        reject(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`); // Log stderr or handle as needed
      }
      try {
        const jsonData = JSON.parse(stdout); // Parse stdout into JSON
        resolve({ data: jsonData }); // Resolve with just the parsed JSON
      } catch (parseError) {
        // Check if parseError is an instance of Error and then access its message
        if (parseError instanceof Error) {
          reject(`Error parsing JSON: ${parseError.message}`);
        } else {
          reject(`Error parsing JSON: ${parseError}`);
        }
      }
    });
  });
};
