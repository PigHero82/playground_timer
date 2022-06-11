// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { toast } from 'react-toastify'
import { Check, X, Info, AlertTriangle } from 'react-feather'

const SuccessToast = ({ message, children }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>{message}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {children}
      </span>
    </div>
  </Fragment>
)

const ErrorToast = ({ message, children }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<X size={12} />} />
        <h6 className='toast-title'>{message}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {children}
      </span>
    </div>
  </Fragment>
)

const InfoToast = ({ message, children }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='info' icon={<Info size={12} />} />
        <h6 className='toast-title'>{message}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {children}
      </span>
    </div>
  </Fragment>
)

const WarningToast = ({ message, children }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='warning' icon={<AlertTriangle size={12} />} />
        <h6 className='toast-title'>{message}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {children}
      </span>
    </div>
  </Fragment>
)

const Alert = (status, message, children) => {
	if (status === 'success') {
		return toast.success(<SuccessToast message={message} children={children} />, { icon: false })
	} else if (status === 'error') {
		return toast.error(<ErrorToast message={message} children={children} />, { icon: false })
	} else if (status === 'info') {
		return toast.info(<InfoToast message={message} children={children} />, { icon: false })
	} else if (status === 'warning') {
		return toast.warning(<WarningToast message={message} children={children} />, { icon: false })
	}
}

export default Alert