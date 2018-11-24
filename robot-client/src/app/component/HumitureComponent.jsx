import React, {Component} from 'react';

class HumitureComponent extends Component {
  componentWillReceiveProps(nextProps) {
    console.log();
    this.setState({searchData: nextProps.searchData})
  }

  render() {
    return (
      <div>{JSON.stringify(this.props)}</div>
    )
  }
}

export default HumitureComponent;