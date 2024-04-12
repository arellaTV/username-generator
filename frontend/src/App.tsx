import { Form } from "./Form";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <Form />
      <Toaster />
    </main>
  );
}

export default App;
