import * as express from 'express';
import { Application } from 'express';
import { router } from './app/routers';
import { authentication } from './lib/auth';
import * as createMiddleware from 'swagger-express-middleware';
import { SwaggerMiddleware } from 'swagger-express-middleware';
import * as swaggerUi from 'swagger-ui-express'; //ezzel tudunk dokumetációt csinálni swagger-ui, 2 sor
import * as swaggerDocument from '../config/swagger.json';

const app: Application = express();


createMiddleware('config/swagger.json', app, (err, middleware: SwaggerMiddleware) => {
  if (err) {
    console.log(err);
  }

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(middleware.metadata());
  app.use(middleware.CORS());
  app.use(middleware.parseRequest());
  app.use(middleware.validateRequest());

  app.use(express.json());
  const { PORT = 3000 } = process.env;

  app.use(authentication);
  app.use(router);

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
});