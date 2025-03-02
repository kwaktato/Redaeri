import PersonaType1 from '@/assets/images/persona-1.png';
import PersonaType2 from '@/assets/images/persona-2.png';
import PersonaType3 from '@/assets/images/persona-3.png';
import PersonaType4 from '@/assets/images/persona-4.png';
import PersonaType5 from '@/assets/images/persona-5.png';

export const PERSONA_IMG_TYPE = [
  PersonaType1,
  PersonaType2,
  PersonaType3,
  PersonaType4,
  PersonaType5,
];

export const PERSONA_SELECT_QUESTION_VALUE = [
  '주문해주셔서 감사합니다~!!🌸🌸 행복한 하루 되세요😆',
  '리뷰 감사합니다. 음식이 맛있으셨다니 다행이에요 :)',
  '우리 손님~ 맛있었다니 제가 더 기분이 좋네요~~~ ^^',
  '맛있게 드셨다니 기쁩니다. 늘 최선을 다하겠습니다.',
  '손님 이리 와봐유! 이렇게 먹으면 더 맛있슈~',
];

export const PERSONA_SELECT_PERSONA_KEY = [
  '해피바이러스! 발랄한 20대 알바생',
  '예의 바르고 나이스한 30대 초보 사장님',
  '단골 챙기는 정 많고 유쾌한 40대 사장님',
  '묵묵히 음식에 최선을 다하는 60대 사장님',
  '충청도 출식 외식업 강자 사장님',
];

export const PERSONA_EMOTION_QUESTION = [
  '고객님께 감사해요🙏',
  '고객님 덕분에 행복해요🤩',
  '고객님의 리뷰가 힘이 돼요💪',
];

export const PERSONA_LENGTH_QUESTION = [
  '정성이 최고 긴~ 답변',
  '길지도 짧지도 않게 알잘딱깔센',
  '정성이 최고 짧은~ 답변',
];

export interface PersonaInsertType {
  personaSelect: string;
  emotionSelect: string;
  lengthSelect: string;
}

export interface GetPersonaType {
  allAnswer: string;
  emotionSelect: string;
  personaSelect: string;
  personaImgType: number;
  lengthSelect: string;
  personaIdx: number;
  storeIdx: number;
}
