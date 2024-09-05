const players = [
  {
    overallRank: 1,
    name: "Christian McCaffrey",
    position: "RB",
    positionRank: "RB1",
  },
  {
    overallRank: 2,
    name: "Bijan Robinson",
    position: "RB",
    positionRank: "RB2",
  },
  {
    overallRank: 3,
    name: "Breece Hall",
    position: "RB",
    positionRank: "RB3",
  },
  {
    overallRank: 4,
    name: "Tyreek Hill",
    position: "WR",
    positionRank: "WR1",
  },
  {
    overallRank: 5,
    name: "CeeDee Lamb",
    position: "WR",
    positionRank: "WR2",
  },
  {
    overallRank: 6,
    name: "Ja'Marr Chase",
    position: "WR",
    positionRank: "WR3",
  },
  {
    overallRank: 7,
    name: "Justin Jefferson",
    position: "WR",
    positionRank: "WR4",
  },
  {
    overallRank: 8,
    name: "Saquon Barkley",
    position: "RB",
    positionRank: "RB4",
  },
  {
    overallRank: 9,
    name: "A.J. Brown",
    position: "WR",
    positionRank: "WR5",
  },
  {
    overallRank: 10,
    name: "Amon-Ra St. Brown",
    position: "WR",
    positionRank: "WR6",
  },
  {
    overallRank: 11,
    name: "Jonathan Taylor",
    position: "RB",
    positionRank: "RB5",
  },
  {
    overallRank: 12,
    name: "Puka Nacua",
    position: "WR",
    positionRank: "WR7",
  },
  {
    overallRank: 13,
    name: "Davante Adams",
    position: "WR",
    positionRank: "WR8",
  },
  {
    overallRank: 14,
    name: "Josh Jacobs",
    position: "RB",
    positionRank: "RB6",
  },
  {
    overallRank: 15,
    name: "Travis Etienne",
    position: "RB",
    positionRank: "RB7",
  },
  {
    overallRank: 16,
    name: "Jahmyr Gibbs",
    position: "RB",
    positionRank: "RB8",
  },
  {
    overallRank: 17,
    name: "Joe Mixon",
    position: "RB",
    positionRank: "RB9",
  },
  {
    overallRank: 18,
    name: "Stefon Diggs",
    position: "WR",
    positionRank: "WR9",
  },
  {
    overallRank: 19,
    name: "Brandon Aiyuk",
    position: "WR",
    positionRank: "WR10",
  },
  {
    overallRank: 20,
    name: "D.J. Moore",
    position: "WR",
    positionRank: "WR11",
  },
  {
    overallRank: 21,
    name: "Nico Collins",
    position: "WR",
    positionRank: "WR12",
  },
  {
    overallRank: 22,
    name: "Kyren Williams",
    position: "RB",
    positionRank: "RB10",
  },
  {
    overallRank: 23,
    name: "Alvin Kamara",
    position: "RB",
    positionRank: "RB11",
  },
  {
    overallRank: 24,
    name: "Derrick Henry",
    position: "RB",
    positionRank: "RB12",
  },
  {
    overallRank: 25,
    name: "Rachaad White",
    position: "RB",
    positionRank: "RB13",
  },
  {
    overallRank: 26,
    name: "Michael Pittman",
    position: "WR",
    positionRank: "WR13",
  },
  {
    overallRank: 27,
    name: "Deebo Samuel",
    position: "WR",
    positionRank: "WR14",
  },
  {
    overallRank: 28,
    name: "Garrett Wilson",
    position: "WR",
    positionRank: "WR15",
  },
  {
    overallRank: 29,
    name: "Chris Olave",
    position: "WR",
    positionRank: "WR16",
  },
  {
    overallRank: 30,
    name: "Mike Evans",
    position: "WR",
    positionRank: "WR17",
  },
  {
    overallRank: 31,
    name: "Keenan Allen",
    position: "WR",
    positionRank: "WR18",
  },
  {
    overallRank: 32,
    name: "Cooper Kupp",
    position: "WR",
    positionRank: "WR19",
  },
  {
    overallRank: 33,
    name: "Isiah Pacheco",
    position: "RB",
    positionRank: "RB14",
  },
  {
    overallRank: 34,
    name: "De'Von Achane",
    position: "RB",
    positionRank: "RB15",
  },
  {
    overallRank: 35,
    name: "James Cook",
    position: "RB",
    positionRank: "RB16",
  },
  {
    overallRank: 36,
    name: "Aaron Jones",
    position: "RB",
    positionRank: "RB17",
  },
  {
    overallRank: 37,
    name: "Drake London",
    position: "WR",
    positionRank: "WR20",
  },
  {
    overallRank: 38,
    name: "DK Metcalf",
    position: "WR",
    positionRank: "WR21",
  },
  {
    overallRank: 39,
    name: "DeVonta Smith",
    position: "WR",
    positionRank: "WR22",
  },
  {
    overallRank: 40,
    name: "Travis Kelce",
    position: "TE",
    positionRank: "TE1",
  },
  {
    overallRank: 41,
    name: "Mark Andrews",
    position: "TE",
    positionRank: "TE2",
  },
  {
    overallRank: 42,
    name: "Sam LaPorta",
    position: "TE",
    positionRank: "TE3",
  },
  {
    overallRank: 43,
    name: "Josh Allen",
    position: "QB",
    positionRank: "QB1",
  },
  {
    overallRank: 44,
    name: "Ken Walker",
    position: "RB",
    positionRank: "RB18",
  },
  {
    overallRank: 45,
    name: "Christian Kirk",
    position: "WR",
    positionRank: "WR23",
  },
  {
    overallRank: 46,
    name: "Jaylen Waddle",
    position: "WR",
    positionRank: "WR24",
  },
  {
    overallRank: 47,
    name: "Marvin Harrison",
    position: "WR",
    positionRank: "WR25",
  },
  {
    overallRank: 48,
    name: "Zay Flowers",
    position: "WR",
    positionRank: "WR26",
  },
  {
    overallRank: 49,
    name: "Terry McLaurin",
    position: "WR",
    positionRank: "WR27",
  },
  {
    overallRank: 50,
    name: "George Kittle",
    position: "TE",
    positionRank: "TE4",
  },
  {
    overallRank: 51,
    name: "Trey McBride",
    position: "TE",
    positionRank: "TE5",
  },
  {
    overallRank: 52,
    name: "Lamar Jackson",
    position: "QB",
    positionRank: "QB2",
  },
  {
    overallRank: 53,
    name: "James Conner",
    position: "RB",
    positionRank: "RB19",
  },
  {
    overallRank: 54,
    name: "Tee Higgins",
    position: "WR",
    positionRank: "WR28",
  },
  {
    overallRank: 55,
    name: "Chris Godwin",
    position: "WR",
    positionRank: "WR29",
  },
  {
    overallRank: 56,
    name: "Calvin Ridley",
    position: "WR",
    positionRank: "WR30",
  },
  {
    overallRank: 57,
    name: "Amari Cooper",
    position: "WR",
    positionRank: "WR31",
  },
  {
    overallRank: 58,
    name: "Raheem Mostert",
    position: "RB",
    positionRank: "RB20",
  },
  {
    overallRank: 59,
    name: "Tank Dell",
    position: "WR",
    positionRank: "WR32",
  },
  {
    overallRank: 60,
    name: "Rashee Rice",
    position: "WR",
    positionRank: "WR33",
  },
  {
    overallRank: 61,
    name: "George Pickens",
    position: "WR",
    positionRank: "WR34",
  },
  {
    overallRank: 62,
    name: "Diontae Johnson",
    position: "WR",
    positionRank: "WR35",
  },
  {
    overallRank: 63,
    name: "Patrick Mahomes",
    position: "QB",
    positionRank: "QB3",
  },
  {
    overallRank: 64,
    name: "Joe Burrow",
    position: "QB",
    positionRank: "QB4",
  },
  {
    overallRank: 65,
    name: "C.J. Stroud",
    position: "QB",
    positionRank: "QB5",
  },
  {
    overallRank: 66,
    name: "Jalen Hurts",
    position: "QB",
    positionRank: "QB6",
  },
  {
    overallRank: 67,
    name: "Dalton Kincaid",
    position: "TE",
    positionRank: "TE6",
  },
  {
    overallRank: 68,
    name: "Tyjae Spears",
    position: "RB",
    positionRank: "RB21",
  },
  {
    overallRank: 69,
    name: "Austin Ekeler",
    position: "RB",
    positionRank: "RB22",
  },
  {
    overallRank: 70,
    name: "D'Andre Swift",
    position: "RB",
    positionRank: "RB23",
  },
  {
    overallRank: 71,
    name: "Rhamondre Stevenson",
    position: "RB",
    positionRank: "RB24",
  },
  {
    overallRank: 72,
    name: "Tony Pollard",
    position: "RB",
    positionRank: "RB25",
  },
  {
    overallRank: 73,
    name: "Javonte Williams",
    position: "RB",
    positionRank: "RB26",
  },
  {
    overallRank: 74,
    name: "David Montgomery",
    position: "RB",
    positionRank: "RB27",
  },
  {
    overallRank: 75,
    name: "Najee Harris",
    position: "RB",
    positionRank: "RB28",
  },
  {
    overallRank: 76,
    name: "Kyle Pitts",
    position: "TE",
    positionRank: "TE7",
  },
  {
    overallRank: 77,
    name: "Jakobi Meyers",
    position: "WR",
    positionRank: "WR36",
  },
  {
    overallRank: 78,
    name: "Courtland Sutton",
    position: "WR",
    positionRank: "WR37",
  },
  {
    overallRank: 79,
    name: "Chase Brown",
    position: "RB",
    positionRank: "RB29",
  },
  {
    overallRank: 80,
    name: "Zach Charbonnet",
    position: "RB",
    positionRank: "RB30",
  },
  {
    overallRank: 81,
    name: "Jayden Reed",
    position: "WR",
    positionRank: "WR38",
  },
  {
    overallRank: 82,
    name: "Jordan Addison",
    position: "WR",
    positionRank: "WR39",
  },
  {
    overallRank: 83,
    name: "Jaxon Smith-Njigba",
    position: "WR",
    positionRank: "WR40",
  },
  {
    overallRank: 84,
    name: "Brian Robinson",
    position: "RB",
    positionRank: "RB31",
  },
  {
    overallRank: 85,
    name: "Malik Nabers",
    position: "WR",
    positionRank: "WR41",
  },
  {
    overallRank: 86,
    name: "Xavier Worthy",
    position: "WR",
    positionRank: "WR42",
  },
  {
    overallRank: 87,
    name: "Marquise Brown",
    position: "WR",
    positionRank: "WR43",
  },
  {
    overallRank: 88,
    name: "Jake Ferguson",
    position: "TE",
    positionRank: "TE8",
  },
  {
    overallRank: 89,
    name: "Evan Engram",
    position: "TE",
    positionRank: "TE9",
  },
  {
    overallRank: 90,
    name: "Jaylen Warren",
    position: "RB",
    positionRank: "RB32",
  },
  {
    overallRank: 91,
    name: "Dak Prescott",
    position: "QB",
    positionRank: "QB7",
  },
  {
    overallRank: 92,
    name: "Jordan Love",
    position: "QB",
    positionRank: "QB8",
  },
  {
    overallRank: 93,
    name: "Devin Singletary",
    position: "RB",
    positionRank: "RB33",
  },
  {
    overallRank: 94,
    name: "Chuba Hubbard",
    position: "RB",
    positionRank: "RB34",
  },
  {
    overallRank: 95,
    name: "Zack Moss",
    position: "RB",
    positionRank: "RB35",
  },
  {
    overallRank: 96,
    name: "Zeke Elliott",
    position: "RB",
    positionRank: "RB36",
  },
  {
    overallRank: 97,
    name: "DeAndre Hopkins",
    position: "WR",
    positionRank: "WR44",
  },
  {
    overallRank: 98,
    name: "Jerry Jeudy",
    position: "WR",
    positionRank: "WR45",
  },
  {
    overallRank: 99,
    name: "Tyler Lockett",
    position: "WR",
    positionRank: "WR46",
  },
  {
    overallRank: 100,
    name: "Christian Watson",
    position: "WR",
    positionRank: "WR47",
  },
  {
    overallRank: 101,
    name: "Rome Odunze",
    position: "WR",
    positionRank: "WR48",
  },
  {
    overallRank: 102,
    name: "Dallas Goedert",
    position: "TE",
    positionRank: "TE10",
  },
  {
    overallRank: 103,
    name: "Brock Bowers",
    position: "TE",
    positionRank: "TE11",
  },
  {
    overallRank: 104,
    name: "Adam Thielen",
    position: "WR",
    positionRank: "WR49",
  },
  {
    overallRank: 105,
    name: "Romeo Doubs",
    position: "WR",
    positionRank: "WR50",
  },
  {
    overallRank: 106,
    name: "Khalil Shakir",
    position: "WR",
    positionRank: "WR51",
  },
  {
    overallRank: 107,
    name: "Keon Coleman",
    position: "WR",
    positionRank: "WR52",
  },
  {
    overallRank: 108,
    name: "Brandin Cooks",
    position: "WR",
    positionRank: "WR53",
  },
  {
    overallRank: 109,
    name: "Josh Palmer",
    position: "WR",
    positionRank: "WR54",
  },
  {
    overallRank: 110,
    name: "Brock Purdy",
    position: "QB",
    positionRank: "QB9",
  },
  {
    overallRank: 111,
    name: "Tua Tagovailoa",
    position: "QB",
    positionRank: "QB10",
  },
  {
    overallRank: 112,
    name: "Anthony Richardson",
    position: "QB",
    positionRank: "QB11",
  },
  {
    overallRank: 113,
    name: "Kyler Murray",
    position: "QB",
    positionRank: "QB12",
  },
  {
    overallRank: 114,
    name: "Zamir White",
    position: "RB",
    positionRank: "RB37",
  },
  {
    overallRank: 115,
    name: "Khalil Herbert",
    position: "RB",
    positionRank: "RB38",
  },
  {
    overallRank: 116,
    name: "T.J. Hockenson",
    position: "TE",
    positionRank: "TE12",
  },
  {
    overallRank: 117,
    name: "Nick Chubb",
    position: "RB",
    positionRank: "RB39",
  },
  {
    overallRank: 118,
    name: "Jerome Ford",
    position: "RB",
    positionRank: "RB40",
  },
  {
    overallRank: 119,
    name: "Gus Edwards",
    position: "RB",
    positionRank: "RB41",
  },
  {
    overallRank: 120,
    name: "J.K. Dobbins",
    position: "RB",
    positionRank: "RB42",
  },
  {
    overallRank: 121,
    name: "Brian Thomas",
    position: "WR",
    positionRank: "WR55",
  },
  {
    overallRank: 122,
    name: "Mike Williams",
    position: "WR",
    positionRank: "WR56",
  },
  {
    overallRank: 123,
    name: "Ladd McConkey",
    position: "WR",
    positionRank: "WR57",
  },
  {
    overallRank: 124,
    name: "Tyler Allgeier",
    position: "RB",
    positionRank: "RB43",
  },
  {
    overallRank: 125,
    name: "Antonio Gibson",
    position: "RB",
    positionRank: "RB44",
  },
  {
    overallRank: 126,
    name: "Ty Chandler",
    position: "RB",
    positionRank: "RB45",
  },
  {
    overallRank: 127,
    name: "Trey Benson",
    position: "RB",
    positionRank: "RB46",
  },
  {
    overallRank: 128,
    name: "Blake Corum",
    position: "RB",
    positionRank: "RB47",
  },
  {
    overallRank: 129,
    name: "Jonathon Brooks",
    position: "RB",
    positionRank: "RB48",
  },
  {
    overallRank: 130,
    name: "Jameson Williams",
    position: "WR",
    positionRank: "WR58",
  },
  {
    overallRank: 131,
    name: "Gabe Davis",
    position: "WR",
    positionRank: "WR59",
  },
  {
    overallRank: 132,
    name: "Adonai Mitchell",
    position: "WR",
    positionRank: "WR60",
  },
  {
    overallRank: 133,
    name: "Luke Musgrave",
    position: "TE",
    positionRank: "TE13",
  },
  {
    overallRank: 134,
    name: "Cole Kmet",
    position: "TE",
    positionRank: "TE14",
  },
  {
    overallRank: 135,
    name: "David Njoku",
    position: "TE",
    positionRank: "TE15",
  },
  {
    overallRank: 136,
    name: "Dalton Schultz",
    position: "TE",
    positionRank: "TE16",
  },
  {
    overallRank: 137,
    name: "Curtis Samuel",
    position: "WR",
    positionRank: "WR61",
  },
  {
    overallRank: 138,
    name: "Demario Douglas",
    position: "WR",
    positionRank: "WR62",
  },
  {
    overallRank: 139,
    name: "Dontayvion Wicks",
    position: "WR",
    positionRank: "WR63",
  },
  {
    overallRank: 140,
    name: "Rashid Shaheed",
    position: "WR",
    positionRank: "WR64",
  },
  {
    overallRank: 141,
    name: "Rico Dowdle",
    position: "RB",
    positionRank: "RB49",
  },
  {
    overallRank: 142,
    name: "Michael Wilson",
    position: "WR",
    positionRank: "WR65",
  },
  {
    overallRank: 143,
    name: "Ricky Pearsall",
    position: "WR",
    positionRank: "WR66",
  },
  {
    overallRank: 144,
    name: "Jaylen Wright",
    position: "RB",
    positionRank: "RB50",
  },
  {
    overallRank: 145,
    name: "Roschon Johnson",
    position: "RB",
    positionRank: "RB51",
  },
  {
    overallRank: 146,
    name: "Justin Herbert",
    position: "QB",
    positionRank: "QB13",
  },
  {
    overallRank: 147,
    name: "Trevor Lawrence",
    position: "QB",
    positionRank: "QB14",
  },
  {
    overallRank: 148,
    name: "Jared Goff",
    position: "QB",
    positionRank: "QB15",
  },
  {
    overallRank: 149,
    name: "Kirk Cousins",
    position: "QB",
    positionRank: "QB16",
  },
  {
    overallRank: 150,
    name: "Caleb Williams",
    position: "QB",
    positionRank: "QB17",
  },
  {
    overallRank: 151,
    name: "Jaleel McLaughlin",
    position: "RB",
    positionRank: "RB52",
  },
  {
    overallRank: 152,
    name: "D'Onta Foreman",
    position: "RB",
    positionRank: "RB53",
  },
  {
    overallRank: 153,
    name: "Wan'Dale Robinson",
    position: "WR",
    positionRank: "WR67",
  },
  {
    overallRank: 154,
    name: "Josh Downs",
    position: "WR",
    positionRank: "WR68",
  },
  {
    overallRank: 155,
    name: "Jamaal Williams",
    position: "RB",
    positionRank: "RB54",
  },
  {
    overallRank: 156,
    name: "Ray Davis",
    position: "RB",
    positionRank: "RB55",
  },
  {
    overallRank: 157,
    name: "Alexander Mattison",
    position: "RB",
    positionRank: "RB56",
  },
  {
    overallRank: 158,
    name: "MarShawn Lloyd",
    position: "RB",
    positionRank: "RB57",
  },
  {
    overallRank: 159,
    name: "Taysom Hill",
    position: "TE",
    positionRank: "TE17",
  },
  {
    overallRank: 160,
    name: "Matthew Stafford",
    position: "QB",
    positionRank: "QB18",
  },
  {
    overallRank: 161,
    name: "Aaron Rodgers",
    position: "QB",
    positionRank: "QB19",
  },
  {
    overallRank: 162,
    name: "Jayden Daniels",
    position: "QB",
    positionRank: "QB20",
  },
  {
    overallRank: 163,
    name: "Keaton Mitchell",
    position: "RB",
    positionRank: "RB58",
  },
  {
    overallRank: 164,
    name: "Trey Palmer",
    position: "WR",
    positionRank: "WR69",
  },
  {
    overallRank: 165,
    name: "Quentin Johnston",
    position: "WR",
    positionRank: "WR70",
  },
  {
    overallRank: 166,
    name: "Xavier Legette",
    position: "WR",
    positionRank: "WR71",
  },
  {
    overallRank: 167,
    name: "Will Shipley",
    position: "RB",
    positionRank: "RB59",
  },
  {
    overallRank: 168,
    name: "Dylan Laube",
    position: "RB",
    positionRank: "RB60",
  },
  {
    overallRank: 169,
    name: "Bucky Irving",
    position: "RB",
    positionRank: "RB61",
  },
  {
    overallRank: 170,
    name: "Dameon Pierce",
    position: "RB",
    positionRank: "RB62",
  },
  {
    overallRank: 171,
    name: "Miles Sanders",
    position: "RB",
    positionRank: "RB63",
  },
  {
    overallRank: 172,
    name: "Marvin Mims",
    position: "WR",
    positionRank: "WR72",
  },
  {
    overallRank: 173,
    name: "Darnell Mooney",
    position: "WR",
    positionRank: "WR73",
  },
  {
    overallRank: 174,
    name: "Ja'Lynn Polk",
    position: "WR",
    positionRank: "WR74",
  },
  {
    overallRank: 175,
    name: "Cade Otton",
    position: "TE",
    positionRank: "TE18",
  },
  {
    overallRank: 176,
    name: "Pat Freiermuth",
    position: "TE",
    positionRank: "TE19",
  },
  {
    overallRank: 177,
    name: "Hunter Henry",
    position: "TE",
    positionRank: "TE20",
  },
  {
    overallRank: 178,
    name: "Tank Bigsby",
    position: "RB",
    positionRank: "RB64",
  },
  {
    overallRank: 179,
    name: "Kenneth Gainwell",
    position: "RB",
    positionRank: "RB65",
  },
  {
    overallRank: 180,
    name: "Justice Hill",
    position: "RB",
    positionRank: "RB66",
  },
  {
    overallRank: 181,
    name: "Elijah Mitchell",
    position: "RB",
    positionRank: "RB67",
  },
  {
    overallRank: 182,
    name: "A.J. Dillon",
    position: "RB",
    positionRank: "RB68",
  },
  {
    overallRank: 183,
    name: "Baker Mayfield",
    position: "QB",
    positionRank: "QB21",
  },
  {
    overallRank: 184,
    name: "Geno Smith",
    position: "QB",
    positionRank: "QB22",
  },
  {
    overallRank: 185,
    name: "Deshaun Watson",
    position: "QB",
    positionRank: "QB23",
  },
  {
    overallRank: 186,
    name: "Tim Patrick",
    position: "WR",
    positionRank: "WR75",
  },
  {
    overallRank: 187,
    name: "Elijah Moore",
    position: "WR",
    positionRank: "WR76",
  },
  {
    overallRank: 188,
    name: "Jalen McMillan",
    position: "WR",
    positionRank: "WR77",
  },
  {
    overallRank: 189,
    name: "Roman Wilson",
    position: "WR",
    positionRank: "WR78",
  },
  {
    overallRank: 190,
    name: "Rashod Bateman",
    position: "WR",
    positionRank: "WR79",
  },
  {
    overallRank: 191,
    name: "Samaje Perine",
    position: "RB",
    positionRank: "RB69",
  },
  {
    overallRank: 192,
    name: "Kendre Miller",
    position: "RB",
    positionRank: "RB70",
  },
  {
    overallRank: 193,
    name: "Tyrone Tracy",
    position: "RB",
    positionRank: "RB71",
  },
  {
    overallRank: 194,
    name: "Eric Gray",
    position: "RB",
    positionRank: "RB72",
  },
  {
    overallRank: 195,
    name: "Kimani Vidal",
    position: "RB",
    positionRank: "RB73",
  },
  {
    overallRank: 196,
    name: "Audric Estimé",
    position: "RB",
    positionRank: "RB74",
  },
  {
    overallRank: 197,
    name: "Braelon Allen",
    position: "RB",
    positionRank: "RB75",
  },
  {
    overallRank: 198,
    name: "Trey Sermon",
    position: "RB",
    positionRank: "RB76",
  },
  {
    overallRank: 199,
    name: "Deuce Vaughn",
    position: "RB",
    positionRank: "RB77",
  },
  {
    overallRank: 200,
    name: "Jalin Hyatt",
    position: "WR",
    positionRank: "WR80",
  },
];

