import { Button } from "reactstrap"

const ActionButton = ({children, color, ...rest}) => (
	<Button.Ripple color={color ?? 'primary'} {...rest}>
		{children ?? 'Simpan'}
	</Button.Ripple>
)

export default ActionButton