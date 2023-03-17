import { SnackbarProvider } from "notistack";
import "./App.css";
import Routers from "./component/Routers";
import ChatProvider from "./myContext/MyContext";

function App() {
  return (
    <ChatProvider>
      <SnackbarProvider maxSnack={3}>
        <Routers />
      </SnackbarProvider>
    </ChatProvider>
  );
}
// mongodb+srv://jai-stark:<password>@cluster0.0wfa1np.mongodb.net/?retryWrites=true&w=majority

export default App;
