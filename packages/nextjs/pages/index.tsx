import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address } from "~~/components/scaffold-eth";

export const GET_MESSAGES = gql`
  {
    sendMessages(first: 5) {
      id
      _from
      _to
      message
    }
  }
`;

const Home: NextPage = () => {
  const { data: messagesData } = useQuery(GET_MESSAGES);

  const messages = messagesData?.sendMessages || [];

  return (
    <>
      <MetaHeader />
      <h1>Messages</h1>
      <table className="min-w-[70%]">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message: any) => (
            <tr key={message.id}>
              <td>
                <Address address={message._from} />
              </td>
              <td>
                <Address address={message._to} />
              </td>
              <td>{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
