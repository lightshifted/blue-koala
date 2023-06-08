import React from 'react';
import { Card } from 'antd';

const DisplayMessages = () => {
  const messages = [
    { id: 1, title: '🎛 Research Build', content: "This build's purpose is to demonstrate integration of OpenAI API's streaming feature with React frontend. Upload a PDF above to get started."},
    { id: 2, title: 'System Update', content: 'We have made some improvements to our system.' },
    {
      id: 3,
      title: '⛔ Limitations',
      content: "The research build may have limitations in terms of scalability, stability, feature completeness, security, user experience, platform compatibility, and available support and documentation."
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '8px', width: '50%' }}>
        {messages.slice(0, 1).map((message) => (
          <Card key={message.id} title={message.title} style={{ marginBottom: '16px', height: '100%' }}>
            <p>{message.content}</p>
          </Card>
        ))}
      </div>
      <div style={{ marginLeft: '8px', width: '50%' }}>
        {messages[2] && (
          <Card title={messages[2].title} style={{ marginBottom: '16px', height: '100%' }}>
            <p>{messages[2].content}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DisplayMessages;
