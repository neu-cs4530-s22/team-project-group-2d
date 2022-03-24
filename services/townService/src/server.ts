import Express from 'express';
import * as http from 'http';
import CORS from 'cors';
import { AddressInfo } from 'net';
import mongoose from 'mongoose';
import addTownRoutes from './router/towns';
import addPostRoutes from './router/posts';
import CoveyTownsStore from './lib/CoveyTownsStore';

const app = Express();
app.use(CORS());
const server = http.createServer(app);

const connectionString = (`mongodb+srv://swe_default:${process.env.MONGO_DEFAULT_PASS}@cluster0.aw0wj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
mongoose.connect(connectionString);
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error: '));
// eslint-disable-next-line no-console
db.once('open', () => console.log('connection successful'));

addTownRoutes(server, app);
addPostRoutes(server, app);

server.listen(process.env.PORT || 8081, () => {
  const address = server.address() as AddressInfo;
  // eslint-disable-next-line no-console
  console.log(`Listening on ${address.port}`);
  if (process.env.DEMO_TOWN_ID) {
    CoveyTownsStore.getInstance()
      .createTown(process.env.DEMO_TOWN_ID, false);
  }
});
