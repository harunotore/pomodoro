import clsx from "clsx"

interface ButtonModeProps {
    children: React.ReactNode
    onClick?: () => void
    className: string
}

export function ButtonMode({ children, onClick, className }: ButtonModeProps) {
    return (
        <button className={clsx(className, 'px-2 px-4 rounded-md')}
            onClick={onClick}>
            {children}
        </button>
    )
}