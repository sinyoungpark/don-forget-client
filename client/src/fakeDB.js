export const User = [
  {
    id: 1,
    name: "example",
    email: "example@naver.com",
    password: "example",
    answer: "example",
    question: "가장 기억에 남는 선생님 성함은?",
  },
];

const types = ["결혼식", "생일", "장례식", "집들이", "취직", "입학", "출산", "돌잔치", "기념일", "기타"]

export const NextAlert = {
  1 : [
    7, 
    400000,
    3
  ]
}

export const Schedule = {
  1: [
    {
      id : 1,
      date: "2022-1-20",
      type: types[1],
      event_target: "개구리",
      gift: ["현금", "100000"],
      giveandtake: "giveandtake",
    },
    {
      id : 2,
      date: "2022-11-22",
      type: types[7],
      event_target: "친구1",
      gift: ["현금", "100000"],
      giveandtake: "giveandtake",
    },
    {
      id : 3,
      date: "2022-12-14",
      type: types[3],
      event_target: "친구 지연이",
      gift: ["현금", "100000"],
      giveandtake: "giveandtake",
    },
  ],
  2 : [
    {
      id : 1,
      date: "2022-11-22",
      type: "type",
      event_target: "event_target",
      gift: "gift",
      giveandtake: "giveandtake",
    },
    {
      id : 2,
      date: "2022-11-23",
      type: "type",
      event_target: "event_target",
      gift: "gift",
      giveandtake: "giveandtake",
    },
  ]
};
