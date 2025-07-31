import { useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate  = useNavigate();

  const [toggled, setToggled] = useState<number>(2)

  const handlePlay = () => {
    console.log('Play pressed with level', toggled);
    navigate("/game");
  }

  return (
    <div className="App">
      <h1>Welcome to PrimeBreaker</h1>

      <div className="toggleMenu">
        {['Easy', 'Medium', 'Hard'].map((label, i) => (
          <button
            key={label}
            className={`toggle-button ${toggled === i + 1 ? 'active' : ''}`}
            onClick={() => {
              console.log('Toggled set to', i + 1)
              setToggled(i + 1)
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        className="play-button"
        onClick={handlePlay}
        disabled={toggled === 0}
      >
        Play
      </button>
    </div>
  )
}

export default Home
