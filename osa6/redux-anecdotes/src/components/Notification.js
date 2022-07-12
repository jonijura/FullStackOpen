import { connect } from "react-redux"

const Notification = (props) => {
  const notification = props.notification
  if(notification.length === 0) return;
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default connect(state => ({notification: state.notification}))(Notification)