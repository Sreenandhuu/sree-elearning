// const lesson = (title, skill, minutes, type = 'video', content = '') => ({
//   title,
//   skill,
//   minutes,
//   type,
//   content,
//   order: 0,
// });
const lesson = (
  title,
  skill,
  minutes,
  type = 'video',
  content = '',
  videoUrl = ''
) => ({
  title,
  skill,
  minutes,
  type,
  content,
  videoUrl,
  order: 0,
});

export const courses = [
  {
    title: 'Web Development',
    slug: 'web-development',
    track: 'webdev',
    emoji: '💻',
    tagline: 'Build real websites, one week at a time.',
    description:
      'Start with a single page and finish with a working site you can send to your family. Every week adds one new idea and one thing you build.',
    ageMin: 10,
    ageMax: 14,
    priceCents: 499000,
    durationWeeks: 12,
    classesPerWeek: 2,
    skills: [
      { name: 'HTML', order: 1 },
      { name: 'CSS', order: 2 },
      { name: 'JavaScript', order: 3 },
      { name: 'React', order: 4 },
      { name: 'APIs', order: 5 },
      { name: 'Git', order: 6 },
    ],
    levels: [
      {
        title: 'Level 1 — Your first page',
        summary: 'What a website actually is, and how to write one.',
        order: 1,
        lessons: [
          lesson('What is a website?', 'HTML', 7, 'video'),
          lesson('Headings, text and images', 'HTML', 10, 'video'),
          lesson('Links and lists', 'HTML', 9, 'video'),
          lesson(
            'Mini challenge: your first webpage',
            'HTML',
            15,
            'challenge',
            'Make a page about your favourite animal. It needs one heading, two paragraphs, one image and one link.'
          ),
        ],
        quiz: {
          title: 'HTML basics',
          passScore: 70,
          questions: [
            {
              prompt: 'Which tag makes the biggest heading on a page?',
              options: ['<h6>', '<h1>', '<big>', '<head>'],
              correctIndex: 1,
              explanation: 'Headings run from <h1> (biggest) down to <h6> (smallest).',
            },
            {
              prompt: 'What does an <img> tag need so the picture shows up?',
              options: ['A colour', 'A src attribute', 'A closing tag', 'A font'],
              correctIndex: 1,
              explanation: 'src tells the browser where to find the image file.',
            },
            {
              prompt: 'Which one creates a clickable link?',
              options: ['<link>', '<a>', '<url>', '<go>'],
              correctIndex: 1,
              explanation: '<a href="..."> is the anchor tag — it makes links.',
            },
          ],
        },
        project: {
          title: 'Personal profile page',
          brief: 'One page about you: a photo, three things you like, and a link to something you enjoy.',
        },
      },
      {
        title: 'Level 2 — Make it look good',
        summary: 'Colour, spacing and layout with CSS.',
        order: 2,
        lessons: [
          lesson('Colours and fonts', 'CSS', 10, 'video'),
          lesson('The box model, without the scary name', 'CSS', 12, 'video'),
          lesson('Flexbox: putting things side by side', 'CSS', 12, 'video'),
          lesson('Making it work on a phone', 'CSS', 10, 'video'),
          lesson(
            'Mini challenge: restyle your page',
            'CSS',
            20,
            'challenge',
            'Take your profile page and give it a colour scheme, a font you chose, and a layout that works on a phone.'
          ),
        ],
        quiz: {
          title: 'CSS basics',
          passScore: 70,
          questions: [
            {
              prompt: 'Which property changes the space inside an element, around its content?',
              options: ['margin', 'padding', 'border', 'gap'],
              correctIndex: 1,
              explanation: 'Padding is inside the border, margin is outside it.',
            },
            {
              prompt: 'To put three boxes in a row with even gaps, what would you reach for?',
              options: ['display: flex', 'position: absolute', 'float: left', 'display: none'],
              correctIndex: 0,
              explanation: 'Flexbox handles rows and gaps with very little code.',
            },
          ],
        },
      },
      {
        title: 'Level 3 — Make it do things',
        summary: 'JavaScript: buttons that respond, pages that change.',
        order: 3,
        lessons: [
          lesson('Variables and what they hold', 'JavaScript', 10, 'video'),
          lesson('If this, then that', 'JavaScript', 10, 'video'),
          lesson('Loops: doing it again', 'JavaScript', 11, 'video'),
          lesson('Making a button actually work', 'JavaScript', 12, 'video'),
          lesson(
            'Mini challenge: build a quiz game',
            'JavaScript',
            25,
            'challenge',
            'Five questions, a score at the end, and a button to play again.'
          ),
        ],
        quiz: {
          title: 'JavaScript basics',
          passScore: 70,
          questions: [
            {
              prompt: 'What does a loop do?',
              options: [
                'Runs code once',
                'Repeats code until you tell it to stop',
                'Deletes code',
                'Styles the page',
              ],
              correctIndex: 1,
              explanation: 'Loops repeat a block of code so you do not have to copy it out.',
            },
            {
              prompt: 'Which one listens for a click?',
              options: ['addEventListener', 'querySelector', 'console.log', 'setTimeout'],
              correctIndex: 0,
              explanation: 'addEventListener("click", ...) runs your code when the click happens.',
            },
          ],
        },
        project: {
          title: 'Interactive quiz game',
          brief: 'A working quiz with a score counter and a replay button. Send us the link.',
        },
      },
      {
        title: 'Level 4 — Real tools',
        summary: 'React, live data, and saving your work properly.',
        order: 4,
        lessons: [
          lesson('Why React exists', 'React', 9, 'video'),
          lesson('Components and props', 'React', 12, 'video'),
          lesson('State: remembering things', 'React', 12, 'video'),
          lesson('Fetching real data from an API', 'APIs', 12, 'video'),
          lesson('Saving your work with Git', 'Git', 10, 'video'),
          lesson('Putting your site on the internet', 'Git', 12, 'video'),
        ],
        quiz: {
          title: 'React and APIs',
          passScore: 70,
          questions: [
            {
              prompt: 'What is a React component?',
              options: [
                'A reusable piece of the page',
                'A CSS file',
                'A kind of database',
                'A browser',
              ],
              correctIndex: 0,
              explanation: 'A component is a chunk of UI you can use over and over.',
            },
            {
              prompt: 'An API mostly lets your site do what?',
              options: [
                'Change colours',
                'Get data from somewhere else',
                'Run faster',
                'Add images',
              ],
              correctIndex: 1,
              explanation: 'APIs are how one program asks another for information.',
            },
          ],
        },
        project: {
          title: 'Final project: a React site with live data',
          brief:
            'Pick something you care about — weather, cricket scores, book lists. Build a React site that fetches it and shows it nicely. Put it online.',
        },
      },
    ],
  },
  {
    title: 'Chess',
    slug: 'chess',
    track: 'chess',
    emoji: '♟',
    tagline: 'Think three moves ahead.',
    description:
      'Short puzzles and two live games a week. This is where the thinking habits for everything else get built.',
    ageMin: 8,
    ageMax: 16,
    priceCents: 349000,
    durationWeeks: 12,
    classesPerWeek: 2,
    skills: [
      { name: 'Openings', order: 1 },
      { name: 'Tactics', order: 2 },
      { name: 'Endgames', order: 3 },
      { name: 'Strategy', order: 4 },
    ],
    levels: [
      {
        title: 'Level 1 — Board sense',
        summary: 'Getting comfortable with how the pieces really work.',
        order: 1,
        lessons: [
          lesson(
    'How each piece moves',
    'Openings',
    8,
    'video',
    '',
    'OCSbzArwB10'
  ),
          lesson('Controlling the centre', 'Openings', 9, 'video'),
          lesson('Castling early', 'Openings', 7, 'video'),
          lesson('Puzzle set: 10 opening positions', 'Openings', 15, 'challenge'),
        ],
        quiz: {
          title: 'Opening principles',
          passScore: 70,
          questions: [
            {
              prompt: 'In the opening, what should you usually do first?',
              options: [
                'Move the queen out early',
                'Control the centre and develop pieces',
                'Push all your pawns',
                'Trade everything',
              ],
              correctIndex: 1,
              explanation: 'Centre control and development beat early queen raids.',
            },
          ],
        },
      },
      {
        title: 'Level 2 — Tactics',
        summary: 'Forks, pins and skewers — spotting the winning move.',
        order: 2,
        lessons: [
          lesson('The fork', 'Tactics', 8, 'video'),
          lesson('Pins and skewers', 'Tactics', 9, 'video'),
          lesson('Discovered attacks', 'Tactics', 9, 'video'),
          lesson('Puzzle set: 20 tactics', 'Tactics', 20, 'challenge'),
        ],
        quiz: {
          title: 'Tactics',
          passScore: 70,
          questions: [
            {
              prompt: 'A fork is when one piece...',
              options: [
                'Attacks two pieces at once',
                'Blocks a check',
                'Promotes to a queen',
                'Moves backwards',
              ],
              correctIndex: 0,
              explanation: 'One attacker, two targets. Your opponent can only save one.',
            },
          ],
        },
      },
      {
        title: 'Level 3 — Finishing games',
        summary: 'Endgames and a rated tournament.',
        order: 3,
        lessons: [
          lesson('King and pawn endings', 'Endgames', 11, 'video'),
          lesson('Rook endings', 'Endgames', 12, 'video'),
          lesson('Making a plan', 'Strategy', 12, 'video'),
          lesson('Reviewing your own games', 'Strategy', 10, 'video'),
        ],
        project: {
          title: 'Play a rated tournament',
          brief: 'Five games. Then write two sentences about each loss — what you would do differently.',
        },
      },
    ],
  },
  {
    title: 'AI & Machine Learning',
    slug: 'ai-and-ml',
    track: 'aiml',
    emoji: '🤖',
    tagline: 'Teach a computer to notice things.',
    description:
      'Python first, then models you train yourself. By the end you will have built something that makes a prediction.',
    ageMin: 12,
    ageMax: 16,
    priceCents: 599000,
    durationWeeks: 14,
    classesPerWeek: 1,
    skills: [
      { name: 'Python', order: 1 },
      { name: 'Data', order: 2 },
      { name: 'Models', order: 3 },
      { name: 'Ethics', order: 4 },
    ],
    levels: [
      {
        title: 'Level 1 — Python',
        summary: 'Enough Python to get things done.',
        order: 1,
        lessons: [
          lesson('Your first Python program', 'Python', 10, 'video'),
          lesson('Lists and dictionaries', 'Python', 12, 'video'),
          lesson('Functions', 'Python', 11, 'video'),
          lesson('Mini challenge: a number guessing game', 'Python', 20, 'challenge'),
        ],
        quiz: {
          title: 'Python basics',
          passScore: 70,
          questions: [
            {
              prompt: 'Which one stores a list of items in order?',
              options: ['dict', 'list', 'int', 'str'],
              correctIndex: 1,
              explanation: 'A list keeps items in the order you put them in.',
            },
          ],
        },
      },
      {
        title: 'Level 2 — Data',
        summary: 'Where data comes from and why messy data ruins everything.',
        order: 2,
        lessons: [
          lesson('What counts as data', 'Data', 9, 'video'),
          lesson('Reading a CSV file', 'Data', 11, 'video'),
          lesson('Drawing your first chart', 'Data', 12, 'video'),
          lesson('Cleaning up messy data', 'Data', 12, 'video'),
        ],
        quiz: {
          title: 'Working with data',
          passScore: 70,
          questions: [
            {
              prompt: 'Why does messy data matter?',
              options: [
                'It makes files bigger',
                'A model trained on bad data makes bad predictions',
                'It slows down the internet',
                'It does not matter',
              ],
              correctIndex: 1,
              explanation: 'Garbage in, garbage out — the model can only learn what you show it.',
            },
          ],
        },
      },
      {
        title: 'Level 3 — Models',
        summary: 'Training something that actually predicts.',
        order: 3,
        lessons: [
          lesson('What "learning" means for a machine', 'Models', 10, 'video'),
          lesson('Training and testing', 'Models', 12, 'video'),
          lesson('Your first classifier', 'Models', 15, 'video'),
          lesson('When models get it wrong, and who it hurts', 'Ethics', 12, 'video'),
        ],
        project: {
          title: 'Final project: train your own model',
          brief:
            'Pick a dataset, train a model, and explain in plain words what it predicts and where it fails.',
        },
      },
    ],
  },
  {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    track: 'cyber',
    emoji: '🛡️',
    tagline: 'Stay safe online, then learn how it all works.',
    description:
      'Starts with the things every kid should know, then goes into how networks and attacks actually work.',
    ageMin: 11,
    ageMax: 16,
    priceCents: 449000,
    durationWeeks: 10,
    classesPerWeek: 1,
    skills: [
      { name: 'Online safety', order: 1 },
      { name: 'Networking', order: 2 },
      { name: 'Threats', order: 3 },
      { name: 'Defence', order: 4 },
    ],
    levels: [
      {
        title: 'Level 1 — Staying safe',
        summary: 'Passwords, scams and what not to share.',
        order: 1,
        lessons: [
          lesson('Passwords that actually work', 'Online safety', 8, 'video'),
          lesson('Spotting a scam message', 'Online safety', 10, 'video'),
          lesson('What not to post', 'Online safety', 9, 'video'),
          lesson('Challenge: spot the phishing email', 'Online safety', 15, 'challenge'),
        ],
        quiz: {
          title: 'Online safety',
          passScore: 70,
          questions: [
            {
              prompt: 'Which password is strongest?',
              options: ['password123', 'Your birthday', 'A long random phrase', 'Your pet name'],
              correctIndex: 2,
              explanation: 'Length beats cleverness. A long phrase is hard to guess and easy to remember.',
            },
            {
              prompt: 'An email says your account will close in 1 hour unless you click. What is it?',
              options: ['Normal', 'Probably a scam using urgency', 'A system update', 'A newsletter'],
              correctIndex: 1,
              explanation: 'Rushing you is the oldest trick in phishing.',
            },
          ],
        },
      },
      {
        title: 'Level 2 — How the internet works',
        summary: 'Networks, addresses and where the weak points are.',
        order: 2,
        lessons: [
          lesson('What happens when you open a website', 'Networking', 11, 'video'),
          lesson('IP addresses and DNS', 'Networking', 11, 'video'),
          lesson('Why HTTPS matters', 'Networking', 10, 'video'),
          lesson('Wi-Fi and why public networks are risky', 'Threats', 10, 'video'),
        ],
        quiz: {
          title: 'Networking',
          passScore: 70,
          questions: [
            {
              prompt: 'What does the S in HTTPS add?',
              options: ['Speed', 'Encryption', 'Storage', 'Sound'],
              correctIndex: 1,
              explanation: 'It encrypts the traffic so people in between cannot read it.',
            },
          ],
        },
      },
      {
        title: 'Level 3 — Defending',
        summary: 'Think like an attacker so you can defend better.',
        order: 3,
        lessons: [
          lesson('Common attacks, explained simply', 'Threats', 12, 'video'),
          lesson('Two-factor authentication', 'Defence', 9, 'video'),
          lesson('Keeping software updated, and why', 'Defence', 9, 'video'),
          lesson('Challenge: secure a pretend account', 'Defence', 20, 'challenge'),
        ],
        project: {
          title: 'Family security checkup',
          brief:
            'Run a safety check on your family devices and write a one-page report on what you fixed.',
        },
      },
    ],
  },
];


export default courses;
