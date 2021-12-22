import storage from '@react-native-firebase/storage';

export default (file) => (onSuccess) => (onError) => {
    console.log('file>> ',file);
    const path = `contact-pictures/user/777/${file.creationDate || file.filename || file.path}`;
    const ref = storage().ref(path);
  
    const task = ref.putFile(file.path);
  
    task
      .then(async () => {
        const url = await ref.getDownloadURL();
        onSuccess(url);
        console.log('url', url);
      })
      .catch((error) => {
        onError(error);
      });
  };