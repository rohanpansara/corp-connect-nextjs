import { Field, ErrorMessage } from 'formik'

const InputField = ({
  label,
  name,
  placeholder,
  type = 'text',
  setFieldTouched,
  setFieldError,
  errors,
  touched,
}: {
  label: string
  name: string
  placeholder: string
  type?: string
  setFieldTouched: (field: string, touched: boolean) => void
  setFieldError: (field: string, errorMsg: string) => void
  errors: Record<string, string>
  touched: Record<string, boolean>
}) => {
  return (
    <div>
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
        type={type}
        className={`mt-1 block w-full p-2 border ${
          errors[name] && touched[name]
            ? 'border-[#ff0800] placeholder:text-[#caadad]'
            : 'border-gray-300'
        } rounded-md shadow-sm text-[#444E60] sm:text-sm placeholder:text-[#babdc2]`}
        placeholder={placeholder}
        onFocus={() => {
          setFieldTouched(name, false)
          setFieldError(name, '')
        }}
      />
    </div>
  )
}

export default InputField
