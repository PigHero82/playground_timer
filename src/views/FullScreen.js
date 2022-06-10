import { motion } from 'framer-motion/dist/framer-motion'
import { Minimize2, Play, Repeat } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const Home = () => {
  const history = useHistory()
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <Card className='m-0' style={{ height: window.innerHeight }}>
        <CardHeader className='d-flex justify-content-between align-items-center'>
          <CardTitle>
            [Judul]
          </CardTitle>

          <CardTitle>
            <Button.Ripple 
              className='btn-icon'
              color='flat-primary' 
              onClick={() => history.goBack()}
            >
              <Minimize2 />
            </Button.Ripple>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className='my-3'>
            <Card className='bg-secondary rounded-circle mx-auto' style={{ width: '350px', height: '350px' }}>
              <Card className='rounded-circle m-auto' style={{ height: '90%', width: '90%' }}>
                <div className='m-auto'>
                  <h1>10:00:00</h1>
                </div>
              </Card>
            </Card>
          </div>
        </CardBody>
      </Card>

      <div className='fixed-bottom d-flex justify-content-center mb-2'>
        <Button.Ripple className='btn-icon rounded-circle mx-50' color='primary'>
          <Play size={16} />
        </Button.Ripple>
        <Button.Ripple className='btn-icon rounded-circle mx-50' outline color='primary'>
          <Repeat size={16} />
        </Button.Ripple>
      </div>
    </motion.div>
  )
}

export default Home
