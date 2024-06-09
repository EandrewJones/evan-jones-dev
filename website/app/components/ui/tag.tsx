import { MouseEventHandler } from 'react'
import { cn } from '~/lib/utils'

interface TagProps {
    tag: string
    selected: boolean
    onClick?: MouseEventHandler<HTMLLIElement>
    disabled?: boolean
}

function Tag({ tag, selected, onClick, disabled }: TagProps) {
    return (
        <li
            className={cn([
                'mx-0 my-0 px-2 py-1',
                'text-xs  font-medium',
                'border border-primary-outline',
                {
                    'text-primary bg-secondary/70': selected,
                    'text-accent-foreground/70 bg-card/60 hover:bg-secondary/70 hover:cursor-pointer hover:text-accent-foreground':
                        !selected,
                    'opacity-100': !disabled,
                    'opacity-25': disabled,
                },
            ])}
            key={tag}
            onClick={onClick}
        >
            <button disabled={disabled}>{tag}</button>
        </li>
    )
}

export { Tag }
