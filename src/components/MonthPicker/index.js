import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-native-modal'
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native'

import generateDateEntry from 'helpers/generateDateEntry'

const Element = styled.View`
  flex: 1;
`
const ModalView = styled.View`
  flex: 1;
  background-color: #F3F3F3;
`
const TextShow = styled.Text`
  font-size: 16;
  font-style: italic;
  color: gray;
`
const DateText = styled.Text`
  font-size: 30;
  font-style: italic;
  text-align: right;
  padding-right: 5%;
  color: gray;
`

export default class MonthPicker extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      isModalVisible: false,
      value: new Date().toString(),
      start: new Date(),
      maxSize: 20,
    }
  }

  onEndReached = () => this.setState({
    maxSize: this.state.maxSize + 5,
  })

  generateEntry = (item) => {
    const {
      text,
      value,
    } = item

    return (
      <TouchableOpacity
        onPress={() => this._selectEntry(value)}
        key={value}
      >
        <DateText>
          {text}
        </DateText>
      </TouchableOpacity>
    )
  }

  generateEntries = () => {
    const {
      maxSize,
      start,
    } = this.state
    const result = []

    for (let i = 0; i < maxSize; i++) {
      const date = new Date(start)

      date.setMonth(date.getMonth() - i)

      result.push({
        text: generateDateEntry(date.toString()),
        value: date.toString(),
      })
    }

    return result
  }

  _selectEntry = (value) => {
    const {
      onSelect,
    } = this.props

    this.setState({
      value,
    })

    this._toggleModal()

    onSelect(value)
  }

  _toggleModal = () => this.setState({
    isModalVisible: !this.state.isModalVisible,
  })

  _renderSeparator = () => (
    <View
      style={{
          height: 1,
          backgroundColor: '#CED0CE',
          margin: '2%',
        }}
    />
  )

  _renderFooter = () => (
    <View
      style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
    >
      <ActivityIndicator animating size="small" />
    </View>
  )

  render() {
    return (
      <Element>
        <TouchableOpacity onPress={this._toggleModal}>
          <TextShow>
            {
              generateDateEntry(this.state.value)
            }
          </TextShow>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          backdropOpacity={0.4}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
        >
          <ModalView>
            <FlatList
              data={this.generateEntries()}
              renderItem={({item}) => this.generateEntry(item)} // eslint-disable-line
              keyExtractor={(item) => item.value}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.1}
              ItemSeparatorComponent={this._renderSeparator}
              ListFooterComponent={this._renderFooter}
            />
          </ModalView>
        </Modal>
      </Element>
    )
  }
}
