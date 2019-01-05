module.exports = {
  'package.json': ['prettier-package-json', 'git add'],
  '*.ts': [
    'yarn run lint',
    'prettier --write',
    'git add',
    'jest --findRelatedTests',
  ],
};
