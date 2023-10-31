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
  MdModeEdit,
  MdSettings,
  MdCancel,
  MdIndeterminateCheckBox,
  MdOutlineShortcut,
  MdMessage,
  MdEmail,
} from 'react-icons/md';
import { MouseEventHandler } from 'react';

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
  modify: MdModeEdit,
  setting: MdSettings,
  cancel: MdCancel,
  disqualification: MdIndeterminateCheckBox,
  shortcut: MdOutlineShortcut,
  message: MdMessage,
  mail: MdEmail,
};

interface IconProps {
  kind: IconKind;
  onClick?: MouseEventHandler<SVGElement>;
  color?: string;
  size?: string | number;
}

const Icon = ({ kind, ...props }: IconProps) => {
  const TargetIcon = ICON[kind];
  return <TargetIcon {...props} />;
};

export default Icon;
