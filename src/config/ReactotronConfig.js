import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import Config from 'react-native-config';

if (__DEV__) {

  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .configure({ host: Config.REACTOTRON_HOST || '192.168.1.6' })
    .connect();

  tron.clear();

  console.tron = tron;
}
