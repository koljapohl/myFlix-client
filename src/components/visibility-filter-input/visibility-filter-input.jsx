import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function visibilityFilterInput( props ) {
  return <Form.Control
    onChange={e => props.setFilter( e.target.value )}
    value={props.visibilityFilter}
    placeholder="filter movies"
  />;
}

export default connect(
  null,
  { setFilter }
)( visibilityFilterInput );

visibilityFilterInput.propTypes = {
  visibilityFilter: PropTypes.string
}