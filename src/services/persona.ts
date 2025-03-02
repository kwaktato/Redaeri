import { fetcher } from './request';
import { GetPersonaType } from '@/types/persona';

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
  return fetcher('/persona/update', {
    method: 'PATCH',
    data: { allAnswer, personaIdx },
  });
};

export const createPersonaByUpload = async ({
  files,
  answers,
}: {
  files: File[];
  answers: string[];
}) => {
  const formData = new FormData();
  const handleIndexText = (index: number) =>
    index === 0
      ? 'uploadTextFirst'
      : index === 1
        ? 'uploadTextSecond'
        : 'uploadTextThird';

  answers.forEach((answer, index) => {
    formData.append(`uploadText${handleIndexText(index)}`, answer);
  });

  files.forEach((file) => {
    formData.append('uploadFileList', file);
  });

  return fetcher('/persona/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
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
