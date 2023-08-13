import { IconKind } from 'src/@types/icon';
import { IconType } from 'react-icons/lib';
import {
  MdLock,
  MdSupervisorAccount,
  MdPerson,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdAdd,
  MdToggleOff,
  MdToggleOn,
  MdAccessTime,
  MdRefresh,
  MdSend,
} from 'react-icons/md';

const ICON: { [key in IconKind]: IconType } = {
  lock: MdLock,
  team: MdSupervisorAccount,
  my: MdPerson,
  checked: MdCheckBox,
  notChecked: MdCheckBoxOutlineBlank,
  plus: MdAdd,
  toggleOn: MdToggleOn,
  toggleOff: MdToggleOff,
  clock: MdAccessTime,
  refresh: MdRefresh,
  sendEmail: MdSend,
};

interface IconProps {
  kind: IconKind;
  onClick?: () => void;
  color?: string;
  size?: string | number;
}

const Icon = ({ kind, ...props }: IconProps) => {
  const TargetIcon = ICON[kind];
  return <TargetIcon {...props} />;
};

export default Icon;
