import './App.css';
import {useEffect} from "react";
import { Provider } from "react-redux"
import store from "@/renderer/redux/stores"

function App() {
  useEffect(()=>{
  }, [])
  
  return (
    <Provider store={store}>
      <div className="App">
        <webview id="webview" src={"https://preview.pro.ant.design/dashboard/analysis/"} />
      </div>
    </Provider>
  );
}

export default App;
