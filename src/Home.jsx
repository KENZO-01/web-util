import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={() => navigate('/html-viewer')}>HTML Viewer</button>

        <button onClick={()=> navigate('/text-to-speech')}>Text to Speech</button>
    </div>
  )
}

export default Home