const todoList = document.getElementById("todo-list");
let roundGroups = {}; // To keep track of players within each round

players.forEach((player, index) => {
  const row = document.createElement("tr");

  // Calculate round based on index
  const round = Math.floor(index / 8) + 1;

  // Insert round row before every group of 8 players
  if (index % 8 === 0) {
    const roundRow = document.createElement("tr");
    roundRow.classList.add(`round-header-${round}`);
    roundRow.style.backgroundColor = "#e0e0e0";

    // Create the "X" button for hiding
    const hideButton = `<button class="hide-btn" data-round="${round}" style="margin: auto; height: 22px; background-color: #e0e0e0 !important; color: black;">X</button>`;

    roundRow.innerHTML = `
      <td colspan="4" style="text-align:left; font-weight: bold; background-color: #e0e0e0;">
        Round ${round}
      </td>
      <td>${hideButton}</td>
    `;
    todoList.appendChild(roundRow);

    // Initialize the round group to store player rows of this round
    roundGroups[round] = [];
  }

  // Apply the position class to the entire row for coloring
  row.classList.add(player.position);

  // Create columns for rank, name, position, position rank, and action button
  row.innerHTML = `
    <td>${player.overallRank}</td>
    <td>${player.name}</td>
    <td>${player.position}</td>
    <td>${player.positionRank}</td>
    <td><button class="draft-btn">Draft</button></td>
  `;

  // Append the player row to the table body
  todoList.appendChild(row);

  // Add this player row to the current round's group
  roundGroups[round].push(row);

  // Assign click event for "Draft" button
  const button = row.querySelector(".draft-btn");
  button.addEventListener("click", () => {
    button.disabled = true;
    button.innerText = "Drafted";
    row.classList.add("hidden");
  });
});

// Event listener to hide the round group when the "X" button is clicked
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("hide-btn")) {
    const round = event.target.getAttribute("data-round");

    // Hide visibility of the rows in this round
    roundGroups[round].forEach((row) => {
      row.classList.add("hidden");
    });

    // Hide the round header row
    const roundHeader = document.querySelector(`.round-header-${round}`);
    if (roundHeader) {
      roundHeader.classList.add("hidden");
    }
  }
});
