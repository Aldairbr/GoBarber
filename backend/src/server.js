import App from './app';

const { PORT } = require('./config/envConfig');

App.listen(PORT, () => console.log(`server running at port ${PORT}`));
