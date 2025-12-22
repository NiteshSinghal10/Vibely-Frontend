import { IMessage } from "../../components";


const rawMessages = [
  { _id: '15', _receiver: 'b', _sender: 'a', createdAt: '2025-12-22T18:09:07.859+00:00', content: 'Hello ab btao ma ghr aa gya' },
  { _id: '16', _receiver: 'a', _sender: 'b', createdAt: '2025-12-22T18:09:10.859+00:00', content: 'kuch nhi tum mujhse bat hi nhi krte' },
  { _id: '17', _receiver: 'b', _sender: 'a', createdAt: '2025-12-22T18:09:12.859+00:00', content: 'are nhi yrr aisa nhi hai tu galat sochri' },
  { _id: '18', _receiver: 'a', _sender: 'b', createdAt: '2025-12-22T18:09:13.859+00:00', content: 'aisa hi hai ye btao khana khaya.' },
  { _id: '19', _receiver: 'b', _sender: 'a', createdAt: '2025-12-22T18:09:15.859+00:00', content: 'ha kha liya tune khaya' },
  { _id: '20', _receiver: 'a', _sender: 'b', createdAt: '2025-12-22T18:09:17.859+00:00', content: 'hn mane bhi khaya' },
  { _id: '21', _receiver: 'b', _sender: 'a', createdAt: '2025-12-22T18:09:20.859+00:00', content: 'ok' },
  { _id: '8', _receiver: 'a', _sender: 'b', createdAt: '2025-12-19T03:10:00.859+00:00', content: 'Helloooo' },
  { _id: '9', _receiver: 'b', _sender: 'a', createdAt: '2025-12-19T10:10:05.859+00:00', content: 'ha bolo' },
  { _id: '10', _receiver: 'a', _sender: 'b', createdAt: '2025-12-19T10:11:00.859+00:00', content: 'tum to baat bhi nhi krte' },
  { _id: '11', _receiver: 'b', _sender: 'a', createdAt: '2025-12-19T10:11:15.859+00:00', content: 'Are aisa nhi hai abhi bhr hu ma' },
  { _id: '12', _receiver: 'a', _sender: 'b', createdAt: '2025-12-19T12:11:16.859+00:00', content: 'tum hamesha bhar hi rhte ho' },
  { _id: '13', _receiver: 'b', _sender: 'a', createdAt: '2025-12-19T12:11:27.859+00:00', content: 'nhi yr aisa nhi hai' },
  { _id: '14', _receiver: 'a', _sender: 'b', createdAt: '2025-12-19T12:11:30.859+00:00', content: 'aisa hi hai.' },
  { _id: '1', _receiver: 'a', _sender: 'b', createdAt: '2025-11-10T01:05:30.859+00:00', content: 'Hii' },
  { _id: '2', _receiver: 'b', _sender: 'a', createdAt: '2025-11-10T01:05:31.859+00:00', content: 'Hello' },
  { _id: '3', _receiver: 'a', _sender: 'b', createdAt: '2025-11-10T02:05:31.889+00:00', content: 'Kaise ho' },
  { _id: '4', _receiver: 'b', _sender: 'a', createdAt: '2025-11-10T02:02:32.859+00:00', content: 'ma badiya hu tu suna kaisi hai' },
  { _id: '5', _receiver: 'a', _sender: 'b', createdAt: '2025-11-10T02:06:00.859+00:00', content: 'ma bhi achi hu' },
  { _id: '6', _receiver: 'b', _sender: 'a', createdAt: '2025-11-10T02:06:31.859+00:00', content: 'ma abhi bhar hu krta hu tujse thodi dr m baat' },
  { _id: '7', _receiver: 'a', _sender: 'b', createdAt: '2025-11-10T03:06:32.859+00:00', content: 'ok' },
]

function groupMessages (rawMessages: IMessage[]) {
  const groupedMessages: Record<string, IMessage[]> = {};
  
  rawMessages.forEach(message => {
    const date = new Date(message.createdAt);
    const dateStr = date.toLocaleDateString('hi-IN');

    const [day, month, year] = dateStr.split('/').map(Number);

    const key = `${year}-${month}-${day}T00:00:00.000+00:00`;
  
    if (!groupedMessages[key]) {
      groupedMessages[key] = [];
    }
  
    groupedMessages[key].push(message);
  })

  const groupedArray = Object.keys(groupedMessages).map(dateStr => ({
      date: dateStr,
      messages: groupedMessages[dateStr]
    }));

  return groupedArray;
}

export const friendMessages = groupMessages(rawMessages)