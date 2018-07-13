import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-native-modal'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native'

import UserItemHorizontal from 'components/UserItemHorizontal'

const UserItemContainer = styled.TouchableOpacity`
  border-radius: 100;
  height: 70;
  width: 70;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: gray;
  margin-left: 10;
`
const Element = styled.View`
  flex: 1;
`
const ModalView = styled.View`
  flex: 1;
  background-color: #F3F3F3;
`
const TextShow = styled.Text`
  font-size: 30;
  font-weight: bold;
`
const Title = styled.Text`
  font-weight: bold;
  font-size: 24;
  margin-bottom: 2%;
`
const styles = StyleSheet.create({
  modal: {
    marginTop: Dimensions.get('window').height * 0.30,
    marginBottom: 0,
  },
})

export default class UsersModal extends React.PureComponent {
  static propTypes = {
    users: PropTypes.array,
    pageInfo: PropTypes.object,
    refetch: PropTypes.func.isRequired,
    networkStatus: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onLoadMore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    users: [],
    pageInfo: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      isModalVisible: false,
    }
  }

  _onLoadMore = () => {
    const {
      onLoadMore,
      pageInfo,
      networkStatus,
    } = this.props

    if (!pageInfo.hasNextPage || networkStatus === 3 || networkStatus === 4 || networkStatus === 1) {
      return
    }

    onLoadMore()
  }

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
          marginTop: 5,
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
    >
      <ActivityIndicator animating size="small" />
    </View>
  )

  _toggleModal = () => this.setState({
    isModalVisible: !this.state.isModalVisible,
  })

  render() {
    const {
      networkStatus,
      number,
      users,
      refetch,
      title,
    } = this.props

    return (
      <Element>
        <UserItemContainer onPress={this._toggleModal}>
          <TextShow>+ {number}</TextShow>
        </UserItemContainer>
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
            <Title>{title}</Title>
            <FlatList
              data={users.map((item) => ({
                ...item,
                key: item.id,
              }))}
              refreshing={networkStatus === 4}
              onRefresh={refetch}
              initialNumToRender={4}
              onEndReachedThreshold={0.6}
              onEndReached={this._onLoadMore}
              renderItem={({item}) => ( // eslint-disable-line
                <UserItemHorizontal
                  user={item}
                  key={item.id}
                  onPress={() => this.setState({
                   isModalVisible: false,
                  })}
                />
              )}
              ItemSeparatorComponent={this._renderSeparator}
              ListFooterComponent={this._renderFooter}
            />
          </ModalView>
        </Modal>
      </Element>
    )
  }
}
