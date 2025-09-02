module.exports = {
  '*.ts': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{js,json,md}': [
    'prettier --write',
  ],
};
