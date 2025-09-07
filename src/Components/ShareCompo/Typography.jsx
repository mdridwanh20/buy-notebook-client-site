export function HeadingH1({ headH1, className }) {
  return (
    <div
      className={`py-1 font-secondFont text-[var(--primaryColor)] font-bold lg:text-5xl capitalize text-[25px]  ${className}`}
    >
      {headH1}
    </div>
  );
}

export function HeadingH2({ headH2, className }) {
  return (
    <div
      className={`py-1 text-[var(--primaryColor)] font-primaryFont font-bold lg:text-4xl capitalize text-xl  ${className}`}
    >
      {headH2}
    </div>
  );
}

export function HeadingH3({ head3, className }) {
  return (
    <div
      className={`lg:text-xl text-[var(--primaryColor)] text-base font-semibold font-primary  capitalize  ${className}`}
    >
      {head3}
    </div>
  );
}

export function HeadingH4({ head4, className }) {
  return <div className={` text-[13px] capitalize  ${className}`}>{head4}</div>;
}

export function Para({ para, className }) {
  return (
    <div className={`py-1 text-[var(--paraColor)] my-1 text-[14px]  ${className}`}>
      {para}
    </div>
  );
}



export function Btn({ btn, icon, className }) {
  return (
    <div
    >
      <button className={` ${className} font-medium cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2`}>{btn}</button>
      {icon && <span className="text-base animate-pulse">{icon}</span>}

    </div>
  );
}



