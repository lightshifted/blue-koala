import React from 'react';
import { Card } from 'antd';

const DisplayMessages = () => {
  const messages = [
    { id: 1, title: 'Welcome', content: "Amplify your legal understanding with ContractQA. Seamlessly comprehend complex legal contracts and safeguard your position in a just and prosperous society. By simplifying legal contract details into a readily available and intuitive format, we're enabling individuals to comprehend their entitlements and effectively advocate for themselves."},
    { id: 2, title: 'System Update', content: 'We have made some improvements to our system.' },
    { id: 3, title: 'Limitations', content: "ContractQA may generate incorrect or nonsensical responses and be sensitive to input phrasing. Exercise caution and independently verify critical information." },
    { id: 4, title: 'Special Offer', content: 'You have a new special offer! Click here to view.' },
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
