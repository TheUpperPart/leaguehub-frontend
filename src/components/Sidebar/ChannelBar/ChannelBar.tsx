import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import styled from '@emotion/styled';

import SelectChannelType from '@components/Sidebar/ChannelBar/SelectChannelType';
import ChannelCircle from '@components/Sidebar/ChannelCircle/ChannelCircle';
import useChannels from '@hooks/useChannels';
import Modal from '@components/Modal';
import Icon from '@components/Icon';
import useModals from '@hooks/useModals';
import useMakeGame from '@hooks/useMakeGame';
import MainChannelCircle from '../ChannelCircle/MainChannelCircle';
import { useRouter } from 'next/router';

const ChannelBar = () => {
  const router = useRouter();

  const { channels, dragAndDropChannels } = useChannels();
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
        </MainCircleContainer>
        <Line>
          <svg
            width='60'
            height='4'
            viewBox='0 0 60 4'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='60' height='4' rx='2' fill='#3a3c3e' />
          </svg>
        </Line>
        <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId='channels-drop' key='channelsKey'>
            {(provided, snapshot) => (
              <DropContainer ref={provided.innerRef} {...provided.droppableProps}>
                {channels &&
                  channels.map(({ channelLink, title, gameCategory, imgSrc }, index) => (
                    <Draggable
                      draggableId={'channel-' + channelLink}
                      index={index}
                      key={channelLink}
                    >
                      {(provided, snapshot) => (
                        <ChannelContainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ChannelCircle
                            title={title}
                            gameCategory={gameCategory}
                            imgSrc={imgSrc}
                            channelLink={channelLink}
                          />
                          {channelLink === (router.query.channelLink as string) && <SelectLine />}
                        </ChannelContainer>
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
              onClose: () => {
                closeModal(Modal);
                resetState();
              },
              children: <SelectChannelType handleModal={() => closeModal(Modal)} />,
            })
          }
        >
          <Icon kind='plus' color='#FF4655' size={30} />
        </ChannelParticipate>
      </ScrollContainer>
    </ChannelbarContainer>
  );
};

const ChannelbarContainer = styled.div`
  width: 9rem;
  height: inherit;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme['bg-60']};
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

const ChannelContainer = styled.div`
  width: 9rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ChannelParticipate = styled.button`
  width: 5rem;
  height: 5rem;
  margin-top: 1rem;

  border: 0;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme['bg-40']};
`;

const DropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectLine = styled.div`
  width: 0.4rem;
  height: 4rem;

  position: absolute;
  left: 0;
  top: 1.5rem;

  background-color: ${({ theme }) => theme.text};
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
`;

export default ChannelBar;
