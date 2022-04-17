import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useCountryUsers = async (myname: string, selectCountry: string) => {
  const countryUsers: string[] = [];

  const q = query(
    collection(db, "users"),
    where("countries", "array-contains", selectCountry)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (myname != doc.data().username) {
      countryUsers.push(doc.data().username);
    }
  });

  return countryUsers;
};
export default useCountryUsers;
