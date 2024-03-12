import fs from 'fs';

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ' Hours ' + minutes + ' Minutes';
}

let questions = [];

try {
  const data = fs.readFileSync('List.json', 'utf8');
  questions = JSON.parse(data);
} catch (err) {
  console.error('Error reading file:', err);
}

let lastQuestionIndex = -1;

let handler = async (m, { conn, text }) => {
  const user = global.db.data.users[m.sender];
  const name2 = conn.getName(m.sender);

  if (!('lastQuestionTime' in user) || Date.now() - user.lastQuestionTime >= 24 * 60 * 60 * 1000) {
    let questionIndex;
    do {
      questionIndex = Math.floor(Math.random() * questions.length);
    } while (questionIndex === lastQuestionIndex);
    
    lastQuestionIndex = questionIndex;

    conn.sendMessage(m.chat, questions[questionIndex].question, m);
    user.lastQuestionTime = Date.now();
    user.lastQuestionIndex = questionIndex;
  } else {
    if (text && 'lastQuestionIndex' in user && questions[user.lastQuestionIndex] && text.toLowerCase().trim() === questions[user.lastQuestionIndex].answer.toLowerCase().trim()) {
      const remainingTime = 24 * 60 * 60 * 1000 - (Date.now() - user.lastQuestionTime);
      const formattedTime = msToTime(remainingTime);
      conn.sendMessage(m.chat, `Correct! Please wait ${formattedTime} before asking another question.`, m);
    } else {
      conn.sendMessage(m.chat, `Incorrect! Please try again.`, m);
    }
  }
};

handler.command = /^(test)$/i;

export default handler;