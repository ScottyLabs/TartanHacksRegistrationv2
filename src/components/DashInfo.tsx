import React from "react";
import { Segment, Header, Divider } from "semantic-ui-react";

enum semanticColors {
  red = "red",
  orange = "orange",
  yellow = "yellow",
  olive = "olive",
  green = "green",
  teal = "teal",
  blue = "blue",
  violet = "violet",
  purple = "purple",
  pink = "pink",
  brown = "brown",
  grey = "grey",
  black = "black",
}

const Title = (props: any) => {
  const status = props.status;
  let color: semanticColors;
  let message;
  if (status) {
    if (!status.verified) {
      message = "UNVERIFIED";
      color = semanticColors.red;
    } else if (!status.completed) {
      message = "APPLICATION INCOMPLETE";
      color = semanticColors.red;
    } else if (!status.admitted) {
      message = "PENDING ADMISSION";
      color = semanticColors.orange;
    } else if (!status.confirmed) {
      message = "ADMITTED";
      color = semanticColors.yellow;
    } else if (!status.declined) {
      message = "CONFIRMED";
      color = semanticColors.green;
    } else {
      message = "DECLINED";
      color = semanticColors.red;
    }
  } else {
    message = "PROFILE ERROR";
    color = semanticColors.red;
  }
  return (
    <Segment color={color} inverted textAlign="center">
      <Header as="h3" style={{ letterSpacing: 2 }}>
        {message}
      </Header>
    </Segment>
  );
};

const DashInfo = (props: any) => {
  return (
    <Segment.Group raised>
      <Segment padded="very">
        <Header as="h1" textAlign="center">
          Your Status
        </Header>
        <Title status={props.status} />
        <Divider />
        <p>Welcome back{props.name ? ", " + props.name : ""}!</p>
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
