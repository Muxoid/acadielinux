import { exec } from 'child_process';

// Define the interface for the result
interface VnstatResult {
  stdout: string;
  stderr: string;
}

// Function to call vnstat and return its output
const callVnstat = (): Promise<VnstatResult> => {
  return new Promise((resolve, reject) => {
    exec('vnstat', (error, stdout, stderr) => {
      if (error) {
        reject(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
};

// Example usage
callVnstat().then(result => {
  console.log('vnstat output:', result.stdout);
}).catch(error => {
  console.error('vnstat error:', error);
});
