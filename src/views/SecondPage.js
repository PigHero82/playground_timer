// React
import { useState } from 'react'

// Component
import { Button, Card, Col, Row, Table } from 'reactstrap'

// Icon
import { Flag, Pause, Play, Repeat } from 'react-feather'

// Timer
import Timer from 'react-compound-timerv2'

const SecondPage = () => {
  const [timerHistory, setTimerHistory] = useState([])  
  
  return (
    <Card>
      <Timer direction='forward' startImmediately={false} formatValue={value => (`0${value}`).slice(-2)}>
        {({ start, pause, reset, getTimerState, getTime }) => (
          <div className='text-center'>
            <div className='my-3'>
              <h1 className='display-1'>{Timer.Hours()} : {Timer.Minutes()} : {Timer.Seconds()}</h1>
            </div>

            <div className='my-1'>
              <Button.Ripple className='btn-icon rounded-circle mx-2 p-1' color='primary' onClick={getTimerState() === 'PLAYING' ? pause : start}>
                {getTimerState() === 'PLAYING' ? <Pause size={30} /> : <Play size={30} />}
              </Button.Ripple>

              <Button.Ripple disabled={getTimerState() !== 'PLAYING'} className='btn-icon rounded-circle mx-2 p-1' outline color='primary' onClick={() => {
                const data = [...timerHistory]
                const time = parseInt(getTime())
                const lastTime = data?.pop()?.time ?? 0

                setTimerHistory(prev => [
                  ...prev,
                  {
                    time,
                    range: time - lastTime
                  }
                ])
              }}>
                <Flag size={30} />
              </Button.Ripple>

              <Button.Ripple className='btn-icon rounded-circle mx-2 p-1' outline color='primary' onClick={() => {
                reset()
                setTimerHistory([])
              }}>
                <Repeat size={30} />
              </Button.Ripple>
            </div>
          </div>
        )}
      </Timer>

      {timerHistory.length > 0 && (
        <Row className='justify-content-center my-1'>
          <Col lg='8'>
            <Table bordered>
              <thead>
                <tr>
                  <th className='text-center'>Putaran</th>
                  <th className='text-center'>Waktu</th>
                  <th className='text-center'>Total</th>
                </tr>
              </thead>

              <tbody>
                {timerHistory.map((val, index) => {
                  const slice = value => (`0${value}`).slice(-2)
                  const detik = (value) => slice(parseInt(value / 1000))
                  const menit = (value) => slice(parseInt(value / 1000 / 60))
                  const jam = (value) => slice(parseInt(value / 1000 / 60 / 60))

                  return (
                    <tr key={index}>
                      <td className='text-center'>{index + 1}</td>
                      <td className='text-center'>{jam(val.range)} : {menit(val.range)} : {detik(val.range)}</td>
                      <td className='text-center'>{jam(val.time)} : {menit(val.time)} : {detik(val.time)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Card>
  )
}

export default SecondPage
