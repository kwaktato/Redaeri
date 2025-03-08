import Loading from '@/components/loading/Loading';
import ReviewComplete from '@/components/review/ReviewComplete';
import ReviewFail from '@/components/review/ReviewFail';
import ReviewInclude from '@/components/review/ReviewInclude';
import ReviewUpload from '@/components/review/ReviewUpload';
import { getReviewAnswer, updateReviewAnswer } from '@/services/review';
import { Answer, PostAnswer, reviewTypeMapping } from '@/types/review';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

const Review = () => {
  const [score, setScore] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [includeText, setIncludeText] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState<Answer>();

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

  const postMutation = useMutation({
    mutationFn: (data: PostAnswer) => getReviewAnswer(data),
    onMutate: () => {
      setCurrentStep(0);
      setIsloading(true);
    },
    onSuccess: (result) => {
      setData(result.data);
      setCurrentStep(3);
      window.scrollTo(0, 0);
    },
    onError: (e) => {
      /* eslint-disable no-console */
      console.log('리뷰 생성 에러: ', e);
      setCurrentStep(4);
      window.scrollTo(0, 0);
    },
    onSettled: () => {
      setIsloading(false);
    },
  });

  const postReview = async () => {
    const data = {
      score,
      reviewText,
      includeText,
    };
    postMutation.mutate(data);
  };

  const patchMutation = useMutation({
    mutationFn: (data: number) => updateReviewAnswer(data),
    onMutate: () => {
      setCurrentStep(0);
      setIsloading(true);
    },
    onSuccess: (result) => {
      setData(result.data);
      setCurrentStep(3);
      window.scrollTo(0, 0);
    },
    onError: (e) => {
      console.log('리뷰 생성 에러: ', e);
      setCurrentStep(4);
      window.scrollTo(0, 0);
    },
    onSettled: () => {
      setIsloading(false);
    },
  });

  const patchReview = async (logIdx: number) => {
    patchMutation.mutate(logIdx);
  };

  const reviewTypeFormat = reviewTypeMapping[data?.reviewType || 'true'];

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

      {isloading && (
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
          reviewType={reviewTypeFormat}
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
