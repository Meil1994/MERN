import React from 'react'
import { AiOutlineLogin } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import {useSelector, useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import {useNavigate} from 'react-router-dom';

const Nav = () => {
  const {userInfo} = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='grid grid-cols-2 p-28 pt-2 pb-2 bg-slate-800 text-white'>
        <a href='/'>MERN APP</a>
        <div className='flex justify-end'>
          {userInfo ? (
            <>
              <p>Hi, {userInfo.name}</p>
              <a href='/profile' className='flex items-center ml-5'><AiOutlineLogin/> Profile</a>
              <button onClick={logoutHandler} className='flex items-center ml-5'><AiOutlineLogout/> Logout</button>
            </>
          ) : (
            <>
              <a href='/signin' className='flex items-center'><AiOutlineLogin/> Login</a>
              <a href='/register' className='flex items-center ml-5'><AiOutlineLogout/> Register</a>
            </>
          )}
           
        </div>
    </div>
  )
}

export default Nav