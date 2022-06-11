// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SweetAlert = (title, icon) => {
	const MySwal = withReactContent(Swal)

	return MySwal.fire({
		title: title ?? 'Apa anda yakin?',
		icon: icon ?? 'warning',
		showCancelButton: true,
		confirmButtonText: 'Ya',
		cancelButtonText: 'Tidak',
		customClass: {
			confirmButton: 'btn btn-primary',
			cancelButton: 'btn btn-outline-danger ms-1'
		},
		buttonsStyling: false
	})
}

export default SweetAlert