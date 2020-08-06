import React from 'react';



const Questionaire = ({
    handleAnswer,
    data: { question, correct_answer,
        incorrect_answers },
}) => {

    const ShuffledAnswer = [correct_answer, ...incorrect_answers].sort(
        () => Math.random() - 0.5
    );

    return (
        <div className="container">
            <div >
                <h2 dangerouslySetInnerHTML={{ __html: question }} className='quizH2'>

                </h2>
            </div>
            <div className='results'>
                {ShuffledAnswer.map(answer => (
                    <button 
                        className='button1'
                        onClick={() => handleAnswer
                            (answer)} dangerouslySetInnerHTML={{ __html: answer }} />
                ))}
            </div>
        </div>
    );
};


export default Questionaire;