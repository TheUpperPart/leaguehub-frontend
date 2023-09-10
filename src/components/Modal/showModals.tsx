import useModals from '@hooks/useModals';

const Modals = () => {
  const { modals } = useModals();

  return (
    <>
      {modals.map(({ Component, props }, idx) => {
        return <Component key={idx} {...props} />;
      })}
    </>
  );
};

export default Modals;
