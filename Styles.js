import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingVertical: 25,
    marginTop: 25,
    marginBottom: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  swipeContainer: {
    flex: 1,
    flexDirection: "row",
    width: 200,
    height: 30,
    marginTop: 50,
  },
  swipeItem: {
    width: 200,
    height: 30,
    backgroundColor: "azure",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "slategrey",
  },
  swipeItemText: {
    textAlign: "center",
    color: "slategrey",
  },
  swipeBlank: {
    width: 200,
    height: 30,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    padding: 10,
    marginBottom: 20,
    width: 250,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 60,
  },
  modalBackground: {
    backgroundColor: "#00000053",
    width: "100%",
    height: "100%",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#d9d9d9ff",
    padding: 20,
    borderRadius: 15,
    borderColor: "#000000",
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: 250,

  },
  modalText: {
    fontSize: 24
  },
  closeButton: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#0586ff',
    borderRadius: 15,
  },
  closeText: {
    fontSize: 20,
    color: '#ffffff',
  },
  banner: {
  backgroundColor: '#ffcc00',
  padding: 10,
  alignItems: 'center',
  },

  bannerText: {
    fontWeight: 'bold',
    color: '#000',
  },

});

export default styles;
