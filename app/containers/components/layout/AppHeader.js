//@flow
import React from 'react';
import { connect } from 'react-redux';
import { Header, Title, Button, Icon } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import { goBack } from '../../../actions/navActions';

const AppHeader = ({title, style={}, onPress, showBackButton=false, left=null, right=null, containerStyle={}}) => {
  const backButton = (
    <Button onPress={onPress} transparent iconLeft>
      <Icon name='md-arrow-round-back' />
    </Button>
  )
  return (
    <Header style={containerStyle}>
      <Col size={1}>
        {showBackButton && backButton}
        {left}
      </Col>
      <Col size={3}>
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
          <Title style={style}>{title}</Title>
        </Row>
      </Col>
      <Col size={1}>
        {right}
      </Col>
    </Header>
  )
}

export default compose(
  connect(null, { goBack }),
  withHandlers({
    onPress: ({ goBack, onPress }) => onPress || goBack
  })
)(AppHeader);
