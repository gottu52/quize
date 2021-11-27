'use strict'
{
    const question = document.querySelector('#question');
    const choices = document.querySelector('#choices');
    const btn = document.querySelector('#btn');
    const result = document.querySelector('#result');
    const scoreLabel = document.querySelector('#result > p');

    // 選択肢のシャッフル
    const shuffle = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    // データ
    const quizeSet = shuffle([
        {q: 'What is A?', c:['A0', 'A1', 'A2']},
        {q: 'What is B?', c:['B0', 'B1', 'B2']},
        {q: 'What is C?', c:['C0', 'C1', 'C2']},
    ]);
    let currentNum = 0;
    let isAnswerd;
    let score = 0;

    // 正誤判定
    const checkAnswer = (li) => {
        if(isAnswerd) {
            return;
        }
        isAnswerd = true;
        if(li.textContent === quizeSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }
        btn.classList.remove('disabled');
    }

    // HTMLの描画
    const setQuize = () => {
        // 前の問題の削除
        while(choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }
        isAnswerd = false;
        // お題
        question.textContent = quizeSet[currentNum].q;
        // 選択肢
        const shuffledChoices = shuffle([...quizeSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            })
            choices.appendChild(li);
        });
        if (currentNum === quizeSet.length - 1) {
            btn.textContent = 'show score';
        }
    }
    setQuize();

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');
        if (currentNum === quizeSet.length - 1) {
            scoreLabel.textContent = `Score: ${score} / ${quizeSet.length}`;
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuize();   
        }
        
    })
    
}