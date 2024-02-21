import React from "react";

interface Props {
  className?: string;
}

const UpcommingGames: React.FC<Props> = ({ className }: Props): JSX.Element => {
  return <div className={`${className}`}>UpcommingGames</div>;
};

export default UpcommingGames;
