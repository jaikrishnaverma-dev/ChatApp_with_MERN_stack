import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
<section className='auth-container vh-100 d-flex flex-column align-items-center justify-content-center'>
<form className='auth-form' >
    <p className='m-4 logo-icon text-center'><i className="bi bi-chat-right-quote-fill"></i></p>
    <h4 className=" mb-3 fw-normal">Create new account</h4>
    <div className="form-floating mb-1">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Username</label>
    </div>
    <div className="form-floating mb-1">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating mb-1">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>
    <div className="form-floating mb-1" >
      <input type="file" className="form-control py-3 ps-4" id="floatingPassword" placeholder="Password"/>
  
    </div>
    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button className="w-100 btn btn-lg btn-mine mb-3" type="submit">Sign up</button>
    <small > <Link to={'/login'}>Already have an Account?</Link></small>
    <p className="mt-5 text-muted">© 2023–2030 jai.corp</p>
  </form>
</section>
  )
}

export default Signup