import type { PropsWithChildren, ComponentProps, ReactNode } from "react";
import Styles from "./Card.module.css";


export const Card = ({ title, children, className, ...rest }: PropsWithChildren<Props>) => {
    return <article  {...rest} className={`${Styles.card} ${className ?? ''}`}>
        {typeof title === "string" ? <h2>{title}</h2> : title}
        {children}
    </article>
}

type Props = ComponentProps<"article"> & {
    title?: ReactNode;
}