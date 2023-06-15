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
};

interface IconProps {
  kind: IconKind;
  onClick?: () => void;
  color?: string;
}

const Icon = ({ kind, ...props }: IconProps) => {
  const TargetIcon = ICON[kind];
  return <TargetIcon size={28} {...props} />;
};

export default Icon;
