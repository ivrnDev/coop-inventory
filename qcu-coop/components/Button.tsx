"use client";

import Link from "next/link";

const Button = ({ label, style, onclick, link }: any) => {
  if (link) {
    return (
      <Link href={link}>
        <button onClick={onclick} className={`${style}`}>
          {label}
        </button>
      </Link>
    );
  } else {
    return (
      <button onClick={onclick} className={`${style}`}>
        {label}
      </button>
    );
  }
};

export default Button;
