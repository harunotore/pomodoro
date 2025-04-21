
import './App.css'
import TimerContainer from './components/TimerContainer/TimerContainer'
import useTimer from './hooks/useTimer'

function App() {
  const timer = useTimer()
  return (
    <>
      <TimerContainer />
      {timer.timeLeft}
    </>
  )
}

export default App
