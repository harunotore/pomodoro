
import './App.css'
import TimerContainer from './components/TimerContainer/TimerContainer'
import useTimer from './hooks/useTimer'

function App() {
  const timer = useTimer()
  return (
    <div className='flex flex-col px-4'>
      <TimerContainer />
      {timer.timeLeft}
    </div>
  )
}

export default App
