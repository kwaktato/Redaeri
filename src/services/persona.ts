import { fetcher } from './request';
import { EmotionPrefer, GetPersonaType, PersonaPrefer } from '@/types/persona';

export const getPersona = async () => {
  const { data } = await fetcher<GetPersonaType>('/persona/get');
  return data;
};

export const createPersona = async ({
  emotionSelect,
  lengthSelect,
  personaSelect,
}: {
  emotionSelect: string;
  lengthSelect: string;
  personaSelect: string;
}) => {
  return fetcher<GetPersonaType>('/persona/insert', {
    method: 'POST',
    data: {
      emotionSelect,
      lengthSelect,
      personaSelect,
    },
  });
};

export const updateAllAnswer = async ({
  allAnswer,
  personaIdx,
}: {
  allAnswer: string;
  personaIdx: number;
}) => {
  return fetcher('/persona/answer/update', {
    method: 'PATCH',
    data: { allAnswer, personaIdx },
  });
};

export const createPersonaByUpload = async ({
  files,
  answers,
  personaIdx,
}: {
  files: File[];
  answers: string[];
  personaIdx?: number;
}) => {
  const formData = new FormData();
  const handleIndexText = (index: number) =>
    index === 0
      ? 'uploadTextFirst'
      : index === 1
        ? 'uploadTextSecond'
        : 'uploadTextThird';

  answers.forEach((answer, index) => {
    formData.append(`${handleIndexText(index)}`, answer);
  });

  files.forEach((file) => {
    formData.append('uploadFileList', file);
  });

  if (personaIdx) {
    formData.append('personaIdx', personaIdx.toString());
  }

  const data = await fetcher<GetPersonaType>('/persona/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return data;
};

export const updatePersona = async ({
  personaIdx,
  emotionSelect,
  lengthSelect,
  personaSelect,
}: {
  personaIdx: number;
  emotionSelect: string;
  lengthSelect: string;
  personaSelect: string;
}) => {
  return fetcher<GetPersonaType>('/persona/update', {
    method: 'PATCH',
    data: {
      personaIdx,
      emotionSelect,
      lengthSelect,
      personaSelect,
    },
  });
};

export const getPreferPersona = async () => {
  const { data } = await fetcher<PersonaPrefer>('/persona/prefer');
  return data;
};

export const getPreferEmotion = async () => {
  const { data } = await fetcher<EmotionPrefer>('/emotion/prefer');
  return data;
};
