import React, { useState, useEffect, useCallback } from 'react';
import { DATA } from '../constants';
import { VocabItem, QuizQuestion } from '../types';

interface QuizViewProps {
  onRestart: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ onRestart }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Helper to shuffle array
  const shuffle = <T,>(array: T[]): T[] => {
    const arr = [...array];
    let currentIndex = arr.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  };

  const generateQuiz = useCallback(() => {
    const allVocab: VocabItem[] = [];
    Object.keys(DATA).forEach(key => {
      allVocab.push(...DATA[key].items);
    });

    const shuffledVocab = shuffle(allVocab);
    const quizItems = shuffledVocab.slice(0, 10);

    const generatedQuestions: QuizQuestion[] = quizItems.map(item => {
      const isContextQuestion = Math.random() < 0.5 && item.frasePt && item.fraseEs;
      let questionText = `Traduce al español: "${item.pt}"`;
      let correct = item.es;
      let options: string[] = [];

      if (isContextQuestion && item.frasePt && item.fraseEs) {
        questionText = `Si alguien dice: "${item.frasePt}", ¿qué significa?`;
        correct = item.fraseEs;
        
        // Distractors for context
        const distractors: string[] = [];
        distractors.push(item.es); // The literal word is a good distractor

        // Random other phrases
        const pool = allVocab.filter(v => v.fraseEs && v.fraseEs !== correct);
        const randomDistractor = shuffle(pool)[0];
        if (randomDistractor && randomDistractor.fraseEs) {
          distractors.push(randomDistractor.fraseEs);
        } else {
          distractors.push("No se entiende el contexto");
        }

        let uniqueOptions = [...new Set([correct, ...distractors])];
        // Fill to 3 if needed
        while(uniqueOptions.length < 3) {
            const filler = shuffle(allVocab.filter(v => v.es && !uniqueOptions.includes(v.es)))[0].es;
            uniqueOptions.push(filler);
        }
        options = shuffle(uniqueOptions.slice(0, 3));

      } else {
        // Standard translation question
        const pool = allVocab.filter(v => v.es !== correct);
        const distractors = shuffle(pool).slice(0, 2).map(v => v.es);
        options = shuffle([correct, ...distractors]);
      }

      return {
        question: questionText,
        correctAnswer: correct,
        options
      };
    });

    setQuestions(generatedQuestions);
    setScore(0);
    setCurrentIndex(0);
    setShowResults(false);
    setIsAnswered(false);
    setSelectedOption(null);
  }, []);

  useEffect(() => {
    generateQuiz();
  }, [generateQuiz]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedOption(option);
    
    if (option === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    // Auto advance
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedOption(null);
      } else {
        setShowResults(true);
      }
    }, 1200);
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    let feedback = '';
    if (percentage >= 80) feedback = '¡Excelente! ¡Ya hablas como un nativo!';
    else if (percentage >= 50) feedback = '¡Muy bien! Sigue practicando.';
    else feedback = '¡No te desanimes! La práctica hace al maestro.';

    return (
      <div className="text-center p-6 animate-[fadeIn_0.5s_ease-out]">
        <h3 className="text-3xl font-bold text-[#009C3B] mb-4">Test Completado</h3>
        <p className="text-2xl mb-4">Tu puntuación:</p>
        <p className="text-6xl font-extrabold text-[#002776]">{score}/{questions.length}</p>
        <p className="text-lg text-gray-700 mt-2">({percentage.toFixed(0)}%)</p>
        <p className="mt-6 text-xl text-gray-800 font-medium">{feedback}</p>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-2xl font-bold text-[#009C3B] mb-4">¿Quieres hablar portugués con fluidez?</h4>
          <a href="https://go.hotmart.com/R103170159Q" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-[#FFDF00] text-[#002776] font-bold py-3 px-6 rounded-lg shadow-xl hover:bg-[#E5C800] transition-colors text-xl border border-yellow-500">
            📚 Iniciar Curso Digital
          </a>
        </div>
        
        <button 
          onClick={generateQuiz} 
          className="mt-6 bg-gray-400 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-500 transition-colors"
        >
          Reiniciar Test
        </button>
      </div>
    );
  }

  if (questions.length === 0) return <div>Cargando test...</div>;

  const currentQ = questions[currentIndex];

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
        <div className="mb-4">
            <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Pregunta {currentIndex + 1} de {questions.length}</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div 
                    className="bg-[#009C3B] h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
            </div>
        </div>
      
      <p className="text-xl mb-6 font-semibold text-[#009C3B] min-h-[4rem]">{currentQ.question}</p>
      
      <div className="flex flex-col space-y-3">
        {currentQ.options.map((option, index) => {
          let btnClass = "w-full text-left p-4 mb-3 bg-white rounded-lg cursor-pointer transition-all duration-200 shadow-sm border-2 border-gray-100 hover:bg-gray-50";
          
          if (isAnswered) {
             if (option === currentQ.correctAnswer) {
                 btnClass = "w-full text-left p-4 mb-3 rounded-lg border-2 shadow-lg bg-green-100 border-[#009C3B]";
             } else if (option === selectedOption) {
                 btnClass = "w-full text-left p-4 mb-3 rounded-lg border-2 shadow-lg bg-red-100 border-red-500";
             } else {
                 btnClass = "w-full text-left p-4 mb-3 bg-gray-50 rounded-lg border-2 border-gray-100 opacity-50";
             }
          }

          return (
            <button 
              key={index} 
              className={btnClass}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
            >
              <span className="text-lg text-gray-800">{option}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-between items-center text-sm font-bold text-gray-500">
        <span>Puntuación: {score}</span>
        {isAnswered && (
             <span className="text-[#002776]">{selectedOption === currentQ.correctAnswer ? '¡Correcto!' : 'Incorrecto'}</span>
        )}
      </div>
    </div>
  );
};

export default QuizView;
