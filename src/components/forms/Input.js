import React from "react"
import { Label, Input, FormFeedback } from "reactstrap"

const ReactInput = ({
	label,
	errors,
	name,
	register,
	...props
}) => {
	const id = Math.random().toString(36).substring(2, 7)
	const { ref, ...rest } = register(name)

	return (
		<div className='mb-1'>
			<Label className='form-label' for={`input-${id}`}>
				{label}
			</Label>
			<Input invalid={errors ? errors && true : false} id={`input-${id}`} innerRef={ref} {...rest} {...props} />
			{errors ? <FormFeedback>{errors.message}</FormFeedback> : <></>}
		</div>
	)
}

export default ReactInput
