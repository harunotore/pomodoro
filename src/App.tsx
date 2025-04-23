
import './App.css'
import Navbar from './components/NavBar/Navbar'
import SettingDialog from './components/SettingDialog/SettingDialog'
import TimerContainer from './components/TimerContainer/TimerContainer'

function App() {
  return (
    <div className=''>
      <Navbar/>
      <TimerContainer />
      <SettingDialog/>
    </div>
  )
}

export default App
