import { FunctionComponent } from 'react';

export type Modals =
  | Array<{
      Component: FunctionComponent<any>;
      props: object;
    }>
  | [];
