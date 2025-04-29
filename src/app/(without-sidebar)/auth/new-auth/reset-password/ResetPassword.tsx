import AuthBase from '@/components/auth/AuthBase'

const ResetPassword: React.FC = () => {
  return (
    <AuthBase>
      <form className='flex flex-col p-2 justify-around h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-[2px]'>
            <label htmlFor='password' className='text-sm text-gray-200'>
              Set New Password
            </label>
            <input
              type='password'
              id='password'
              className='rounded-sm p-1 bg-slate-200 text-[12px] text-slate-800 placeholder:text-gray-400 pl-2'
              placeholder='Set your new password'
              required
            />
          </div>
          <div className='flex flex-col gap-[2px]'>
            <label htmlFor='password' className='text-sm text-gray-200'>
              Confirm New Password
            </label>
            <input
              type='password'
              id='password'
              className='rounded-sm p-1 bg-slate-200 text-[12px] text-slate-800 placeholder:text-gray-400 pl-2'
              placeholder='Confirm your new password'
              required
            />
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col gap-1'>
            <button type='submit' className='bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700'>
              Reset Password
            </button>
          </div>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <span className='text-[10px] text-gray-200'>
              You will be redirected to the login page after resetting your password.
            </span>
          </div>
        </div>
      </form>
    </AuthBase>
  )
}

export default ResetPassword
