import clsx from "clsx"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}
const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={clsx('py-4 px-8 bg-blue-500 w-[200px] h-[55px]', className)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button