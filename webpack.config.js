module.exports = (env) => {
  console.log(`🛠️  running ${env} Mode using ./settings/webpack.${env}.conf.js 🛠️`);
  return require(`./settings/webpack.${env}.conf.js`);
};
