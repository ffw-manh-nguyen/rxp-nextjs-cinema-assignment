/* eslint-disable react/display-name */
import React, { forwardRef } from "react";

type FormProps = {
  opened: boolean;
  children: any;
  onSubmit: (e: any) => void;
};

const Form = forwardRef<any, FormProps>(
  ({ opened, children, ...rest }, ref) => (
    <>
      <form ref={ref} className={`form-search`} {...rest}>
        {children}
      </form>
    </>
  )
);

export default Form;
