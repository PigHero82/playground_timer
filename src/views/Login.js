// Framer Motion
import { motion } from 'framer-motion/dist/framer-motion'

// Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Components
import { Card, CardBody, CardText, Form } from "reactstrap"
import { ActionButton, Input } from '../components'

// Config
import themeConfig from '../configs/themeConfig'

// Redux
import { useDispatch } from 'react-redux'
import { handleLogin } from '../redux/authentication'

// Router
import { useHistory } from 'react-router-dom'
import { Alert } from '../functions'

const LoginCover = () => {
  // Hooks
  const dispatch = useDispatch()
  const history = useHistory()

  // Variables
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  const FormSection = () => {
    const defaultValues = { nama: '' }
  
    const SignupSchema = yup.object().shape({
      nama: yup.string().max(10, 'Nama hanya dapat diisi dengan 10 Karakter').required('Nama wajib diisi')
    })

    const onSubmit = value => {
      dispatch(handleLogin({
        ...value,
        accessToken: "",
        refreshToken: ""
      }))

      Alert('success', 'Autentikasi Berhasil', `Selamat datang, ${value.nama}`)

      history.push('/')
    }
  
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues,
      resolver: yupResolver(SignupSchema)
    })

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nama"
          name="nama"
          register={register}
          errors={errors.nama}
          autoFocus
        />

        <div className='text-end'>
          <ActionButton type='submit'>
            Masuk
          </ActionButton>
        </div>
      </Form>
    )
  }

  return (
    <div className='fallback-spinner app-loader'>
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <div className='text-center mb-2'>
          <img src={themeConfig.app.appLogoImage} alt='logo' height={64} />
        </div>

        <Card>
          <CardBody>
            <div className='text-center mb-1'>
              <h2>Playground Tools</h2>
            </div>
            <CardText>
              Silahkan isi kolom dibawah sebelum lanjut ke halaman berikutnya
            </CardText>
            <hr />

            <FormSection />
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginCover
