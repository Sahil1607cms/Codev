// Entry point for Render deployment
// This file starts the backend server

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Change to backend directory
process.chdir(join(__dirname, 'backend'));

// Install backend dependencies first
console.log('Installing backend dependencies...');
const install = spawn('npm', ['install'], {
  stdio: 'inherit',
  shell: true
});

install.on('close', (code) => {
  if (code !== 0) {
    console.error('Failed to install backend dependencies');
    process.exit(1);
  }
  
  console.log('Backend dependencies installed successfully');
  
  // Start the backend server
  console.log('Starting backend server...');
  const server = spawn('node', ['src/server.js'], {
    stdio: 'inherit',
    shell: true
  });

  server.on('error', (error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

  server.on('exit', (code) => {
    console.log(`Server exited with code ${code}`);
    process.exit(code);
  });
});
