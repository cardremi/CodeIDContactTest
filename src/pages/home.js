import React, {useState, useCallback} from 'react';
import {
  FlatList,
  ImageBackground,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {addAllItemCategory, useListCategory} from '../config/contact';
import CardCategory from '../components/cardcategory';
import FloatingButton from '../components/floatingButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-spinkit';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const listCategory = useListCategory();
  const [modalVisible, setModalVisible] = useState(false);
  const [detail, setDetail] = useState({});
  const [imageError, setImageError] = useState(false);
  const image = require('../../assets/tempAvatar.png');
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCardPress = item => {
    setDetail(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setDetail({});
    setModalVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchData();

      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      addAllItemCategory([]);
      const response = await fetch('https://contact.herokuapp.com/contact');
      const data = await response.json();
      const sortedData = [...data.data].sort((a, b) =>
        a.firstName.localeCompare(b.firstName),
      );
      await addAllItemCategory(sortedData);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setRefreshing(false);
    }
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const ListEmptyComponent = () => (
    <View style={[styles.spinner, {height: height - 50}]}>
      <Spinner
        isVisible={true}
        size={40}
        type={'FadingCircleAlt'}
        color={'red'}
      />
      {/* <Text style={styles.title}>Loading...</Text> */}
    </View>
  );

  return (
    <View style={styles.scrollView}>
      <Text style={styles.titlename}>Contacts</Text>
      <FlatList
        data={listCategory}
        renderItem={({item}) => (
          <CardCategory
            style={styles.titlename}
            data={item}
            onPress={() => handleCardPress(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['transparent']}
            style={{backgroundColor: 'transparent'}}
            progressBackgroundColor="transparent"
          />
        }
        ListEmptyComponent={ListEmptyComponent}
      />
      <FloatingButton
        onPress={() => {
          closeModal();
          navigation.navigate('CreateContact');
        }}
        testID={'floating-button'}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={[styles.headerModal, {width: width / 1.2}]}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                  navigation.navigate('UpdateDetail', {listData: detail});
                }}>
                <Text style={styles.closeButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <ImageBackground
              source={imageError ? image : {uri: detail.photo}}
              onError={handleImageError}
              style={[
                styles.background,
                {width: width / 1.2, height: height / 2},
              ]}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{detail?.firstName}</Text>
                <Text style={styles.title}>{detail?.lastName}</Text>
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{detail?.age}</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
  titlename: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 20,
  },
  tinyLogo: {
    borderRadius: 100,
    backgroundColor: 'blue',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  background: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  titleWrapper: {
    // alignItems: 'flex-end',
    flexDirection: 'row',
    paddingLeft: 12,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'left',
    paddingLeft: 8,
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
