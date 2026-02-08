import Swal from 'sweetalert2'

const baseAlert = {
  background: 'var(--card)',
  color: 'var(--text)',
  confirmButtonColor: 'var(--accent)'
}

export const showError = (message, title = 'Ups') =>
  Swal.fire({
    ...baseAlert,
    icon: 'error',
    title,
    text: message
  })

export const confirmDanger = ({
  title,
  text,
  confirmButtonText = 'Confirmar'
}) =>
  Swal.fire({
    ...baseAlert,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: 'var(--danger)',
    cancelButtonColor: 'var(--border)',
    iconColor: 'var(--warning)'
  })
