const base = './src/components/'
module.exports = function(plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name please'
      }
    ],
    actions: [
      {
        type: 'add',
        path: `${base}{{name}}/index.js`,
        templateFile: 'plop-templates/index.hbs'
      },
      {
        type: 'add',
        path: `${base}{{name}}/{{name}}.stories.js`,
        templateFile: 'plop-templates/story.hbs'
      },
      {
        type: 'add',
        path: `${base}{{name}}/README.md`,
        templateFile: 'plop-templates/readme.hbs'
      },
      {
        type: 'add',
        path: `${base}{{name}}/{{name}}.vue`,
        templateFile: 'plop-templates/vue.hbs'
      }
    ]
  })
}
