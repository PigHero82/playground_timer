import React, { Fragment } from "react"
import { Label, FormFeedback, Input } from "reactstrap"
import classnames from 'classnames'
import Cleave from "cleave.js/react"

const TimeMask = React.forwardRef(({ 
	label,
	errors,
	readOnly,
	...rest
}, ref) => {
	const id = Math.random().toString(36).substring(2, 7)
	const options = { time: true, timePattern: ['h', 'm', 's'] }

	return (
		<div className='mb-1'>
			<Label className='form-label' for={`timepicker-${id}`}>{label}</Label>

			{readOnly ? (
				<Input {...rest} readOnly />
			) : (
				<Fragment>
					<Cleave
						{...rest}
						className={classnames('form-control', { 'is-invalid': errors })} 
						options={options} 
						id={`timepicker-${id}`}
						ref={ref}
						autoComplete='off'
					/>
					{errors ? <FormFeedback>{errors.message}</FormFeedback> : <></>}
				</Fragment>
			)}
		</div>
	)
})
export default TimeMask
