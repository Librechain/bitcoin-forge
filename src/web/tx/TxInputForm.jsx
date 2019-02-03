import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import { AmountInputField, HexInputField, B58InputField, SwitchField } from '../components';
import TxInput from './TxInput';

class TxInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.item.index,
      prevTxHash: props.item.prevTxHash,
      prevTxIndex: props.item.prevTxIndex,
      privateKey: props.item.privateKey,
      amount: props.item.amount,
      isSegWit: props.item.isSegWit,
    };
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
    let fieldValue = event.target.value;
    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    } else if (event.target.type === 'number') {
      fieldValue = parseInt(fieldValue, 10);
    }

    this.setState({ [event.target.id]: fieldValue }, () => {
      // get the properties and generate a TxInput object
      const {
        index, prevTxHash, prevTxIndex, privateKey, amount, isSegWit,
      } = this.state;
      const txInput = new TxInput(
        parseInt(index, 10),
        prevTxHash,
        parseInt(prevTxIndex, 10),
        privateKey,
        parseInt(amount, 10),
        isSegWit,
      );
      // fire the onUpdate event
      const { onUpdate } = this.props;
      onUpdate(txInput);
    });
  }

  render() {
    const {
      index, prevTxHash, prevTxIndex, privateKey, amount, isSegWit,
    } = this.state;

    return (
      <div className="card mb-1">
        <div className="card-header">{`Input #${index}`}</div>
        <div className="card-body">
          <div>
            <h4 className="card-title">UTXO</h4>
            <HexInputField
              label="TX Hash"
              id="prevTxHash"
              horizontal
              size="sm"
              value={prevTxHash}
              handleChange={this.onFieldChange}
            />
            <InputField
              label="Index"
              type="number"
              pattern="[0-9]*"
              id="prevTxIndex"
              horizontal
              size="sm"
              value={prevTxIndex}
              handleChange={this.onFieldChange}
            />
            <SwitchField
              label="Is Segwit"
              id="isSegWit"
              value={isSegWit}
              handleChange={this.onFieldChange}
            />
            <AmountInputField
              label="Amount"
              id="amount"
              horizontal
              size="sm"
              value={amount}
              handleChange={this.onFieldChange}
            />
          </div>
          <hr />
          <B58InputField
            label="Private key"
            id="privateKey"
            horizontal
            size="sm"
            value={privateKey}
            handleChange={this.onFieldChange}
          />
        </div>
      </div>
    );
  }
}

TxInputForm.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    prevTxHash: PropTypes.string,
    prevTxIndex: PropTypes.number,
    privateKey: PropTypes.string,
    amount: PropTypes.number,
    isSegWit: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func,
};
TxInputForm.defaultProps = {
  onUpdate: () => {},
};

export default TxInputForm;
