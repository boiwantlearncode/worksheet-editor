import { create } from 'zustand'
import { QuestionType } from './Types';

type Store = {
  title: string;
  setTitle: (newTitle: string) => void;
  questions: QuestionType[];
  setQuestions: (questions: QuestionType[]) => void;
  selected: string | null;
  setSelected: (newSelected: string | null) => void;
};

const useStore = create<Store>((set) => ({
  title: "Untitled",
  setTitle: (newTitle: string) => set(() => ({ title: newTitle })),
  questions: [
    {
      "id": "1",
      "index": "1",
      "question": "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
      "questionType": "MCQ",
      "options": [
        {
          "identifier": "A", 
          "content": "5",
          "index": 1
        }, 
        {
          "identifier": "B", 
          "content": "12",
          "index": 2
        }, 
        {
          "identifier": "C", 
          "content": "3",
          "index": 3
        }, 
        {
          "identifier": "D", 
          "content": "20",
          "index": 4
        }, 
        {
          "identifier": "E", 
          "content": "",
          "index": 5
        }, 
      ]
    },
    {
      "id": "2",
      "index": "2",
      "question": "The global increase in greenhouse gases has been attributed to",
      "questionType": "MCQ",
      "options": [
        {
          "identifier": "A",
          "content": "industrial pollution in developing countriesasdf adsf asdf asdf  asdf adsf .",
          "index": 1
        },
        {
          "identifier": "B",
          "content": "coal mining and electricity generation.",
          "index": 2
        },
        {
          "identifier": "C",
          "content": "reduced rainfall in many parts of the world.",
          "index": 3
        },
        {
          "identifier": "D",
          "content": "trends in many population and lifestyle.",
          "index": 4
        },
        {
          "identifier": "E",
          "content": "",
          "index": 5
        },
      ]
    },
    {
      "id": "3",
      "index": "3",
      "question": "The boolean values of A and B are true and false respectively. What is the boolean addition of A and B?",
      "questionType": "MCQ",
      "options": [
        {
          "identifier": "A", 
          "content": "True",
          "index": 1
        }, 
        {
          "identifier": "B", 
          "content": "False",
          "index": 2
        },
        {
          "identifier": "C", 
          "content": "",
          "index": 3
        },
      ]
    },
  ],
  setQuestions: (newQuestions: QuestionType[]) => set(() => ({questions: newQuestions})),
  selected: null,
  setSelected: (newSelected: string | null) => set(() => ({selected: newSelected})),
}));

export default useStore;