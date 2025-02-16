import { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'

interface PasswordFieldProps {
  label: string
  name: string
  placeholder: string
  setFieldTouched: (field: string, touched: boolean) => void
  setFieldError: (field: string, errorMsg: string) => void
  errors: Record<string, string>
  touched: Record<string, boolean>
}

const PasswordField = ({
  label,
  name,
  placeholder,
  setFieldTouched,
  setFieldError,
  errors,
  touched,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <label
        htmlFor={name}
        className='flex flex-row justify-start items-center text-sm font-medium text-[#444e60d2] my-2'
      >
        {label}
        <ErrorMessage name={name} component='p' className='text-[#ff0800] text-xs ml-auto' />
      </label>
      <Field
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        className={`mt-1 block w-full p-2 border ${
          errors[name] && touched[name] ? 'border-[#ff0800] placeholder:text-[#caadad]' : 'border-gray-300'
        } rounded-md shadow-sm text-[#444E60] sm:text-sm placeholder:text-[#babdc2]`}
        placeholder={placeholder}
        onFocus={() => {
          setFieldTouched(name, false)
          setFieldError(name, '')
        }}
      />
      <button
        type='button'
        className='absolute right-3 top-1/2 transform translate-y-[36%] text-xl'
        onClick={() => setShowPassword(prev => !prev)}
      >
        {showPassword ? (
          <BsEyeFill className='h-4 w-4 fill-[#384150]' />
        ) : (
          <BsEyeSlashFill className='h-4 w-4 fill-[#444E60]' />
        )}
      </button>
    </div>
  )
}

export default PasswordField
