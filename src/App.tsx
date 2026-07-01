import Filas from "./componentes/filas"
import logo from "/logo.svg";


function App() {

 
  return (
    <div>
      <div  className="bg-black flex justify-center py-10">
      <img className="w-100 " src={logo} alt="logo" />

      </div>
      <Filas/>
    </div>
  )
}

export default App
