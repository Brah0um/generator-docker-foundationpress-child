var generators      = require('yeoman-generator'),
    questions       = require('./questions'),
    TemplateManager = require('./utils/templateManager'),
    MessageManager  = require('./utils/messageManager'),
    Configurator    = require('./utils/configurator'),
    git             = require('simple-git')()
;

var configuration = {} ;

module.exports = generators.Base.extend({
    initializing: function () {
        this.log(MessageManager.getStartMessage());
    },
    prompting: function () {
        var done = this.async();
        this.prompt(questions, function (answers) {
            configuration = Configurator.handle(answers);
            done();
        }.bind(this));
    },
    install: function () {
        var done = this.async();
        this.extract('https://wordpress.org/latest.tar.gz', '.', function (err) {
            if (err) {
                console.log(err);
            } else {
                git.clone('https://github.com/olefredrik/FoundationPress.git', 'wordpress/wp-content/themes/FoundationPress/', function (err) {
                    if (err) {
                        console.error(err);
                    }
                    done();
                }.bind(this));

                var tm = new TemplateManager(this, configuration);
                tm.copyTemplates();
            }
            done();
        }.bind(this));
    },
    end: function () {
        var mm = new MessageManager(configuration);
        this.log(mm.getEndMessage());
    }
});