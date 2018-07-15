import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-native-modal'
import {
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native'

import PodcastItemHorizontal from 'components/PodcastItemHorizontal'
import ListFooter from 'components/ListFooter'
import ListSeparator from 'components/ListSeparator'

const PodcastItemContainer = styled.TouchableOpacity`
  aspect-ratio: 1;
  height: 100;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: #545454;
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
  font-size: 24;
  font-weight: bold;
  color: white;
`
const Title = styled.Text`
  font-weight: bold;
  font-size: 24;
  margin-top: 10;
  margin-left: 10;
  margin-bottom: 10;
`
const styles = StyleSheet.create({
  modal: {
    marginTop: Dimensions.get('window').height * 0.30,
    marginBottom: 0,
  },
})

export default class PodcastsModal extends React.PureComponent {
  static propTypes = {
    podcasts: PropTypes.array,
    pageInfo: PropTypes.object,
    refetch: PropTypes.func.isRequired,
    networkStatus: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onLoadMore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    podcasts: [],
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

  _toggleModal = () => this.setState({
    isModalVisible: !this.state.isModalVisible,
  })

  render() {
    const {
      networkStatus,
      number,
      podcasts,
      refetch,
      title,
    } = this.props

    return (
      <Element>
        <PodcastItemContainer onPress={this._toggleModal}>
          <TextShow>+ {number}</TextShow>
        </PodcastItemContainer>
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
              data={podcasts.map((item) => ({
                ...item,
                key: item.id,
              }))}
              refreshing={networkStatus === 4}
              onRefresh={refetch}
              initialNumToRender={4}
              onEndReachedThreshold={0.6}
              onEndReached={this._onLoadMore}
              renderItem={({item}) => ( // eslint-disable-line
                <PodcastItemHorizontal
                  podcast={item}
                  key={item.id}
                />
              )}
              ItemSeparatorComponent={ListSeparator}
              ListFooterComponent={(
                <ListFooter networkStatus={networkStatus} />
              )}
            />
          </ModalView>
        </Modal>
      </Element>
    )
  }
}
