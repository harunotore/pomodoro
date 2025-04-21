import clsx from "clsx"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}
const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={clsx('py-4 px-8 bg-blue-500 min-w-[200px] min-h-[50px]', className)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button