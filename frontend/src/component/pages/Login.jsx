import React from 'react'
import { Link } from 'react-router-dom'
import Signup from './Signup'

const Login = () => {
  return (
<section className='auth-container vh-100 d-flex flex-column align-items-center justify-content-center'>
<form className='auth-form' >
    <p className='m-4 logo-icon text-center'><i className="bi bi-chat-right-quote-fill"></i></p>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating mb-1">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating mb-1">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>

    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button className="w-100 btn btn-lg btn-mine mb-3" type="submit">Sign in</button>
    <small> <Link to={'/Signup'}>Create new Account?</Link></small>
    <p className="mt-5 text-muted">© 2023–2030 jai.corp</p>
  </form>
</section>
  )
}

export default Login