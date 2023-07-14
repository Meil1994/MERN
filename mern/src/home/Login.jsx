import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector} from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if(userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

  return (
    <FormContainer>
        <div className='mt-60 flex justify-center items-center'>
            <div className='w-80 rounded-xl p-2 bg-white'>
            <p className='text-center'>Sign In</p>
            <hr className='mt-2'/>
                <div className='p-4 pb-5'>
                    <form onSubmit={submitHandler}>
                        <div>
                            <label>Email Address</label>
                            <input 
                                className='ring-2 ring-slate-500 rounded-md w-100% p-1'
                                placeholder='email@email.com'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className='mt-2'>
                            <label>Password</label>
                            <input 
                                className='ring-2 ring-slate-500 rounded-md w-100% p-1'
                                placeholder='Password1234'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        {isLoading && <Loader/>}

                        <div className='mt-6'>
                            <button type='submit' className='border-2 border-slate-500 p-2 pt-0 pb-0 hover:bg-slate-500 hover:text-white'>Sign In</button>
                        </div>

                        <div className='flex mt-6'>
                            <p>No account yet?</p>
                            <Link className='text-blue-600 ml-1' to={'/register'}>Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </FormContainer>
  )
}

export default Login