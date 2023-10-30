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
import useMakeGame from '@hooks/useMakeGame';
import MainChannelCircle from '../ChannelCircle/MainChannelCircle';

interface ChannelBarProps {
  channels: ChannelCircleProps[];
  updateSelectedChannel: (channelId: string) => void;
}

const ChannelBar = ({ channels, updateSelectedChannel }: ChannelBarProps) => {
  const { dragAndDropChannels } = useChannels();
  const { openModal, closeModal } = useModals();

  const { resetState } = useMakeGame();

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
      <ScrollContainer>
        <MainCircleContainer>
          <MainChannelCircle />
          <Line>
            <svg
              width='60'
              height='4'
              viewBox='0 0 60 4'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='60' height='4' rx='2' fill='white' />
            </svg>
          </Line>
        </MainCircleContainer>
        <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId='channels-drop' key='channelsKey'>
            {(provided, snapshot) => (
              <DropContainer ref={provided.innerRef} {...provided.droppableProps}>
                {channels &&
                  channels.map(
                    ({ channelLink, title, gameCategory, customChannelIndex, imgSrc }, index) => (
                      <Draggable
                        draggableId={'channel-' + channelLink}
                        index={index}
                        key={channelLink}
                      >
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
                              gameCategory={gameCategory}
                              customChannelIndex={customChannelIndex}
                              imgSrc={imgSrc}
                            />
                          </div>
                        )}
                      </Draggable>
                    ),
                  )}
                {provided.placeholder}
              </DropContainer>
            )}
          </Droppable>
        </DragDropContext>
        <ChannelParticipate
          onClick={() =>
            openModal(Modal, {
              onClose: () => {
                closeModal(Modal);
                resetState();
              },
              children: <SelectChannelType handleModal={() => closeModal(Modal)} />,
            })
          }
        >
          <CenteredIcon kind='plus' color='#FF4655' size={30} />
        </ChannelParticipate>
      </ScrollContainer>
    </ChannelbarContainer>
  );
};

const ChannelbarContainer = styled.div`
  width: 11.2rem;

  background-color: #d9d9d9;

  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0rem;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MainCircleContainer = styled.div``;

const Line = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;

const ChannelParticipate = styled.button`
  width: 6.2rem;
  height: 6.2rem;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin: 24px 0;
  background: #ffffff;
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
`;

export default ChannelBar;
