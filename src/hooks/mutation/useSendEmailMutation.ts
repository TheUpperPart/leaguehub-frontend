import { MUTATION_MANAGEMENT } from '@constants/queryManagement';
import useInput from '@hooks/useInput';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const useSendEmailMutation = () => {
  const [email, setEmail, resetEmail] = useInput('');
  const [isSendVerifyEmail, setIsSendVerifyEmail] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: [MUTATION_MANAGEMENT.email.mutateKey],
    mutationFn: () => MUTATION_MANAGEMENT.email.mutateFn(email),
    onMutate: () => {
      alert('이메일을 보냈습니다.');
      setIsSendVerifyEmail(true);
    },
  });

  return { email, setEmail, resetEmail, isSendVerifyEmail, mutate };
};

export default useSendEmailMutation;
