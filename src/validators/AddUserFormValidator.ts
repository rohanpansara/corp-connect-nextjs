import * as Yup from 'yup'

const commonRequireMessage = '*required'

export const addUserValidationSchema = Yup.object({
  name: Yup.string().required(commonRequireMessage),

  email: Yup.string().email('*Invalid email format').required(commonRequireMessage),

  gender: Yup.string().required(commonRequireMessage),

  userStatus: Yup.string().required(commonRequireMessage),

  roles: Yup.string().required(commonRequireMessage),
})
