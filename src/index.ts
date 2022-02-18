"use strict";

import 'dotenv/config';
import { createServer } from 'http';
import app from './app';

const port = process.env.PORT || 4000;
const server = createServer(app);
server.listen(port, () => console.log("Listen to port", port));
