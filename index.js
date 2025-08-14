// Entry point for Render deployment
// This file starts the backend server

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Change to backend directory
process.chdir(join(__dirname, 'backend'));

// Import and run the server directly
import('./src/server.js').catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
