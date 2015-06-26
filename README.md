# 18f [![Build Status](https://travis-ci.org/pwcexc/18f.svg?branch=dev)](https://travis-ci.org/pwcexc/18f)

Bad-ass prototype using data from open.fda.gov.  Built using [kraken.js](http://krakenjs.com/)


This project requires that NodeJs is installed on your machine http://nodejs.org

This project also makes use of the following technologies
* Grunt
* CSS Preprocessor: [Stylus](http://learnboost.github.io/stylus/)
* Server side templating: [DustJS](http://www.dustjs.com/)
* JS Module Management: [Browserify](http://browserify.org/)

## Build Process

### Install Node Dependencies

This command will download all dependencies or any missing dependencies that have been added in **package.json**
```
npm install
```

### To Run Application

#### Development

Once Node is installed and dependencies are downloaded, run the following command
```
npm start
```

Alternately, you can run the process with **nodemon** to continously watch for file changes and automatically restart the server
```
npm install nodemon -g
nodemon server.js
```

#### Production

The follow commands can be used to start this application in production mode:

```
NODE_ENV=production npm start 
```

To view the site, navigate to [http://localhost:8000](http://localhost:8000)

### Browserify with Kraken

#### Development
See [kraken-devtools-browseriy](http://github.com/iantocristian/kraken-devtools-browserify) for more information of configuring the use of browserify in development

### Stylus Libraries

#### Development
To make use of any stylus libraries such as [nib](http://tj.github.io/nib/) or [jeet](http://jeet.gs/) in development, require them in `lib/stylus.js` and add them to the `use` array.
```
var config = {
    filename: args.context.filePath,
    paths: args.paths,
    use: [nib(), jeet()]
};
```

#### Production
To make use of any stylus libraries in production, add them to the `use` array in the stylus grunt tasks.  Please note that some libraries may require you to tell Grunt the path to the specific module. 
```
build: {
    options: {
        compress: true
    },
    use: [
      require('jeet'),
      require('nib')
    ],
    paths: [
      './node_modules/jeet/stylus'
    ]
    files: [{
        expand: true,
        cwd: 'public/css',
        src: ['**/*.styl'],
        dest: '.build/css/',
        ext: '.css'
    }]
}
```

## License

Ruby on Rails is released under the [MIT License](http://www.opensource.org/licenses/MIT).
