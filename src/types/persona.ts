export const PERSONA_REVIEW_QUESTION = [
  '주문해주셔서 감사합니다~!!🌸🌸 행복한 하루 되세요😆',
  '리뷰 감사합니다. 음식이 맛있으셨다니 다행이에요 :)',
  '우리 손님~ 맛있었다니 제가 더 기분이 좋네요~~~ ^^',
  '맛있게 드셨다니 기쁩니다. 늘 최선을 다하겠습니다.',
  '손님 이리 와봐유! 이렇게 먹으면 더 맛있슈~',
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

export interface PersonaSuccess {
  allAnswer: string;
  emotionSelect: string;
  idx: number;
  personaSelect: string;
  personaImgType: number;
  storeIdx: number;
  loginIdx: number;
  lengthSelect: string;
}
