// React
import { Fragment, useState } from 'react'

// Icon
import { 
  Pause, Play, Plus, Repeat, Trash2 
} from 'react-feather'

// Components
import { 
  Card, CardHeader, CardBody, CardTitle, 
  Row, Col, Button, UncontrolledTooltip, 
  Modal, ModalHeader, ModalBody, Form, 
  ModalFooter
} from 'reactstrap'
import { ActionButton, Input, TimeMask } from '../components'

// Countdown
import Countdown from 'react-countdown'

// Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Functions
import { Alert } from '../functions'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { handleTimer, removeTimer } from '../redux/timer'

const Home = () => {
  // Hooks
  const dispatch = useDispatch()
  const data = useSelector((state) => state.timer)
  
  // States
  const [modal, setModal] = useState(false)

  const renderer = ({ hours, minutes, seconds, api }) => (
    <Fragment>
      <CardBody>
        <Card className='bg-secondary rounded-circle mx-auto' style={{ width: '230px', height: '230px' }}>
          <Card className='rounded-circle m-auto' style={{ height: '90%', width: '90%' }}>
            <div className='m-auto'>
              <h1>
                {(`0${hours}`).slice(-2)}:{(`0${minutes}`).slice(-2)}:{(`0${seconds}`).slice(-2)}
              </h1>
            </div>
          </Card>
        </Card>

        <div className='d-flex justify-content-center'>
          <Button.Ripple className='btn-icon rounded-circle mx-50' color='primary' onClick={api.isPaused() || api.isStopped() ? api.start : api.pause}>
            {api.isPaused() || api.isStopped() || api.isCompleted() ? <Play size={16} /> : <Pause size={16} />}
          </Button.Ripple>
          <Button.Ripple className='btn-icon rounded-circle mx-50' outline color='primary' onClick={api.stop}>
            <Repeat size={16} />
          </Button.Ripple>
        </div>
      </CardBody>
    </Fragment>
  )

  const DataModal = () => {
    const defaultValues = {
      title: '',
      timer: ''
    }

    const SignupSchema = yup.object().shape({
      title: yup.string().required('Title wajib diisi'),
      timer: yup.string().required('Timer wajib diisi').matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/, 'Format Salah | Contoh: 05:08:00')
    })

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues,
      resolver: yupResolver(SignupSchema)
    }) 

    const onSubmit = value => {
      const dataValue = value.timer.split(':')

      dispatch(handleTimer({
        ...value,
        timer: (parseInt(dataValue[2]) + (parseInt(dataValue[1]) * 60) + (parseInt(dataValue[0]) * 60 * 60)) * 1000
      }))

      setModal(!modal)
    }

    return (
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Tambah Timer</ModalHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Input
              label="Title"
              name="title"
              register={register}
              errors={errors.title}
            />

            <TimeMask
              {...register('timer')}
              label="Timer"
              name="timer"
              errors={errors.timer}
            />
          </ModalBody>

          <ModalFooter>
            <ActionButton type='submit' />
          </ModalFooter>
        </Form>
      </Modal>
    )
  }

  return (
    <Fragment>
      {/* Content */}
      <Row>
        {data.length > 0 ? data.map((val, key) => (
          <Col lg="3" md="6" key={key}>
            <Card>
              <CardHeader className='d-flex justify-content-between align-items-center'>
                <CardTitle>
                  {val.title}
                </CardTitle>

                <CardTitle>
                  <Button.Ripple 
                    className='btn-icon'
                    color='flat-danger' 
                    onClick={() => {
                      const value = [...data]
                      value.splice(key, 1)
                      dispatch(removeTimer(value))
                    }}
                  >
                    <Trash2 />
                  </Button.Ripple>
                </CardTitle>
              </CardHeader>

              <Countdown 
                autoStart={false} 
                date={Date.now() + val.timer} 
                renderer={renderer} 
                onComplete={() => {
                  const audio = new Audio('https://orangefreesounds.com/wp-content/uploads/2022/05/Clock-sound-effect.mp3?_=1')
                  audio.play()

                  Alert('warning', 'Waktu Habis', 'Waktu Telah Habis')
                }} 
              />
            </Card>
          </Col>
        )) : (
          <div className='text-center mt-3'>
            <h1>Tidak Ada Data</h1>
          </div>
        )}
      </Row>

      {/* Tambah Timer */}
      <div className='scroll-to-top'>
        <div className='scroll-top d-block'>
          <Button.Ripple
            id='tooltip-tambah'
            className='btn-icon rounded mx-50'
            color='primary'
            onClick={() => setModal(true)}
          >
            <Plus size={14} />
          </Button.Ripple>

          <UncontrolledTooltip
            placement="top"
            target="tooltip-tambah"
          >
            Tambah Timer
          </UncontrolledTooltip>
        </div>
      </div>

      {/* Modal */}
      <DataModal />
    </Fragment>
  )
}

export default Home
