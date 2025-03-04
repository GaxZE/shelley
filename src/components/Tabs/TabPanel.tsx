import { Ref, useRef, ReactElement, forwardRef } from "react";
import { useTabPanel } from "react-aria";
import type { TabListState } from "react-stately";
import { classes } from "./tabs.st.css";
export interface TabPanelProps<T> {
  state: TabListState<T>;
  dataId?: string;
}

function TabPanel<T extends object>({
  dataId,
  state,
  ...props
}: TabPanelProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div
      className={classes.tabPanel}
      {...tabPanelProps}
      ref={ref}
      data-id={dataId}
    >
      {(state.selectedItem?.props as { children: ReactElement }).children}
    </div>
  );
}

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _TabPanel = forwardRef(TabPanel) as <T>(
  props: TabPanelProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _TabPanel as TabPanel };
