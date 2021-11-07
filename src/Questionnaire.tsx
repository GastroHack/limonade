import React, { MutableRefObject, useRef, useState } from 'react';
import { Carousel, Tag } from 'antd';
import { List } from "immutable";

export interface SlideContent {
  question: string;
  answers: string[];
}

const firstSlide = {
  question: "Why are you here today?",
  answers: [
    "Meeting old friends", "On a Date", "Business meeting",
    "To Enjoy & Appreciate Fine Cuisine", "For Celebrating a Life Event"]};

const secondSlide = {
  question: "Please pick the products you don't eat if there are any",
  answers: [
    "Pork", "Lactose", "I'm vegetarian", "I'm vegan", "Chicken"]};

const allSlides = [firstSlide, secondSlide];


export const Questionnaire = (props: { toggleMenu: (b: boolean) => {}}) => {

  const [tagClicked, setTagClicked] = useState(List<string>([]))
  const slider: MutableRefObject<any> = useRef();
  return <Carousel
    style={{color: "red"}}
    ref={ref => slider.current = ref}
    afterChange={slide => {
      slide === 0 && props.toggleMenu(true)}
    }
  >
  {allSlides.map((slide, slideNumber) => 
  <div>
    <div style={{
      color: '#fff',
      height: "300px",
      textAlign: 'center',
      background: '#364d79',
    }}>
      <h3 style={{fontSize: 30, color: "white"}}>
        {slide.question}
      </h3>
      {slide.answers.map((ans, i) =>
        <Tag
          style={{backgroundColor: tagClicked.get(i), borderRadius: 15, fontSize: 20, marginBottom: 3}}
          onClick={() => {
            setTagClicked(tagClicked.set(i, "darkblue"))
            if (slideNumber === allSlides.length - 1) {
              props.toggleMenu(true)
            } else {
              setTimeout(() => {
                slider.current.next()
                setTagClicked(List<string>([]))
              }, 200)
            }
          }}
        >
          {ans}
        </Tag>)}
    </div>
  </div>
  )}
  </Carousel>;
}
    
export default Questionnaire;
