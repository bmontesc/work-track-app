import './App.css';
import Worksheet from './components/worksheet/worksheet';
import AppHeader from './components/header/header';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={
          {
            "token": {
              "colorPrimary": "#00529b",
              "colorInfo": "#00529b",
              "colorSuccess": "#a5e587",
              "colorWarning": "#ffd37d",
              "colorError": "#f99596",
              "sizeStep": 4,
              "sizeUnit": 5,
              "borderRadius": 10,
              "fontSize": 12,
            }
          }
        }
      >
        <AppHeader />
        <Worksheet />
      </ConfigProvider>
    </div>
  );
}

export default App;
