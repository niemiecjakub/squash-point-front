type Props = {
    text: string;
    color: string;
    onClick?: (e: any) => any;
};

const Button = ({ text, color, onClick }: Props) => {
    return (
        <button className={`bg-${color}-200 px-4 py-2 mx-2 rounded-full`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
