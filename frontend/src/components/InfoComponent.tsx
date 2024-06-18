interface InfoComponentProps {
  message: string;
  colorClass?: string;
}

const defaultColorClass = "bg-gradient-to-br from-purple-900 to-pink-700";

const InfoComponent = ({ message, colorClass }: InfoComponentProps) => {
  const appliedColorClass = colorClass || defaultColorClass;
  return (
    <div className={`mb-8 p-6 rounded-lg font-bold ${appliedColorClass}`}>
      {message.split("<br/>").map((line, index) => (
        <p key={index} className="text-accent-light">
          {line}
        </p>
      ))}
    </div>
  );
};

export default InfoComponent;
