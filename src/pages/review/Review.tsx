import Loading from '@/components/loading/Loading';
import ReviewComplete from '@/components/review/ReviewComplete';
import ReviewFail from '@/components/review/ReviewFail';
import ReviewInclude from '@/components/review/ReviewInclude';
import ReviewUpload from '@/components/review/ReviewUpload';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

interface Answer {
  logIdx: number;
  score: number;
  generateAnswer: string;
  reviewType: string;
  reviewText: string;
}

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
    window.scrollTo(0, 0);
  };

  const handleIncludeText = (include: string) => {
    setIncludeText(include);
  };

  const beforeButton = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  const [data, setData] = useState<Answer>();

  const baseURL = import.meta.env.VITE_APP_API_URL;
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

    // const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6NDIsImV4cCI6MTc0MTcwNzIwMywiaWF0IjoxNzQwODQzMjAzfQ.JWHbxheQDgu4U1BhJWALFw7ANgp6iWVxtrtbREW6bCg';

    try {
      const result = await axios.post(
        `${baseURL}/api/v1/answer/generate`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Token: token,
          },
        }
      );
      console.log(result.data);
      setData(result.data.data);
      setCurrentStep(3);
      window.scrollTo(0, 0);
    } catch (e) {
      console.log('리뷰 생성 에러: ', e);
      setCurrentStep(4);
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const patchReview = async (logIdx: number) => {
    setCurrentStep(0);
    setIsLoading(true);

    // const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6NDIsImV4cCI6MTc0MTcwNzIwMywiaWF0IjoxNzQwODQzMjAzfQ.JWHbxheQDgu4U1BhJWALFw7ANgp6iWVxtrtbREW6bCg';

    try {
      const result = await axios.patch(
        `${baseURL}/api/v1/answer/generate/retry`,
        { logIdx: logIdx },
        {
          headers: {
            'Content-Type': 'application/json',
            Token: token,
          },
        }
      );
      console.log(result.data);
      setData(result.data.data);
      setCurrentStep(3);
      window.scrollTo(0, 0);
    } catch (e) {
      console.log('리뷰 생성 에러: ', e);
      setCurrentStep(4);
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {currentStep === 1 && (
        <ReviewUpload handleReviewUpload={handleReviewUpload} />
      )}

      {currentStep === 2 && (
        <ReviewInclude
          includeText={includeText}
          beforeButton={beforeButton}
          handleIncludeText={handleIncludeText}
          handlePostAnswer={postReview}
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
          patchReview={patchReview}
          logIdx={data?.logIdx}
          score={data?.score}
          generateAnswer={data?.generateAnswer}
          reviewType={data?.reviewType}
          reviewText={data?.reviewText}
        />
      )}

      {currentStep === 4 && (
        <ReviewFail
          toReview={() => {
            setCurrentStep(1);
            window.scrollTo(0, 0);
          }}
        />
      )}
    </Container>
  );
};

export default Review;

const Container = styled.div``;
