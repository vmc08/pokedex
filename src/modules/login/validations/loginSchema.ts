import * as yup from 'yup'

export default yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup.string().required('Password is requried.')
})
