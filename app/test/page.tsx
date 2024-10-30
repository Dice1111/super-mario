"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    console.log("yes");
  }, [check]); // This will log "yes" only when `check` changes

  return (
    <button onClick={() => (check ? setCheck(false) : setCheck(true))}>
      Hello
    </button>
  );
};

export default Page;
