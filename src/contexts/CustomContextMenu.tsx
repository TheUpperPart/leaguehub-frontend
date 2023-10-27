import React from 'react';
import styled from '@emotion/styled';

interface CustomContextMenuProps {
  x: number;
  y: number;
}

const CustomContextMenu = ({ x, y }: CustomContextMenuProps) => {
  return (
    <ContextMenu style={{ top: y, left: x }}>
      <ul>
        <li>메뉴 항목 1</li>
        <li>메뉴 항목 2</li>
        {/* 추가적인 메뉴 항목들 */}
      </ul>
    </ContextMenu>
  );
};

export default CustomContextMenu;

const ContextMenu = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  z-index: 1000;
  color: black;
`;
