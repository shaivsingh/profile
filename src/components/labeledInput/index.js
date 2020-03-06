import React from "react";

export default function LabeledInput(props) {
  return (
    <>
      <label style={{ marginTop: 10 }}>{props.lvalue}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        required
        value={props.value}
        maxLength={props.maxLength}
        size={props.size}
        minLength={props.minLength}
        pattern={props.pattern}
        style={props.style}
        autoComplete="off"
        title={props.title}
      />
      <br />
      <span
        style={{ color: "red", fontSize: "0.8em", margin: "5px 0px 5px 0px" }}
      >
        {props.msg}
      </span>
    </>
  );
}
