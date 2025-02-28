import Loading from '@/components/loading/Loading';
import ReviewComplete from '@/components/review/ReviewComplete';
import ReviewInclude from '@/components/review/ReviewInclude';
import ReviewUpload from '@/components/review/ReviewUpload';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

/* eslint-disable no-console */
const Review = () => {
  const [score, setScore] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [includeText, setIncludeText] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleReviewUpload = (rating: number, review: string) => {
    setScore(rating);
    setReviewText(review);
    setCurrentStep(2);
  };

  const handleIncludeText = (include: string) => {
    setIncludeText(include);
  };

  const postReview = async () => {
    setCurrentStep(0);
    setIsLoading(true);

    // api 연결 코드
    // 리대리 답변해 api, response는 받아서 reviewcomplete에 전달
    const data = {
      score: score,
      reviewText: reviewText,
      includeText: includeText,
    };
    console.log(data);
    try {
      const result = await axios.post('', data);
      console.log(result);
    } catch (e) {
      console.log('리뷰 생성 에러: ', e);
    }

    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
    }, 2000);
  };

  return (
    <Container>
      {currentStep === 1 && (
        <ReviewUpload handleReviewUpload={handleReviewUpload} />
      )}

      {currentStep === 2 && (
        <ReviewInclude
          includeText={includeText}
          handleIncludeText={handleIncludeText}
          handlePostAnswer={postReview}
          beforeButton={() => setCurrentStep(1)}
        />
      )}

      {isLoading && (
        <Loading
          first='고객의 리뷰를 분석하고'
          second='찰떡같은 답변을 작성 중이에요'
          details={[
            '리대리를 호출하고 있어요',
            '리대리가 달려오고 있어요',
            '리대리가 사장님으로 변신하고 있어요',
            '리뷰 내용을 확인하고 있어요',
            '답변을 작성하고 있어요',
          ]}
        />
      )}

      {currentStep === 3 && (
        <ReviewComplete
          anotherButton={() => setCurrentStep(1)}
          postReview={postReview}
        />
      )}
    </Container>
  );
};

export default Review;

const Container = styled.div``;
