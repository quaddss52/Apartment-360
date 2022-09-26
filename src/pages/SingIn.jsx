import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {toast} from 'react-toastify'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import Oauth from '../components/Oauth'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData
  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const navigate = useNavigate()

  const onSubmit = async (e) =>{
    e.preventDefault()

    try {
      const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    if (userCredential.user) {
      navigate('/')
    }
      
    } catch (error) {
      toast.error('input correct data')
    }

    
  }

    return (
      <>
          <div className="pageContainer">
            <header className="pageHeader">Welcome Back!</header>

            <form onSubmit={onSubmit}>
              <input type="email" className="emailInput" placeholder='Enter your email.' id='email' value={email} onChange= {onChange}/>
              <div className="passwordInputDiv">
                <input type={showPassword ? 'text': 'password'} className ='passwordInput' placeholder='Password' id='password' value={password} onChange= {onChange}/>
                <img src={visibilityIcon} alt="Show password" className='showPassword' onClick={()=>(setShowPassword((prevState)=>{
                  return !prevState
                }))} />
              </div>
              <Link to='/forgot-password' className='forgotPasswordLink'> Forgot password?</Link>
              <div className="signInBar">
                <p className="signInText">Sign In</p>

                <button className="signInButton">
                  <ArrowRightIcon fill='#fff' width='34px' height= '34px'/>
                </button>
              </div>
            </form>
            <Oauth/>
            <Link to='/sign-up' className='registerLink'>
              Sign Up
            </Link>
          </div>
      </>
    )
  }
  
  export default SignIn