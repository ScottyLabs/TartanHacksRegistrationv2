import React from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';

const DashInfo = (props: any) => {
  return (
    <Segment.Group raised>
      <Segment padded="very">
        <Header as="h1" textAlign="center">
          Your Status
        </Header>
        <Segment color="red" inverted textAlign="center">
          <Header as="h3" style={{ letterSpacing: 2 }}>
            EXPIRED ADMISSION boy meh
          </Header>
        </Segment>
        <Divider />
        <p>
          Welcome back{props.name ? ', ' + props.name : ''}!
        </p>
        <p>
          <strong>
            Your confirmation deadline of Friday, February 14th 2020, 11:00 pm
            (EST) has passed.
          </strong>
        </p>
        <p>
          Although you were accepted, you did not complete your confirmation in
          time. Unfortunately, this means that you will not be able to attend
          the event, as we must begin to accept other applicants on the
          waitlist. We hope to see you again next year!
        </p>
      </Segment>
    </Segment.Group>
  );
};

export default DashInfo;
