import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import SelectChannelType from '@components/Sidebar/ChannelBar/SelectChannelType';
import ChannelCircle from '@components/Sidebar/ChannelCircle/ChannelCircle';
import { ChannelCircleProps } from '@type/channelCircle';
import useChannels from '@hooks/useChannels';
import Modal from '@components/Modal';
import Icon from '@components/Icon';
import useModals from '@hooks/useModals';

interface ChannelBarProps {
  channels: ChannelCircleProps[];
  updateSelectedChannel: (channelId: string) => void;
}

const ChannelBar = ({ channels, updateSelectedChannel }: ChannelBarProps) => {
  const { dragAndDropChannels } = useChannels();
  const { openModal, closeModal } = useModals();

  const dragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source === destination) {
      return;
    }

    dragAndDropChannels(source.index, destination?.index);
  };

  return (
    <ChannelbarContainer>
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId='channels-drop' key='channelsKey'>
          {(provided, snapshot) => (
            <DropContainer ref={provided.innerRef} {...provided.droppableProps}>
              {channels &&
                channels.map(({ channelLink, title, category, customChannelIndex }, index) => (
                  <Draggable draggableId={'channel-' + channelLink} index={index} key={channelLink}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        css={css`
                          margin: 0 auto;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        `}
                        onClick={() => updateSelectedChannel(channelLink)}
                      >
                        <ChannelCircle
                          channelLink={channelLink}
                          title={title}
                          category={category}
                          customChannelIndex={customChannelIndex}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </DropContainer>
          )}
        </Droppable>
      </DragDropContext>
      <ChannelParticipate
        onClick={() =>
          openModal(Modal, {
            onClose: () => closeModal(Modal),
            children: <SelectChannelType handleModal={() => closeModal(Modal)} />,
          })
        }
      >
        <CenteredIcon kind='plus' color='white' size={24} />
      </ChannelParticipate>
    </ChannelbarContainer>
  );
};

const ChannelbarContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem 0;
  width: 10rem;

  min-height: 100vh;
  height: 100%;

  background-color: #141c24;
  float: left;
  text-align: center;
  row-gap: 2rem;
  overflow: auto;
`;

const ChannelParticipate = styled.button`
  width: 6rem;
  height: 6rem;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  background: #344051;
`;

const CenteredIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
`;

export default ChannelBar;
