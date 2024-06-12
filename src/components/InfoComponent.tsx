interface InfoComponentProps {
  message: string;
}

const InfoComponent = ({ message }: InfoComponentProps) => {
  return (
    <div className="mb-8 bg-gradient-to-br from-purple-900 to-pink-700 p-6 rounded-lg font-bold">
      {message.split("<br/>").map((line, index) => (
        <p key={index} className="text-accent-light">
          {line}
        </p>
      ))}
    </div>
  );
};

export default InfoComponent;
