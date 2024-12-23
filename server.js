import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 4000;

// Resolve __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
