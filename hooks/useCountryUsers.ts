import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useCountryUsers = async (myUid: string, selectCountry: string) => {
  const countryUsers: {
    uid: string;
    username: string;
    image: {
      id: string;
      path: string;
    };
  }[] = [];

  const q = query(
    collection(db, "users"),
    where("countries", "array-contains", selectCountry)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (myUid != doc.data().uid) {
      countryUsers.push({
        uid: doc.data().uid,
        username: doc.data().username,
        image: doc.data().image,
      });
    }
  });

  return countryUsers;
};
export default useCountryUsers;
