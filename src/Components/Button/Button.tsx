type Props = {
    text: string;
    color: string;
    onClick?: (e: any) => any;
    disabled?: boolean
};

const Button = ({ text, color, onClick, disabled }: Props) => {
    return (
        <button className={`bg-${color}-200 px-4 py-2 mx-2 rounded-full`} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
