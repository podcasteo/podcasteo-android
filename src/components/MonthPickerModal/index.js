import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-native-modal'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import generateDateEntry from 'helpers/generateDateEntry'
import ListFooter from 'components/ListFooter'

const Element = styled.View`
  flex: 1;
`
const ModalView = styled.View`
  flex: 1;
  background-color: #F3F3F3;
`
const Title = styled.Text`
  font-weight: bold;
  font-size: 24;
  margin-top: 10;
  margin-left: 10;
  margin-bottom: 10;
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
const styles = StyleSheet.create({
  modal: {
    marginTop: Dimensions.get('window').height * 0.30,
    marginBottom: 0,
  },
})

export default class MonthPickerModal extends React.Component {
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

  _onLoadMore = () => {
    const {
      maxSize,
    } = this.state

    if (maxSize < 50) {
      this.setState({
        maxSize: this.state.maxSize + 5,
      })
    }
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
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          onBackdropPress={() => this.setState({
           isModalVisible: false,
          })}
          onBackButtonPress={() => this.setState({
           isModalVisible: false,
          })}
          style={styles.modal}
        >
          <ModalView>
            <Title>Mois du classement</Title>
            <FlatList
              data={this.generateEntries().map((item) => ({
                ...item,
                key: item.value,
              }))}
              initialNumToRender={8}
              onEndReachedThreshold={0.6}
              onEndReached={this._onLoadMore}
              renderItem={({item}) => this.generateEntry(item)} // eslint-disable-line
              ItemSeparatorComponent={this._renderSeparator}
              ListFooterComponent={(
                <ListFooter networkStatus={7} />
              )}
            />
          </ModalView>
        </Modal>
      </Element>
    )
  }
}
