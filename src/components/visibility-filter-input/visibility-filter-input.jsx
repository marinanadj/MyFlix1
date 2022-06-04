import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      className="search-bar"
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visbilityFilter}
      placeholder="Search by Title"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);