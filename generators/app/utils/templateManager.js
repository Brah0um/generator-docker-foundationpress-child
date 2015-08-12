var TemplateManager = function (generator, conf) {
    this.conf = conf;
    this.generator = generator;
};

TemplateManager.prototype.copyTemplate = function (source, dest) {
    this.generator.fs.copyTpl(
        this.generator.templatePath(source),
        this.generator.destinationPath(dest),
        { conf: this.conf }
    );
};

TemplateManager.prototype.copyTemplates = function () {
    var themeRoot = 'wordpress/wp-content/themes/'+this.conf.themeName;

    this.copyTemplate('wp-config.php.tmpl', 'wordpress/wp-config.php');
    this.copyTemplate('docker-compose.yml.tmpl', 'docker-compose.yml');
    this.copyTemplate('run.sh.tmpl', 'run.sh');
    this.copyTemplate('kibana.json.tmpl', 'kibana.json');
    this.copyTemplate('.gitignore.tmpl', '.gitignore');
    this.copyTemplate('theme/footer.php.tmpl', themeRoot+'/footer.php');
    this.copyTemplate('theme/functions.php.tmpl', themeRoot+'/functions.php');
    this.copyTemplate('theme/header.php.tmpl', themeRoot+'/header.php');
    this.copyTemplate('theme/index.php.tmpl', themeRoot+'/index.php');
    this.copyTemplate('theme/missing-content.php.tmpl', themeRoot+'/missing-content.php');
    this.copyTemplate('theme/style.css.tmpl', themeRoot+'/style.css');
    this.copyTemplate('theme/library/enqueue-scripts.php.tmpl', themeRoot+'/library/enqueue-scripts.php');
    this.copyTemplate('theme/library/get-missing-content.php.tmpl', themeRoot+'/library/get-missing-content.php');
    this.copyTemplate('theme/library/the-rev-path.php.tmpl', themeRoot+'/library/the-rev-path.php');
    this.copyTemplate('theme/js/init-foundation.js.tmpl', themeRoot+'/js/init-foundation.js');

    if (this.conf.gulp == true) {
        this.copyTemplate('Gulpfile.js.tmpl', 'Gulpfile.js');
        this.copyTemplate('main.scss.tmpl', 'scss/main.scss');
        this.copyTemplate('package.json.tmpl', 'package.json');
    }


    if (this.conf.foundation == true) {
        this.copyTemplate('bower.json.tmpl', 'bower.json');
    }

    if (this.conf.makefile == true) {
        this.copyTemplate('Makefile.tmpl', 'Makefile');
    }
};

module.exports = TemplateManager;
