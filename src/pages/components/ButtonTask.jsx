const ButtonTask = (props) => {
  const classNames = props.className ? props.className : ''
  return (
    <button
      {...props}
      className={`
        px-4 py-3 text-white uppercase font-bold text-sm 
        rounded-lg ${classNames} 
      `.trim()}
    >
      {props.children}
    </button>
  )
}

export default ButtonTask
