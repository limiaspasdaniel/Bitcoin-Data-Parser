import bunyan, { LogLevel } from 'bunyan';
import { network, OPRETURNParser } from './OPRETURNParser';

export {
  OPReturnParserOptions,
  OPRETURNParser,
  network
} from './OPRETURNParser';

const logger = bunyan.createLogger({
  name: 'PARSER',
  stream: process.stdout,
  level: process.env.LOG_LEVEL as LogLevel || 'debug'
});

const parser = new OPRETURNParser(logger, {
  database: {
    user: process.env.DB_USER,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  },
  rpc: {
    username: process.env.RPC_USERNAME,
    password: process.env.RPC_PASSWORD,
    network: process.env.NETWORK as network
  }
});

parser.initialize().then(() => parser.run());

