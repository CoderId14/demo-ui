import { ToastContainer, toast } from 'react-toastify'

function Success() {
  const showToastMessage = () => {
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_RIGHT
    })
  }
  return (
    <div>
      <button onClick={showToastMessage}>Notify</button>
      <ToastContainer />
    </div>
  )
}
export default Success
