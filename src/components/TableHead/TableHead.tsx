import React from "react";
import { st, classes } from "./tableHead.st.css";

const TableHead = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      ...rest
    }: React.HTMLAttributes<HTMLTableSectionElement>,
    ref?: React.Ref<HTMLTableSectionElement>
  ) => {
    return (
      <thead className={st(classes.root, classNameProp)} ref={ref} {...rest}>
        {children}
      </thead>
    );
  }
);

TableHead.displayName = "TableHead";

export default TableHead;
