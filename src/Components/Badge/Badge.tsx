type Props = {
    text: string;
    color: string;
};

const Badge = ({ text, color }: Props) => {
    return <div className={`bg-${color}-200 px-4 py-2 mx-2 rounded-full`}>{text}</div>;
};

export default Badge;
