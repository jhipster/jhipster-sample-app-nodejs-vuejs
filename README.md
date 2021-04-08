# gen

This application was generated using the [NodeJS blueprint](https://github.com/jhipster/generator-jhipster-nodejs) of JHipster 7.0.0, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v7.0.0](https://www.jhipster.tech/documentation-archive/v7.0.0). For any questions you can refer to the stream lead: [Angelo Manganiello](https://github.com/amanganiello90).

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    npm install
    cd server && npm install

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    cd server && npm start
    npm start

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.
You can also fully dockerize your application and all the services that it depends on.

For example, to start a mongodb database in a docker container, run:

    docker-compose -f src/main/docker/mongodb.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mongodb.yml down

For the entire app run:

```
docker-compose -f src/main/docker/app.yml up -d
```

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## JWT authentication and authorization

Congratulations! You've selected an excellent way to secure your NHipster application. If you're not sure what JSON Web Token (JWT) is, please see [What the Heck is JWT?](https://jwt.io/introduction/)

Your app uses, to get and use the token, the `server/src/config/application.yml` settings:

```yaml
  ...
  security:
    authentication:
        jwt:
            # This token must be encoded using Base64 and be at least 256 bits long (you can type `openssl rand -base64 64` on your command line to generate a 512 bits one)
            base64-secret: {yourSecret}
            # Token is valid 24 hours
            token-validity-in-seconds: 86400
            token-validity-in-seconds-for-remember-me: 2592000
```

You can use the default secret created from the app, or change it.
So to get a token, you have to pass a POST request on the _api/authenticate_ url with **UserLoginDTO** as body.
For this you can use **swagger ui** on **/api/v2/api-docs** path, or the client login page (if you have generated it).

### PWA Support

JHipster ships with PWA (Progressive Web App) support, and it's disabled by default. One of the main components of a PWA is a service worker.

The service worker initialization code is commented out by default. To enable it, uncomment the following code in `src/main/webapp/index.html`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function () {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: [Workbox](https://developers.google.com/web/tools/workbox/) powers JHipster's service worker. It dynamically generates the `service-worker.js` file.

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

    npm install --save --save-exact leaflet

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

    npm install --save-dev --save-exact @types/leaflet

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Note: There are still a few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using NestJS CLI

You can also use [NestJS CLI][] to generate some custom server code.

For example, the following command:

    nest generate module my-module

will generate the file:

    create server/src/my-component/my-component.module.ts

## Building and running

#### Running

```bash
npm run start:app
```

#### Building

```bash
npm run build:app
```

The build folder with all compiled sources will be **server/dist**.

> For more explanation about full stack server/client build refer to [server/README.md](server/README.md)

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    npm test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run in a terminal (`npm run e2e`) after that the full application is run (`npm run start:app`).

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner).
Then, run a Sonar analysis in the server folder:

    npm run sonar:scanner

For more information, refer to the [Code quality page][].

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 7.0.0 archive]: https://www.jhipster.tech/documentation-archive/v7.0.0
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v7.0.0/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v7.0.0/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v7.0.0/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v7.0.0/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v7.0.0/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v7.0.0/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[jest]: https://facebook.github.io/jest/
[nestjs]: https://nestjs.com/
[nestjs cli]: https://docs.nestjs.com/cli/usages
[angular cli]: https://cli.angular.io/
[browsersync]: http://www.browsersync.io/
[jasmine]: http://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: http://leafletjs.com/
[definitelytyped]: http://definitelytyped.org/
