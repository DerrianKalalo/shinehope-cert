import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const login = () => {
    if (username === 'admin' && password === 'shinehope') {
      localStorage.setItem('admin', 'true')
      router.push('/admin')
    } else {
      alert('Wrong login')
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Admin Login</h1>

        <input className="input" placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)} />
        <br/><br/>

        <input className="input" type="password" placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)} />
        <br/><br/>

        <button className="button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  )
}