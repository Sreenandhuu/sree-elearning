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
  // {
  //   title: 'Chess',
  //   slug: 'chess',
  //   track: 'chess',
  //   emoji: '♟',
  //   tagline: 'Think three moves ahead.',
  //   description:
  //     'Short puzzles and two live games a week. This is where the thinking habits for everything else get built.',
  //   ageMin: 8,
  //   ageMax: 16,
  //   priceCents: 349000,
  //   durationWeeks: 12,
  //   classesPerWeek: 2,
  //   skills: [
  //     { name: 'Openings', order: 1 },
  //     { name: 'Tactics', order: 2 },
  //     { name: 'Endgames', order: 3 },
  //     { name: 'Strategy', order: 4 },
  //   ],
  //   levels: [
  //     {
  //       title: 'Level 1 — Board sense',
  //       summary: 'Getting comfortable with how the pieces really work.',
  //       order: 1,
  //       lessons: [
  //         lesson(
  //   'How each piece moves',
  //   'Openings',
  //   8,
  //   'video',
  //   '',
  //   'OCSbzArwB10'
  // ),
  //         lesson('Controlling the centre', 'Openings', 9, 'video'),
  //         lesson('Castling early', 'Openings', 7, 'video'),
  //         lesson('Puzzle set: 10 opening positions', 'Openings', 15, 'challenge'),
  //       ],
  //       quiz: {
  //         title: 'Opening principles',
  //         passScore: 70,
  //         questions: [
  //           {
  //             prompt: 'In the opening, what should you usually do first?',
  //             options: [
  //               'Move the queen out early',
  //               'Control the centre and develop pieces',
  //               'Push all your pawns',
  //               'Trade everything',
  //             ],
  //             correctIndex: 1,
  //             explanation: 'Centre control and development beat early queen raids.',
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       title: 'Level 2 — Tactics',
  //       summary: 'Forks, pins and skewers — spotting the winning move.',
  //       order: 2,
  //       lessons: [
  //         lesson('The fork', 'Tactics', 8, 'video'),
  //         lesson('Pins and skewers', 'Tactics', 9, 'video'),
  //         lesson('Discovered attacks', 'Tactics', 9, 'video'),
  //         lesson('Puzzle set: 20 tactics', 'Tactics', 20, 'challenge'),
  //       ],
  //       quiz: {
  //         title: 'Tactics',
  //         passScore: 70,
  //         questions: [
  //           {
  //             prompt: 'A fork is when one piece...',
  //             options: [
  //               'Attacks two pieces at once',
  //               'Blocks a check',
  //               'Promotes to a queen',
  //               'Moves backwards',
  //             ],
  //             correctIndex: 0,
  //             explanation: 'One attacker, two targets. Your opponent can only save one.',
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       title: 'Level 3 — Finishing games',
  //       summary: 'Endgames and a rated tournament.',
  //       order: 3,
  //       lessons: [
  //         lesson('King and pawn endings', 'Endgames', 11, 'video'),
  //         lesson('Rook endings', 'Endgames', 12, 'video'),
  //         lesson('Making a plan', 'Strategy', 12, 'video'),
  //         lesson('Reviewing your own games', 'Strategy', 10, 'video'),
  //       ],
  //       project: {
  //         title: 'Play a rated tournament',
  //         brief: 'Five games. Then write two sentences about each loss — what you would do differently.',
  //       },
  //     },
  //   ],
  // },

  
{
  title: 'Chess',
  slug: 'chess',
  track: 'chess',
  emoji: '♟',
  tagline: 'Learn to see. Learn to calculate. Learn to win.',
  description:
    'A complete 18-module chess journey covering the board, piece movement, tactics, openings, calculation, strategy, middlegames, endgames, game analysis and tournament play.',
  ageMin: 8,
  ageMax: 16,
  priceCents: 349000,
  durationWeeks: 18,
  classesPerWeek: 2,

  skills: [
    { name: 'Board Vision', order: 1 },
    { name: 'Tactics', order: 2 },
    { name: 'Openings', order: 3 },
    { name: 'Calculation', order: 4 },
    { name: 'Strategy', order: 5 },
    { name: 'Endgames', order: 6 },
    { name: 'Game Analysis', order: 7 },
    { name: 'Tournament Skills', order: 8 },
  ],

  levels: [

    // ============================================================
    // MODULE 1
    // ============================================================

    {
      title: 'Module 1 — Meet the Chessboard',
      summary:
        'Understand the chessboard, coordinates, setup and the basic rules of the game.',
      order: 1,

      lessons: [
        lesson(
          'The Chessboard: Files, Ranks and Squares',
          'Board Vision',
          10,
          'video'
        ),

        lesson(
          'How to Set Up the Chessboard',
          'Board Vision',
          8,
          'video'
        ),

        lesson(
          'White, Black and Who Moves First?',
          'Board Vision',
          6,
          'video'
        ),

        lesson(
          'Chess Notation: Reading the Board',
          'Board Vision',
          10,
          'video'
        ),

        lesson(
          'Challenge: Find the Square',
          'Board Vision',
          15,
          'challenge'
        ),
      ],

      quiz: {
        title: 'Chessboard Basics',
        passScore: 70,

        questions: [
          {
            prompt: 'How many squares are on a chessboard?',
            options: [
              '32',
              '48',
              '64',
              '81',
            ],
            correctIndex: 2,
            explanation:
              'A chessboard contains 8 files × 8 ranks = 64 squares.',
          },

          {
            prompt: 'Which player moves first?',
            options: [
              'Black',
              'White',
              'The player with the queen',
              'The younger player',
            ],
            correctIndex: 1,
            explanation:
              'White always makes the first move.',
          },
        ],
      },
    },


    // ============================================================
    // MODULE 2
    // ============================================================

    {
      title: 'Module 2 — Master the Pieces',
      summary:
        'Learn exactly how every chess piece moves, captures and interacts with the board.',
      order: 2,

      lessons: [
        lesson(
          'The King',
          'Board Vision',
          8,
          'video'
        ),

        lesson(
          'The Queen',
          'Board Vision',
          8,
          'video'
        ),

        lesson(
          'The Rook',
          'Board Vision',
          7,
          'video'
        ),

        lesson(
          'The Bishop',
          'Board Vision',
          7,
          'video'
        ),

        lesson(
          'The Knight',
          'Board Vision',
          9,
          'video'
        ),

        lesson(
          'The Pawn',
          'Board Vision',
          9,
          'video'
        ),

        lesson(
          '3D Piece Explorer',
          'Board Vision',
          10,
          'interactive'
        ),

        lesson(
          'Challenge: Move the Correct Piece',
          'Board Vision',
          15,
          'challenge'
        ),
      ],

      quiz: {
        title: 'Piece Movement',
        passScore: 75,

        questions: [
          {
            prompt: 'Which chess piece can jump over other pieces?',
            options: [
              'Bishop',
              'Rook',
              'Knight',
              'Queen',
            ],
            correctIndex: 2,
            explanation:
              'The knight is the only piece that can jump over other pieces.',
          },
        ],
      },
    },


    // ============================================================
    // MODULE 3
    // ============================================================

    {
      title: 'Module 3 — Special Moves & Winning the Game',
      summary:
        'Learn check, checkmate, stalemate, castling, promotion and en passant.',
      order: 3,

      lessons: [
        lesson(
          'Check',
          'Board Vision',
          8,
          'video'
        ),

        lesson(
          'Checkmate',
          'Board Vision',
          10,
          'video'
        ),

        lesson(
          'Stalemate',
          'Board Vision',
          8,
          'video'
        ),

        lesson(
          'Castling',
          'Openings',
          9,
          'video'
        ),

        lesson(
          'Pawn Promotion',
          'Endgames',
          8,
          'video'
        ),

        lesson(
          'En Passant',
          'Board Vision',
          8,
          'video'
        ),

        lesson(
          'Challenge: Checkmate in One',
          'Tactics',
          20,
          'challenge'
        ),
      ],

      quiz: {
        title: 'Rules & Special Moves',
        passScore: 75,

        questions: [
          {
            prompt: 'What is the goal of chess?',
            options: [
              'Capture every piece',
              'Capture the king',
              'Checkmate the king',
              'Get more pieces',
            ],
            correctIndex: 2,
            explanation:
              'The objective is to checkmate the opponent king.',
          },
        ],
      },
    },


    // ============================================================
    // MODULE 4
    // ============================================================

    {
      title: 'Module 4 — Piece Values & Smart Captures',
      summary:
        'Understand material, exchanges and when a capture is actually good.',
      order: 4,

      lessons: [
        lesson('Understanding Piece Values', 'Strategy', 8, 'video'),
        lesson('Good Captures vs Bad Captures', 'Strategy', 10, 'video'),
        lesson('Winning Material', 'Tactics', 10, 'video'),
        lesson('The Queen Trap', 'Tactics', 9, 'video'),
        lesson('Trading Pieces', 'Strategy', 10, 'video'),
        lesson('Challenge: Find the Best Capture', 'Tactics', 20, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 5
    // ============================================================

    {
      title: 'Module 5 — Opening Principles',
      summary:
        'Learn how strong players begin games: control the centre, develop pieces and protect the king.',
      order: 5,

      lessons: [
        lesson('Control the Centre', 'Openings', 9, 'video'),
        lesson('Develop Your Pieces', 'Openings', 9, 'video'),
        lesson('Do Not Move the Same Piece Again and Again', 'Openings', 8, 'video'),
        lesson('Castle Your King', 'Openings', 8, 'video'),
        lesson('Avoid Early Queen Attacks', 'Openings', 8, 'video'),
        lesson('The First 10 Moves', 'Openings', 12, 'video'),
        lesson('Challenge: Build a Strong Opening', 'Openings', 20, 'challenge'),
      ],

      quiz: {
        title: 'Opening Principles',
        passScore: 75,

        questions: [
          {
            prompt: 'What should you normally prioritize in the opening?',
            options: [
              'Move the queen repeatedly',
              'Control the centre and develop pieces',
              'Move every pawn',
              'Attack immediately without development',
            ],
            correctIndex: 1,
            explanation:
              'Central control, development and king safety form the foundation of a strong opening.',
          },
        ],
      },
    },


    // ============================================================
    // MODULE 6
    // ============================================================

    {
      title: 'Module 6 — Tactical Vision',
      summary:
        'Train your eyes to recognize immediate tactical opportunities.',
      order: 6,

      lessons: [
        lesson('Checks, Captures and Threats', 'Tactics', 10, 'video'),
        lesson('The Fork', 'Tactics', 9, 'video'),
        lesson('The Pin', 'Tactics', 9, 'video'),
        lesson('The Skewer', 'Tactics', 9, 'video'),
        lesson('The Discovered Attack', 'Tactics', 10, 'video'),
        lesson('Double Attack', 'Tactics', 9, 'video'),
        lesson('Puzzle Arena: 20 Tactical Positions', 'Tactics', 25, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 7
    // ============================================================

    {
      title: 'Module 7 — Advanced Tactics',
      summary:
        'Combine tactical ideas and start seeing combinations before they happen.',
      order: 7,

      lessons: [
        lesson('Removing the Defender', 'Tactics', 10, 'video'),
        lesson('Deflection', 'Tactics', 10, 'video'),
        lesson('Decoy', 'Tactics', 9, 'video'),
        lesson('Discovered Check', 'Tactics', 9, 'video'),
        lesson('Zwischenzug', 'Tactics', 10, 'video'),
        lesson('Back Rank Tactics', 'Tactics', 10, 'video'),
        lesson('Puzzle Arena: Tactical Combinations', 'Tactics', 25, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 8
    // ============================================================

    {
      title: 'Module 8 — Checkmate Patterns',
      summary:
        'Learn the patterns that repeatedly appear when attacking the king.',
      order: 8,

      lessons: [
        lesson('Back Rank Mate', 'Tactics', 8, 'video'),
        lesson('Smothered Mate', 'Tactics', 10, 'video'),
        lesson('Arabian Mate', 'Tactics', 9, 'video'),
        lesson('Ladder Mate', 'Tactics', 8, 'video'),
        lesson('Queen and King Checkmate', 'Endgames', 10, 'video'),
        lesson('Two-Rook Checkmate', 'Tactics', 8, 'video'),
        lesson('Mate in 1, 2 and 3 Challenge', 'Tactics', 25, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 9
    // ============================================================

    {
      title: 'Module 9 — Opening Repertoire',
      summary:
        'Build a practical opening system for both White and Black.',
      order: 9,

      lessons: [
        lesson('Choosing an Opening', 'Openings', 8, 'video'),
        lesson('Italian Game', 'Openings', 12, 'video'),
        lesson('Queen’s Gambit Ideas', 'Openings', 12, 'video'),
        lesson('Sicilian Defense Ideas', 'Openings', 12, 'video'),
        lesson('French Defense Ideas', 'Openings', 10, 'video'),
        lesson('Playing Against Early Queen Attacks', 'Openings', 10, 'video'),
        lesson('Opening Repertoire Challenge', 'Openings', 25, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 10
    // ============================================================

    {
      title: 'Module 10 — Calculation',
      summary:
        'Learn how to calculate variations instead of guessing moves.',
      order: 10,

      lessons: [
        lesson('Think Before You Move', 'Calculation', 8, 'video'),
        lesson('Candidate Moves', 'Calculation', 10, 'video'),
        lesson('Forcing Moves', 'Calculation', 10, 'video'),
        lesson('Calculate 2 Moves Ahead', 'Calculation', 10, 'video'),
        lesson('Calculate 3 Moves Ahead', 'Calculation', 12, 'video'),
        lesson('Visualization Without Moving Pieces', 'Calculation', 12, 'video'),
        lesson('Calculation Challenge', 'Calculation', 30, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 11
    // ============================================================

    {
      title: 'Module 11 — Defending & Avoiding Blunders',
      summary:
        'Learn how to identify threats, defend accurately and reduce simple mistakes.',
      order: 11,

      lessons: [
        lesson('What Is My Opponent Threatening?', 'Strategy', 10, 'video'),
        lesson('Hanging Pieces', 'Tactics', 9, 'video'),
        lesson('Defending a Piece', 'Strategy', 9, 'video'),
        lesson('Counterattack', 'Strategy', 10, 'video'),
        lesson('The Blunder Check', 'Calculation', 10, 'video'),
        lesson('Defensive Puzzle Challenge', 'Strategy', 25, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 12
    // ============================================================

    {
      title: 'Module 12 — Middlegame Strategy',
      summary:
        'Move beyond tactics and learn how to create long-term plans.',
      order: 12,

      lessons: [
        lesson('What Is a Chess Plan?', 'Strategy', 10, 'video'),
        lesson('Open Files and Semi-Open Files', 'Strategy', 10, 'video'),
        lesson('Weak Squares', 'Strategy', 10, 'video'),
        lesson('Outposts', 'Strategy', 9, 'video'),
        lesson('Good Bishop vs Bad Bishop', 'Strategy', 10, 'video'),
        lesson('Knight vs Bishop', 'Strategy', 10, 'video'),
        lesson('Build Your Own Plan Challenge', 'Strategy', 25, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 13
    // ============================================================

    {
      title: 'Module 13 — Pawn Structures',
      summary:
        'Understand how pawns shape the entire position.',
      order: 13,

      lessons: [
        lesson('Pawn Chains', 'Strategy', 9, 'video'),
        lesson('Isolated Pawns', 'Strategy', 9, 'video'),
        lesson('Doubled Pawns', 'Strategy', 9, 'video'),
        lesson('Passed Pawns', 'Endgames', 10, 'video'),
        lesson('Backward Pawns', 'Strategy', 9, 'video'),
        lesson('Pawn Breaks', 'Strategy', 11, 'video'),
        lesson('Pawn Structure Challenge', 'Strategy', 25, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 14
    // ============================================================

    {
      title: 'Module 14 — King Attacks',
      summary:
        'Learn how attacks are built and how to coordinate pieces against the king.',
      order: 14,

      lessons: [
        lesson('Building an Attack', 'Strategy', 10, 'video'),
        lesson('Open Lines Toward the King', 'Strategy', 10, 'video'),
        lesson('Attacking Castled Kings', 'Tactics', 11, 'video'),
        lesson('Sacrificing for the Attack', 'Tactics', 12, 'video'),
        lesson('When Not to Attack', 'Strategy', 9, 'video'),
        lesson('King Attack Challenge', 'Tactics', 30, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 15
    // ============================================================

    {
      title: 'Module 15 — Endgame Foundations',
      summary:
        'Learn the fundamental endings every serious chess player should know.',
      order: 15,

      lessons: [
        lesson('King and Pawn vs King', 'Endgames', 12, 'video'),
        lesson('The Opposition', 'Endgames', 12, 'video'),
        lesson('Key Squares', 'Endgames', 10, 'video'),
        lesson('The Rule of the Square', 'Endgames', 10, 'video'),
        lesson('Pawn Promotion', 'Endgames', 9, 'video'),
        lesson('Queen vs King Checkmate', 'Endgames', 10, 'video'),
        lesson('Endgame Challenge', 'Endgames', 30, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 16
    // ============================================================

    {
      title: 'Module 16 — Rook & Minor-Piece Endgames',
      summary:
        'Master practical rook and minor-piece endings.',
      order: 16,

      lessons: [
        lesson('Rook Behind the Passed Pawn', 'Endgames', 10, 'video'),
        lesson('Rook vs Pawn', 'Endgames', 10, 'video'),
        lesson('Basic Rook Endings', 'Endgames', 12, 'video'),
        lesson('Bishop Endgames', 'Endgames', 11, 'video'),
        lesson('Knight Endgames', 'Endgames', 11, 'video'),
        lesson('King Activity', 'Endgames', 9, 'video'),
        lesson('Endgame Master Challenge', 'Endgames', 30, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 17
    // ============================================================

    {
      title: 'Module 17 — Analyze Like a Chess Player',
      summary:
        'Learn how to review your games, identify mistakes and improve systematically.',
      order: 17,

      lessons: [
        lesson('How to Record a Game', 'Game Analysis', 8, 'video'),
        lesson('Find Your Critical Moment', 'Game Analysis', 10, 'video'),
        lesson('Blunder, Mistake or Inaccuracy?', 'Game Analysis', 10, 'video'),
        lesson('Analyze Before Using an Engine', 'Game Analysis', 12, 'video'),
        lesson('Learn From Your Losses', 'Game Analysis', 10, 'video'),
        lesson('Create Your Improvement Plan', 'Game Analysis', 10, 'video'),
        lesson('Analyze Your Own Game', 'Game Analysis', 30, 'challenge'),
      ],
    },


    // ============================================================
    // MODULE 18
    // ============================================================

    {
      title: 'Module 18 — Tournament & Chess Mastery',
      summary:
        'Put everything together in practical games, challenges and a final tournament.',
      order: 18,

      lessons: [
        lesson('Tournament Preparation', 'Tournament Skills', 10, 'video'),
        lesson('Time Management', 'Tournament Skills', 10, 'video'),
        lesson('Chess Psychology & Focus', 'Tournament Skills', 10, 'video'),
        lesson('Playing Under Pressure', 'Tournament Skills', 10, 'video'),
        lesson('How to Prepare Before a Game', 'Tournament Skills', 10, 'video'),
        lesson('Final Tactical Challenge', 'Tactics', 30, 'challenge'),
        lesson('Final Endgame Challenge', 'Endgames', 30, 'challenge'),
      ],

      project: {
        title: 'Sree Learn Chess Championship',
        brief:
          'Play a complete tournament, analyze your games, solve the final tactical and endgame challenges, and create a personal chess improvement plan.',
      },

      quiz: {
        title: 'Final Chess Assessment',
        passScore: 80,

        questions: [
          {
            prompt:
              'Before making a move in a serious game, what should you check?',
            options: [
              'Only my attacking idea',
              'Only the opponent king',
              'Checks, captures, threats and the opponent’s response',
              'How quickly I can move',
            ],
            correctIndex: 2,
            explanation:
              'Strong players consider forcing moves, threats and the opponent’s possible responses before committing to a move.',
          },

          {
            prompt:
              'What is one of the most important goals of analyzing your own games?',
            options: [
              'Find someone to blame',
              'Understand recurring mistakes and improve',
              'Memorize every move',
              'Avoid playing again',
            ],
            correctIndex: 1,
            explanation:
              'Game analysis turns mistakes into learning opportunities and helps identify patterns in your play.',
          },
        ],
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
