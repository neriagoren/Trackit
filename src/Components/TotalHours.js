
import React from "react";
import AnimatedNumber from "animated-number-react";

export default function TotalHours() {


  const [value, setValue] = React.useState(150)

  const formatValue = (value) => value.toFixed(2);
  return (

    <>
      <AnimatedNumber
        className={"value"}
        value={value}
        formatValue={formatValue}
      />
    </>
  )
}