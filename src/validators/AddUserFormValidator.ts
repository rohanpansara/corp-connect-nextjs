import * as Yup from 'yup'

const commonRequireMessage = '*required'

export const addUserValidationSchema = Yup.object({
  name: Yup.string().required(commonRequireMessage),

  email: Yup.string().email('*Invalid email format').required(commonRequireMessage),

  password: Yup.string().min(6, '*Password must be at least 8 characters').required(commonRequireMessage),

  confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], commonRequireMessage),

  gender: Yup.string().required(commonRequireMessage),

  userStatus: Yup.string().required(commonRequireMessage),

  roles: Yup.string().required(commonRequireMessage),
})
