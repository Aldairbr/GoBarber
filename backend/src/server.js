import { PORT } from './config/envConfig'
import App from './app'

App.listen(PORT, () => console.log(`server running at port ${PORT}`))
