import cluster from 'cluster'
import os from 'os'
import app from './app.js';
const PORT = process.env.PORT || 3000;
const is_SERVER_IIS = process.env.IISNODE_VERSION;

if (!is_SERVER_IIS && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork(); // Reiniciar el worker
    });
  } 
  else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }