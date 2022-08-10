import { Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Processo from './Components/Processo';
import { QueryClient, QueryClientProvider } from "react-query";


function App(){
  const queryClient = new QueryClient();
  
  return(
    <QueryClientProvider client={queryClient}>
      <Routes>
            <Route path='/:cnjInput' element={<Processo />}/>
            <Route path='/' element={<Home />}/>
        </Routes>
    </QueryClientProvider>
        
  )
}
export default App;