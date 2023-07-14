import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector} from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);

    const [updateProfile, {isLoading}] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.setName, userInfo.setEmail]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
               const res = await updateProfile({
                _id:userInfo._id,
                name,
                email,
                password
               }).unwrap();
               dispatch(setCredentials({...res}));
               toast.success('Profile updated');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

  return (
    <FormContainer>
        <div className='mt-60 flex justify-center items-center'>
            <div className='w-80 rounded-xl p-2 bg-white'>
            <p className='text-center'>Update Profile</p>
            <hr className='mt-2'/>
                <div className='p-4 pb-5'>
                    <form onSubmit={submitHandler}>
                        <div>
                            <label>Name</label>
                            <input 
                                className='ring-2 ring-slate-500 rounded-md w-100% p-1'
                                placeholder='Troy'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className='mt-2'>
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

                        <div className='mt-2'>
                            <label>Confirm Password</label>
                            <input 
                                className='ring-2 ring-slate-500 rounded-md w-100% p-1'
                                placeholder='Password1234'
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>


                        {isLoading && <Loader/>}

                        <div className='mt-6'>
                            <button type='submit' className='border-2 border-slate-500 p-2 pt-0 pb-0 hover:bg-slate-500 hover:text-white'>Update</button>
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    </FormContainer>
  )
}

export default Profile