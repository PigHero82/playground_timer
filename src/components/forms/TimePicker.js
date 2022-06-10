import React, { Fragment } from "react"
import { Label, FormFeedback, Input } from "reactstrap"
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classnames from 'classnames'

const TimePicker = React.forwardRef(({ 
	label,
	errors,
	readOnly,
	options,
	...rest
}, ref) => {
	const id = Math.random().toString(36).substring(2, 7)

	return (
		<div className='mb-1'>
			<Label className='form-label' for={`timepicker-${id}`}>{label}</Label>

			{readOnly ? (
				<Input {...rest} readOnly />
			) : (
				<Fragment>
					<Flatpickr 
						{...rest}
						ref={ref}
						options={{
							enableTime: true,
							noCalendar: true,
							dateFormat: 'H:i:S',
							time_24hr: true,
							...options
						}}
						className={classnames('form-control', { 'is-invalid': errors })} 
						id={`timepicker-${id}`}
					/>
					{errors ? <FormFeedback>{errors.message}</FormFeedback> : <></>}
				</Fragment>
			)}
		</div>
	)
})
export default TimePicker
